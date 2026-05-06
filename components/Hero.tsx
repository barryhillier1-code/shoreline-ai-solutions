const quickStats = [
  { label: 'Base Port', value: 'Clarenville' },
  { label: 'Waters Explored', value: 'Trinity Bay' },
  { label: 'Top Moments', value: 'Whales & Icebergs' },
];

const heroImage =
  'https://images.unsplash.com/photo-1441846978521-21764329e27a?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5ld2ZvdW5kbGFuZHxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,166,200,0.30),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(232,207,170,0.18),transparent_24%),linear-gradient(180deg,rgba(6,19,33,0.78),rgba(6,19,33,0.92))]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(6,19,33,0.6))]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-28">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-200">
            Clarenville Boat Tours
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-none tracking-tight [font-family:var(--font-cormorant)] sm:text-6xl lg:text-7xl">
            Explore the wild beauty of Trinity Bay from Clarenville.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Discovery Bay Charters offers unforgettable boat tours with rugged coastal scenery, whale watching, iceberg sightings, and local Newfoundland hospitality.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#book-now"
              className="inline-flex items-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-400"
            >
              Book Your Tour
            </a>
            <a
              href="#tour-experiences"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Experiences
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <img
              src={heroImage}
              alt="Newfoundland lighthouse and rugged coastline overlooking open Atlantic water"
              width={3000}
              height={2250}
              className="h-72 w-full rounded-[1.5rem] object-cover"
            />
          </div>

          {quickStats.map((stat) => (
            <div key={stat.label} className="rounded-[2rem] bg-white/90 p-5 text-slate-950 shadow-xl ring-1 ring-white/30">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
              <p className="mt-3 text-2xl font-semibold [font-family:var(--font-cormorant)]">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
