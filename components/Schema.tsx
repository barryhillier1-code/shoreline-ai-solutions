import { buildCanonicalUrl, siteConfig } from '@/lib/siteConfig';

type SchemaProps = {
  priceRange?: string;
  serviceTypes?: string[];
};

export default function Schema({
  priceRange = siteConfig.priceRange,
  serviceTypes = siteConfig.serviceTypes,
}: SchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${buildCanonicalUrl('/')}#localbusiness`,
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.address,
    },
    areaServed: [
      siteConfig.city,
      'Trinity Bay',
      `${siteConfig.city}, ${siteConfig.regionShort}`,
      siteConfig.countryName,
    ],
    email: siteConfig.email,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    image: siteConfig.socialPreviewImage,
    name: siteConfig.businessName,
    openingHours: siteConfig.openingHours,
    priceRange,
    serviceType: serviceTypes,
    telephone: siteConfig.phone,
    url: buildCanonicalUrl('/'),
  };

  return (
    <script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
