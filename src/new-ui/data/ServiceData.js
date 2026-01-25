// servicesData.js
import socImage from '../../assets/social.jpeg'
import uiDesign from '../../assets/ui-ux.jpeg'
import branding from '../../assets/brand.jpeg'
import web from '../../assets/web.jpeg'
import packaging from '../../assets/pack.jpeg'
import seo from '../../assets/seo.jpeg'

export const services = [
  { 
    name: 'Designer', 
    type: 'Packaging Design',
    slug: 'designer',
    icon: 'Package', // Lucide icon component
    description: 'We provide top-notch branding services for businesses.', 
    id: 'packaging-design',
    image: packaging,
    process: [
      "Concept Development – Understand the project requirements and brainstorm ideas.",
      "Sketching – Create rough sketches to explore different compositions and styles.",
      "Refinement – Select the best sketch and refine details and proportions.",
      "Color Selection – Choose color palettes that fit the mood and purpose of the illustration.",
      "Digital Rendering – Use digital tools to create the final illustration with clean lines and colors.",
      "Review & Feedback – Share the illustration for feedback and make necessary adjustments.",
      "Finalization – Prepare the final files in required formats and resolutions for delivery."
    ],
    about: "Illustration design is a creative process that involves crafting visual representations to communicate ideas, stories, or messages. From detailed hand-drawn art to digital graphics, illustration plays a vital role in enhancing brand identity, simplifying complex concepts, and capturing attention across various media platforms. Whether it's for editorial content, product packaging, marketing materials, or websites, illustration design blends art and storytelling to evoke emotions and deliver impactful communication. With the right style and creativity, illustrations can set a brand apart and create a memorable experience for its audience."
  },
  { 
    name: 'Branding', 
    type: 'Business Branding',
    slug: 'branding',
    icon: 'PenTool',
    description: 'We provide top-notch branding services for businesses.', 
    id: 'business-branding',
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
    about: 'Business branding is the strategic process of creating a unique identity for a company that resonates with its target audience. It goes beyond just a logo or visual elements — branding defines how a business is perceived through its values, voice, visual style, and customer experience. Effective branding builds trust, fosters recognition, and sets a business apart from its competitors.'
  },
  { 
    name: 'UI/UX Design', 
    type: 'Web UI/UX Design',
    slug: 'ui-ux',
    icon: 'LayoutDashboard',
    description: 'We provide top-notch UI/UX design services.', 
    id: 'ui-ux-design',
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
    about: 'UI/UX Design focuses on enhancing user satisfaction by improving the usability, accessibility, and overall experience of digital products. UI (User Interface) design deals with the look and feel — including layout, colors, typography, and interactive elements — ensuring a visually appealing and consistent design across devices. UX (User Experience) design, on the other hand, is about the overall journey a user takes when interacting with a product. It involves research, wireframing, user flows, and testing to create intuitive, efficient, and enjoyable experiences.'
  },
  { 
    name: 'Web Development', 
    type: 'Application Design',
    slug: 'web-dev',
    icon: 'Monitor',
    description: 'We create responsive and modern web designs.', 
    id: 'web-development',
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
    about: 'Web design is the art and science of creating visually appealing, user-friendly, and functional websites. It combines layout, color schemes, typography, imagery, and interactive elements to craft a compelling digital experience that reflects a brand’s identity and meets the needs of its audience.'
  },
  { 
    name: 'SEO Optimization', 
    type: 'Digital Marketing',
    slug: 'seo',
    icon: 'Search',
    description: 'Our SEO services help you rank higher on search engines.', 
    id: 'seo-optimization',
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
    about: 'SEO (Search Engine Optimization) is the process of improving a website’s visibility on search engines like Google, making it easier for potential customers to find your business online.'
  },
  { 
    name: 'Social',
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
    about: 'Social Media Management is the strategic planning, creation, and monitoring of content across platforms to build brand awareness, engage audiences, and drive business growth.'
  },
];