import type { MetadataRoute } from 'next';
import { buildCanonicalUrl, siteConfig } from '@/lib/siteConfig';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.routes.map((route) => ({
    changeFrequency: route.changeFrequency,
    lastModified: new Date('2026-04-27T00:00:00.000Z'),
    priority: route.priority,
    url: buildCanonicalUrl(route.path),
  }));
}
