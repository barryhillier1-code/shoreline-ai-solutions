const storyCards = [
  {
    title: 'Departure from Clarenville Harbour',
    text: 'Ease away from shore as sheltered water gives way to open coastal views and sea air that feels distinctly Newfoundland.',
    image:
      'https://images.unsplash.com/photo-1533633154255-32918346da8a?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    alt: 'Fishing boat crossing open water near a coastal islet',
  },
  {
    title: 'Sea Cliffs and Hidden Coves',
    text: 'Track the shoreline past rocky headlands, long inlets, and tucked-away coves that only feel accessible from the water.',
    image:
      'https://images.unsplash.com/photo-1762763955216-1ca1d05ac637?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    alt: 'Rugged green coastline meeting deep blue ocean water',
  },
  {
    title: 'Whale Watching Moments',
    text: 'Keep cameras ready for whales, seabirds, and the kind of natural moments that make every outing a little different.',
    image:
      'https://images.unsplash.com/photo-1712933342478-51b92117ca80?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    alt: 'Whale surfacing in open ocean water during a viewing excursion',
  },
  {
    title: 'Private Charter Comfort',
    text: 'Pair the wild beauty outside with a polished onboard experience that feels comfortable, scenic, and easy to settle into.',
    image:
      'https://images.unsplash.com/photo-1435171213190-3bcbbe4e9a13?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    alt: 'Boat helm and panoramic ocean view from a bright charter interior',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-slate-950 py-16 text-white lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-200">
            Coastal Highlights
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight [font-family:var(--font-cormorant)] sm:text-5xl">
            See the atmosphere Discovery Bay Charters is built around.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {storyCards.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-[2rem] bg-white/8 ring-1 ring-white/10 backdrop-blur-sm">
              <img
                src={card.image}
                alt={card.alt}
                width={3000}
                height={2000}
                className="h-60 w-full object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold [font-family:var(--font-cormorant)]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
