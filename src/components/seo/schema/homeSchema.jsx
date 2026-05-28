export const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GraceTechie",
    url: "https://gracetechie.com.ng",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://gracetechie.com.ng/templates?search={query}",
      "query-input": "required name=query",
    },
  };