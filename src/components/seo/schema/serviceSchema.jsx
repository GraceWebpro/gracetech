export const serviceSchema = (service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `https://gracetechie.com.ng/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: "GraceTechie",
      url: "https://gracetechie.com.ng",
    },
  });