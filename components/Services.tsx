const tours = [
  {
    title: 'Trinity Bay Coastal Tour',
    detail: 'Cruise past rugged shoreline, sea stacks, quiet coves, and the dramatic scenery that makes Eastern Newfoundland unforgettable.',
    badge: 'Signature Route',
  },
  {
    title: 'Whale Watching Excursion',
    detail: 'Head out during the active season for the chance to witness humpbacks and other marine wildlife in their natural environment.',
    badge: 'Seasonal Favourite',
  },
  {
    title: 'Iceberg Sightings Tour',
    detail: 'When the season lines up, chase crisp northern light and floating blue-white giants drifting through local waters.',
    badge: 'Spring Experience',
  },
  {
    title: 'Private Charter Adventure',
    detail: 'Create a more personal outing for couples, families, or photography groups looking for extra flexibility on the bay.',
    badge: 'Custom Booking',
  },
];

export default function Services() {
  return (
    <section id="tour-experiences" className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-800">
            Tour Experiences
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)] sm:text-5xl">
            Rugged coastal adventures shaped around Newfoundland's best days on the water.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tours.map((tour) => (
            <article key={tour.title} className="coast-card rounded-[2rem] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-800">{tour.badge}</p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-950 [font-family:var(--font-cormorant)]">
                {tour.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-700">{tour.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
