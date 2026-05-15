// servicesData.js
import socImage from '../../assets/social.jpeg'
import uiDesign from '../../assets/ui-ux.jpeg'
import branding from '../../assets/brand.jpeg'
import web from '../../assets/web.jpeg'
import packaging from '../../assets/pack.jpeg'
import seo from '../../assets/seo.jpeg'
import shopifyImg from '../../assets/pack.jpeg'

export const services = [
  { 
    name: 'Web Development', 
    type: 'Application Design',
    slug: 'web-development',
    icon: 'Monitor',
    description: 'We create responsive and modern web designs.', 
    id: 'web-development-pricing',
    image: web,
    process: [
      "Planning – Define project goals, target audience, and site structure.",
      "Wireframing – Create basic layouts and blueprint for page structure.",
      "Visual Design – Develop the look and feel including colors, typography, and images.",
      "Content Creation – Write and organize engaging, relevant content for each page.",
      "Development – Build the website using HTML, CSS, JavaScript, and other technologies.",
      "Testing – Check for functionality, responsiveness, browser compatibility, and usability.",
      "Launch – Deploy the website to a live server and ensure smooth operation.",
      "Maintenance – Regularly update content, fix bugs, and optimize performance."
    ],
    pricing: [
      {
        name: "Starter Website",
        price: 80,
        popular: false,
        features: [
          "1–5 page website",
          "Mobile responsive design",
          "Basic SEO setup",
          "Up to 100 products",
          "Contact form",
          "5–7 days delivery"
        ]
      },
      {
        name: "Business Website",
        price: 166,
        popular: true,
        features: [
          "Domain & Hosting (1 Year)",
          "Multi-page website",
          "On Page SEO optimization",
          "Speed optimization",
          "Up to 100 products",
          "Payment Gateway",
          "1 Month Support",
          "Analytics Integration"
  
        ]
      },
      {
        name: "Premium Web App",
        price: null,
        custom: true,
        features: [
          "Domain & Hosting (1 Year)",
          "Custom web application",
          "User & Admin Dashboard",
          "Business Email",
          "Payment Gateway",
          "Continuous support",
          "Analytics Integration",
          "Social Media Integration",
          "On Page & Off Page SEO",
          "Content Management"
        ]
      }
    ],
    faq: [
      {
        question: "What technologies do you use for development?",
        answer:
          "I work with React, Tailwind CSS, modern JavaScript frameworks, and no-code tools when appropriate."
      },
      {
        question: "Will the website be responsive?",
        answer:
          "Yes. All websites are fully responsive and optimized for desktop, tablet, and mobile devices."
      },
      {
        question: "Can you work with designs I already have?",
        answer:
          "Yes. I can build from existing designs or handle both design and development."
      },
      {
        question: "Do you provide post-launch support?",
        answer:
          "Yes. I offer support for updates, fixes, and improvements after launch."
      }
    ],    
    about: 'Web design is the art and science of creating visually appealing, user-friendly, and functional websites. It combines layout, color schemes, typography, imagery, and interactive elements to craft a compelling digital experience that reflects a brand’s identity and meets the needs of its audience.'
  },
{
  name: 'Shopify Store',
  type: 'E-commerce Store Setup',
  slug: 'shopify-store',
  icon: 'ShoppingCart',
  description: 'We build high-converting Shopify stores designed to turn visitors into paying customers.',
  id: 'shopify-store-pricing',
  image: shopifyImg,

  process: [
    "Discovery & Strategy – Understand your brand, products, target audience, and competitors.",
    "Store Setup – Create and configure your Shopify store, including domain, payments, and shipping.",
    "Theme Design – Customize a modern, mobile-responsive Shopify theme tailored to your brand.",
    "Product Upload – Add products with optimized descriptions, pricing, variants, and images.",
    "Conversion Optimization – Structure pages for maximum sales (CTA, trust badges, upsells, etc.).",
    "App Integration – Install essential apps for reviews, email marketing, automation, and analytics.",
    "Testing – Ensure smooth checkout flow, responsiveness, and performance across devices.",
    "Launch – Deploy your store live and ensure everything runs seamlessly.",
    "Growth Support – Provide guidance on scaling, marketing, and improving conversions."
  ],
  pricing: [
    {
      name: "Starter Store",
      price: 100,
      popular: false,
      features: [
        "Shopify setup",
        "Theme customization",
        "Payment integration",
        "10-20 products upload",
        "Mobile responsive"
      ]
    },
    {
      name: "Growth Store",
      price: 200,
      popular: true,
      features: [
        "Premium theme setup",
        "Custom Domain Integration",
        "Conversion optimization",
        "50 products upload",
        "Payment Gateway Integration",
        "Email marketing setup",
        "Basic SEO Setup",
        "1 Week Training & Support"
      ]
    },
    {
      name: "Full E-commerce Brand",
      price: null,
      custom: true,
      features: [
        "Fully Custom Store Design",
        "Unlimited Products Setup",
        "Custom App Development",
        "Advanced Marketing Automation",
        "Multi-Currency & Multi-Language",
        "Dedicated Account Manager",
        "Custom Integrations",
        "Priority Support & Maintenance",
        "Ongoing Training & Support"
      ]
    }
  ],
  faq: [
    {
      question: "Will my Shopify store be ready to accept payments?",
      answer:
        "Yes. Your store will be fully configured with payment gateways like Paystack, Stripe, or PayPal depending on your location."
    },
    {
      question: "Do you design custom Shopify stores or use templates?",
      answer:
        "Both. I can customize premium themes or build a unique design tailored to your brand and goals."
    },
    {
      question: "Can you upload my products for me?",
      answer:
        "Yes. I handle product uploads including images, descriptions, pricing, and variants."
    },
    {
      question: "Will my store be mobile-friendly?",
      answer:
        "Absolutely. Every Shopify store is optimized for mobile, tablet, and desktop users."
    },
    {
      question: "Do you provide support after launch?",
      answer:
        "Yes. I offer post-launch support and guidance to help you grow and manage your store effectively."
    }
  ],

  about: "Shopify store development focuses on building a professional, user-friendly, and conversion-optimized online store. It involves designing a visually appealing storefront, organizing products effectively, and integrating secure payment systems to ensure a seamless shopping experience. A well-built Shopify store not only looks good but is strategically structured to increase sales, improve customer trust, and support business growth. From startups to established brands, Shopify provides the tools needed to launch, manage, and scale a successful e-commerce business."
},
  { 
    name: 'Branding', 
    type: 'Business Branding',
    slug: 'branding',
    icon: 'PenTool',
    description: 'We provide top-notch branding services for businesses.', 
    id: 'business-branding-pricing',
    image: branding,
    process: [
      "Research & Analysis – Understand the market, competitors, and target audience.",
      "Brand Strategy – Define brand mission, values, positioning, and messaging.",
      "Brand Identity Design – Create logo, color palette, typography, and visual elements.",
      "Brand Voice – Develop tone, language style, and communication guidelines.",
      "Implementation – Apply the brand across marketing materials, website, and products.",
      "Promotion – Launch branding campaigns and build brand awareness.",
      "Monitoring & Evolution – Track brand perception and update branding as needed."
    ],
    pricing: [
      {
        name: "Starter Branding",
        price: 60,
        features: [
          "Custom Logo Design(2 Concepts)",
          "Primary Logo + Alternate Logo",
          "Brand Color Palette",
          "Typography Pairing",
          "Basic Brand Identity sheet (PDF)",
          "1 round of revisions",
          "High-resolution Delivery (PNG, JPG, SVG)"

        ]
      },
      {
        name: "Business Branding",
        price: 120,
        popular: true,
        features: [
          "Everything in Starter Branding",
          "Advanced Logo System",
          "Full Brand Color System",
          "Typography System",
          "Brand Guidelines Document",
          "Social Media Kit",
          "Business Assets (Card, Email, Signature)",
          "Mockups for Real-world Preview",
          "2–3 rounds of revisions",
          "Priority delivery"
        ]
      },
      {
        name: "Full Branding Identity",
        price: null,
        custom: true,
        features: [
          "Brand strategy & discovery session",
          "Target audience & competitor analysis",
          "Brand positioning & messaging framework",
          "Brand voice & tone definition",
          "Complete visual identity system",
          "Custom logo suite & brand assets",
          "Full brand guidelines (20+ pages)",
          "Marketing & launch assets (ads, banners, creatives)",
          "Website design direction (UI reference or wireframe)",
          "Ongoing design support (limited period)",
          "Unlimited revisions (within scope)"
        ]
      }
    ],
    faq: [
      {
        question: "What does a branding project include?",
        answer:
          "Branding typically includes logo design, color palette, typography, visual direction, and brand guidelines."
      },
      {
        question: "Is branding only for new businesses?",
        answer:
          "No. I also help existing brands reposition, refresh, or clarify their identity to better align with their goals."
      },
      {
        question: "Will I receive brand guidelines?",
        answer:
          "Yes. You’ll receive clear brand guidelines that ensure consistency across digital and print platforms."
      },
      {
        question: "Can branding work with my existing logo?",
        answer:
          "Yes. If your logo works, I can build a strong visual system around it without starting from scratch."
      }
    ],    
    about: 'Business branding is the strategic process of creating a unique identity for a company that resonates with its target audience. It goes beyond just a logo or visual elements — branding defines how a business is perceived through its values, voice, visual style, and customer experience. Effective branding builds trust, fosters recognition, and sets a business apart from its competitors.'
  },
  { 
    name: 'UI/UX Design', 
    type: 'Web UI/UX Design',
    slug: 'ui-ux',
    icon: 'LayoutDashboard',
    description: 'We provide top-notch UI/UX design services.', 
    id: 'ui-ux-design-pricing',
    image: uiDesign,
    process: [
      "Research – Understand user needs, business goals, and market trends.",
      "Wireframing – Create low-fidelity layouts to define structure and user flow.",
      "Prototyping – Develop interactive models to test usability and design concepts.",
      "Visual Design – Craft the interface’s look and feel including colors, typography, and icons.",
      "User Testing – Gather feedback by observing real users interacting with the prototype.",
      "Iteration – Refine the design based on user feedback and usability testing.",
      "Development Handoff – Collaborate with developers to ensure accurate implementation.",
      "Launch & Monitoring – Release the product and monitor user behavior for continuous improvement."
    ],
    pricing: [
      {
        name: "Basic UI Design",
        price: 50,
        features: [
          "1–6 screens",
          "Wireframe + UI design",
          "Mobile responsive",
          "Figma file delivery"
        ]
      },
      {
        name: "Product UI/UX Design",
        price: 140,
        popular: true,
        features: [
          "Full App/Web Design",
          "User Flow Design",
          "Interactive prototype",
          "Mobile responsive",
          "Design system",
          "Figma File Delivery"
        ]
      },
      {
        name: "Advanced UX Strategy",
        price: null,
        custom: true,
        features: [
          "Full App/Web Design",
          "User Flow Design",
          "Interactive prototype",
          "Mobile responsive",          
          "User Research",
          "UX Strategy",
          "Testing & iteration",
          "Full product redesign",
          "Figma File Delivery",
        ]
      }
    ],
    faq: [
      {
        question: "What is included in UI/UX design?",
        answer:
          "UI/UX design includes user research, wireframes, user flows, and high-fidelity interface designs focused on usability."
      },
      {
        question: "Do you design for web and mobile apps?",
        answer:
          "Yes. I design interfaces for websites, web apps, and mobile applications."
      },
      {
        question: "Do you follow a specific design system?",
        answer:
          "I use modern, scalable design systems tailored to the product’s needs rather than rigid templates."
      },
      {
        question: "Can you redesign an existing product?",
        answer:
          "Yes. I improve usability, clarity, and visual consistency without disrupting existing users."
      }
    ],    
    about: 'UI/UX Design focuses on enhancing user satisfaction by improving the usability, accessibility, and overall experience of digital products. UI (User Interface) design deals with the look and feel — including layout, colors, typography, and interactive elements — ensuring a visually appealing and consistent design across devices. UX (User Experience) design, on the other hand, is about the overall journey a user takes when interacting with a product. It involves research, wireframing, user flows, and testing to create intuitive, efficient, and enjoyable experiences.'
  },
  
  { 
    name: 'SEO Optimization', 
    type: 'Search Engine Optimization',
    slug: 'seo',
    icon: 'Search',
    description: 'Our SEO services help you rank higher on search engines.', 
    id: 'seo-pricing',
    image: seo,
    process: [
      "Keyword Research – Identify relevant keywords your target audience uses to guide content and optimization.",
      "On-Page Optimization – Optimize titles, meta tags, headers, images, and content with target keywords and clear site structure.",
      "Technical SEO – Improve site speed, mobile-friendliness, HTTPS security, XML sitemaps, and fix crawl errors.",
      "Content Creation – Develop valuable, engaging, and regularly updated content that answers user questions.",
      "Link Building – Acquire quality backlinks from authoritative sites to boost credibility and domain authority.",
      "Monitoring and Analysis – Track traffic, keyword rankings, and user behavior using tools like Google Analytics and Search Console.",
      "Ongoing Optimization – Continuously update strategies based on performance data and algorithm changes."
    ],
    pricing: [
      {
        name: "Basic SEO",
        price: 80,
        features: [
          "Website SEO Audit",
          "Keyword research",
          "On-page SEO (5 Pages)",
          "3 Blog Posts",
          "Titles, Images & Meta Tags",
        ]
      },
      {
        name: "Growth SEO",
        price: 120,
        popular: true,
        features: [
          "Website SEO Audit",
          "Keyword Research",
          "On-Page SEO (10 Pages)",
          "5 Blog Posts",
          "Content optimization",
          "Titles, Images & Meta Tags",
          "Google Search setup",
          "Monthly Reports",
          "GSC & Google Analytics Setup"
        ]
      },
      {
        name: "Advanced SEO",
        price: null,
        custom: true,
        features: [
          "Website SEO Audit",
          "Keyword Research",
          "Full SEO strategy",
          "On-Page SEO (xx Pages)",
          "xx Blog Posts",
          "Titles, Images & Meta Tags",
          "GSC & Google Analytics Setup",
          "Off-Page SEO",
          "Backlink Building",
          "Monthly Reports",
        ]
      }
    ],
    faq: [
      {
        question: "What does your SEO service focus on?",
        answer:
          "SEO services focus on technical optimization, content structure, performance, and search visibility."
      },
      {
        question: "How long does SEO take to show results?",
        answer:
          "SEO is a long-term strategy. Improvements typically become noticeable within 3–6 months."
      },
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "No. I focus on sustainable, ethical SEO practices rather than unrealistic guarantees."
      },
      {
        question: "Can you optimize an existing website?",
        answer:
          "Yes. I audit and improve existing sites without needing a full redesign."
      }
    ],    
    about: 'SEO (Search Engine Optimization) is the process of improving a website’s visibility on search engines like Google, making it easier for potential customers to find your business online.'
  },
  { 
    name: 'Social Media Management',
    type: 'Social Media Management', 
    slug: 'social',
    icon: 'Users',
    description: 'We manage your social media to grow your online presence.', 
    id: 'social-media-management',
    image: socImage,
    process: [
      "Strategy – Define goals, target audience, and platform approach.",
      "Content Creation – Design eye-catching visuals and write engaging captions.",
      "Scheduling – Plan and automate posts for consistent visibility.",
      "Engagement – Respond to comments, messages, and foster community.",
      "Monitoring – Track key metrics like reach, likes, shares, and clicks.",
      "Optimization – Adjust content and timing based on performance insights."
    ],
    pricing: [
      {
        name: "Starter Plan",
        month: "per month",
        price: 40,
        features: [
          "1 Social Media Platform",
          "10 Posts per Month",
          "Account Setup & Optimization",
          "Content Creation",
          "Basic Graphics Design",
          "Community Management",
          "Monthly Analytics Report"
        ]
      },
      {
        name: "Growth Plan",
        month: "per month",
        price: 80,
        popular: true,
        features: [
          "2 Social Media Platform",
          "15 Posts per Month",
          "Account Setup & Optimization",
          "Premium Content Creation",
          "Custom Graphics & Videos",
          "Community Management",
          "Hashtag Strategy",
          "Detailed Analytics & Insights"
        ]
      },
      {
        name: "Full Management",
        month: "per month",
        price: null,
        custom: true,
        features: [
          "Full Social Media management",
          "Daily Posts (30+ per Month)",
          "Content + strategy",
          "Account Setup & Optimization",
          "Premium Content Creation",
          "Custom Graphics & Videos",
          "Advanced Paid Ads Campaigns",
          "24/7 Community Management",
          "Hashtag Strategy",
          "Detailed Analytics & Insights",
          "Dedicated Account Manager"
        ]
      }
    ],
    faq: [
      {
        question: "Which platforms do you manage?",
        answer:
          "I manage platforms such as Instagram, Tiktok, Twitter (X), LinkedIn, and Facebook depending on your audience."
      },
      {
        question: "Do you create the content?",
        answer:
          "Yes. Content strategy, visuals, and captions are handled as part of the service."
      },
      {
        question: "How often do you post?",
        answer:
          "Posting frequency is customized based on your goals, audience, and platform strategy."
      },
      {
        question: "Do you handle engagement and responses?",
        answer:
          "Engagement support can be included depending on the plan and scope."
      }
    ],    
    about: 'Social Media Management is the strategic planning, creation, and monitoring of content across platforms to build brand awareness, engage audiences, and drive business growth.'
  },
];