import type { Metadata } from 'next';
import ConversionFooter from '@/components/ConversionFooter';
import ContactForm from '@/components/ContactForm';
import { createPageMetadata, siteConfig } from '@/lib/siteConfig';
import { Clock3, Mail, MapPinned, Phone } from 'lucide-react';

export const metadata: Metadata = createPageMetadata({
  description:
    'Contact Shoreline AI Solutions in Clarenville for website design, local SEO, or business automation support built for Newfoundland companies.',
  path: '/contact',
  service: 'Contact & Booking',
});

const contactDetails = [
  {
    href: siteConfig.phoneHref,
    icon: Phone,
    label: 'Phone',
    value: siteConfig.phone,
  },
  {
    href: siteConfig.emailHref,
    icon: Mail,
    label: 'Email',
    value: siteConfig.email,
  },
  {
    href: `https://maps.google.com/?q=${encodeURIComponent(
      `${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} ${siteConfig.address.postalCode}`,
    )}`,
    icon: MapPinned,
    label: 'Address',
    value: `${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} ${siteConfig.address.postalCode}`,
  },
];

const intakePromises = [
  'Local follow-up from Clarenville during business hours.',
  'Recommendations shaped around your website, SEO, or automation goals.',
  'A clean handoff that keeps next steps obvious for your business.',
];

export default function ContactPage() {
  return (
    <main id="top" className="overflow-hidden">
      <section className="px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-800">
              Contact Page
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)] sm:text-6xl">
              Start the conversation with a clear plan for your next digital upgrade.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Shoreline AI Solutions helps Newfoundland businesses move faster with better
              websites, stronger local search visibility, and automations that clean up the lead
              flow.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <aside className="space-y-6">
              <div className="coast-card rounded-[2rem] p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Contact Info
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)]">
                  Reach out with the route that fits you best.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Use the direct contact details if you already know what you need, or the intake form if you want us to recommend the right mix of design, SEO, and automation support.
                </p>

                <address className="mt-8 space-y-4 not-italic">
                  {contactDetails.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-white/80 p-4 transition hover:border-sky-200 hover:shadow-md"
                      >
                        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                            {item.label}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-slate-800">{item.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </address>
              </div>

              <div className="coast-panel rounded-[2rem] p-7">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
                    <Clock3 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                      What Happens Next
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-950">
                      Clear expectations make follow-up feel premium.
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                  {intakePromises.map((promise) => (
                    <li key={promise} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-sky-700" />
                      <span>{promise}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-[1.6rem] border border-dashed border-slate-300 bg-white/70 p-8 text-center text-sm text-slate-500">
                  Google Map Placeholder
                </div>
              </div>
            </aside>

            <div id="intake-form">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <ConversionFooter
        aboutBlurb="Shoreline AI Solutions builds high-performance websites, local SEO systems, and smarter lead workflows for Newfoundland businesses from Clarenville."
        addressLine={`${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} ${siteConfig.address.postalCode}`}
        businessName={siteConfig.businessName}
        ctaLinks={[
          { href: '/#pricing', label: 'See Pricing' },
          { href: '/#portfolio', label: 'See Examples' },
          { href: siteConfig.phoneHref, label: `Call ${siteConfig.phone}` },
        ]}
        ctaTitle="Prefer a Faster Start?"
        ctaText="Use the intake form above and expect a reply within 1 business day, with faster follow-up for urgent website or SEO projects."
        email={siteConfig.email}
        emailHref={siteConfig.emailHref}
        mapPlaceholderLabel="Serving Clarenville and Newfoundland businesses"
        phone={siteConfig.phone}
        phoneHref={siteConfig.phoneHref}
        quickLinks={[
          { href: '/#about', label: 'About Barry' },
          { href: '/#portfolio', label: 'Portfolio' },
          { href: '/#pricing', label: 'Pricing' },
          { href: '/#services', label: 'Services' },
          { href: '/#process', label: 'Process' },
          { href: '/contact', label: 'Contact Page' },
        ]}
      />
    </main>
  );
}
