#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = process.cwd();
const defaultPayloadPaths = [
  path.join('.swarm', 'frontend-agent.json'),
  path.join('.swarm', 'backend-forms-agent.json'),
];

function printUsage() {
  console.log(
    [
      'Usage:',
      '  node write-build.js',
      '  node write-build.js <frontend-agent.json> <backend-forms-agent.json>',
      '',
      'Default payload locations:',
      '  .swarm/frontend-agent.json',
      '  .swarm/backend-forms-agent.json',
    ].join('\n')
  );
}

function unwrapJson(text) {
  const trimmed = text.trim();

  if (!trimmed) {
    throw new Error('Payload file is empty.');
  }

  const withoutFence = trimmed
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '');

  try {
    return JSON.parse(withoutFence);
  } catch (directError) {
    const start = withoutFence.indexOf('{');
    const end = withoutFence.lastIndexOf('}');

    if (start !== -1 && end !== -1 && end > start) {
      const candidate = withoutFence.slice(start, end + 1);
      return JSON.parse(candidate);
    }

    throw directError;
  }
}

function readPayload(sourcePath) {
  const absolutePath = path.resolve(repoRoot, sourcePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Payload file not found: ${sourcePath}`);
  }

  const raw = fs.readFileSync(absolutePath, 'utf8');
  const data = unwrapJson(raw);

  if (!data || typeof data !== 'object') {
    throw new Error(`Invalid payload in ${sourcePath}: expected a JSON object.`);
  }

  if (!data.payload || typeof data.payload !== 'object') {
    throw new Error(`Invalid payload in ${sourcePath}: missing payload object.`);
  }

  const { generated_files: generatedFiles } = data.payload;

  if (!generatedFiles || typeof generatedFiles !== 'object' || Array.isArray(generatedFiles)) {
    throw new Error(`Invalid payload in ${sourcePath}: missing generated_files object.`);
  }

  return {
    agentId: data.agent_id || 'unknown-agent',
    sourcePath,
    generatedFiles,
  };
}

function resolveTarget(filePath) {
  const absoluteTarget = path.resolve(repoRoot, filePath);
  const relativeTarget = path.relative(repoRoot, absoluteTarget);

  if (
    path.isAbsolute(filePath) ||
    relativeTarget.startsWith('..') ||
    path.isAbsolute(relativeTarget)
  ) {
    throw new Error(`Refusing to write outside the project root: ${filePath}`);
  }

  return absoluteTarget;
}

function writeGeneratedFiles(payloads) {
  const writtenFiles = [];
  const overwrittenBy = new Map();

  for (const payload of payloads) {
    for (const [filePath, contents] of Object.entries(payload.generatedFiles)) {
      if (typeof contents !== 'string') {
        throw new Error(
          `Invalid generated_files entry for ${filePath} in ${payload.sourcePath}: expected string content.`
        );
      }

      const targetPath = resolveTarget(filePath);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, contents, 'utf8');

      overwrittenBy.set(filePath, payload.agentId);
      writtenFiles.push({
        filePath,
        agentId: payload.agentId,
      });
    }
  }

  return {
    writtenFiles,
    overwrittenBy,
  };
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    return;
  }

  const payloadPaths = args.length > 0 ? args : defaultPayloadPaths;
  const payloads = payloadPaths.map(readPayload);
  const { writtenFiles } = writeGeneratedFiles(payloads);

  console.log(
    JSON.stringify(
      {
        status: 'complete',
        payload_count: payloads.length,
        file_count: writtenFiles.length,
        files: writtenFiles.map((entry) => entry.filePath),
      },
      null,
      2
    )
  );
}

try {
  main();
} catch (error) {
  console.error(
    JSON.stringify(
      {
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
      },
      null,
      2
    )
  );
  process.exit(1);
}
