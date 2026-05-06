import type { Metadata, MetadataRoute } from 'next';

type RouteConfig = {
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  description: string;
  path: string;
  priority: number;
  service: string;
};

export const siteConfig = {
  address: {
    addressCountry: 'CA',
    addressLocality: 'Clarenville',
    addressRegion: 'NL',
    postalCode: 'A5A 1V3',
    streetAddress: '8 Park Avenue',
  },
  businessName: 'Shoreline AI Solutions',
  city: 'Clarenville',
  countryName: 'Canada',
  defaultDescription:
    'Shoreline AI Solutions builds high-performance websites, local SEO systems, and optional smart automations for Newfoundland businesses from Clarenville, NL.',
  email: 'Barry.Hillier1@icloud.com',
  emailHref: 'mailto:Barry.Hillier1@icloud.com',
  geo: {
    latitude: 48.1454,
    longitude: -53.9668,
  },
  keywords: [
    'web design Clarenville',
    'Clarenville web designer',
    'Newfoundland business websites',
    'local SEO Newfoundland',
    'Google Business setup Newfoundland',
    'small business websites NL',
  ],
  openingHours: ['Mo-Fr 09:00-17:00'],
  phone: '709-641-1028',
  phoneHref: 'tel:+17096411028',
  priceRange: '$$',
  primaryService: 'Website Design',
  regionShort: 'NL',
  routes: [
    {
      changeFrequency: 'weekly',
      description:
        'Shoreline AI Solutions builds high-performance websites, local SEO systems, and smart automations for Newfoundland businesses from Clarenville.',
      path: '/',
      priority: 1,
      service: 'Website Design',
    },
    {
      changeFrequency: 'weekly',
      description:
        'Contact Shoreline AI Solutions for a website project, local SEO help, or an automation-focused digital upgrade from Clarenville, NL.',
      path: '/contact',
      priority: 0.8,
      service: 'Contact & Booking',
    },
  ] satisfies RouteConfig[],
  serviceTypes: ['Website design', 'Local SEO', 'Business automation', 'AI chatbot setup'],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://shorelineai.ca',
  socialPreviewAlt: 'Shoreline AI Solutions preview for Newfoundland business growth',
  socialPreviewImage:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlYiUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=80&w=3000',
};

export function buildPageTitle(service: string) {
  return `${service} in ${siteConfig.city}, ${siteConfig.regionShort} | ${siteConfig.businessName}`;
}

export function buildCanonicalUrl(path = '/') {
  return new URL(path, siteConfig.siteUrl).toString();
}

type PageMetadataOptions = {
  description: string;
  path?: string;
  service: string;
};

export function createPageMetadata({
  description,
  path = '/',
  service,
}: PageMetadataOptions): Metadata {
  const title = buildPageTitle(service);
  const url = buildCanonicalUrl(path);

  return {
    alternates: {
      canonical: path,
    },
    description,
    keywords: siteConfig.keywords,
    metadataBase: new URL(siteConfig.siteUrl),
    openGraph: {
      description,
      images: [
        {
          alt: siteConfig.socialPreviewAlt,
          height: 2250,
          url: siteConfig.socialPreviewImage,
          width: 3000,
        },
      ],
      locale: 'en_CA',
      siteName: siteConfig.businessName,
      title,
      type: 'website',
      url,
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: [siteConfig.socialPreviewImage],
      title,
    },
  };
}
