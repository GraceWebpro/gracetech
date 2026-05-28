export const templateSchema = (template) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: template.title,
    description: template.description,
    image: template.image,
    url: `https://gracetechie.com.ng/templates/${template.slug}`,
    author: {
      "@type": "Organization",
      name: "GraceTechie",
    },
  });

  export const templateFAQSchema = (template) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is this template used for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${template.title} is designed for building modern websites quickly and efficiently.`,
        },
      },
      {
        "@type": "Question",
        name: "Can I customize this template?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all templates are fully customizable using React components.",
        },
      },
      {
        "@type": "Question",
        name: "Is this template mobile friendly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, it is fully responsive and optimized for all devices.",
        },
      },
    ],
  });