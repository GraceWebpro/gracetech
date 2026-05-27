import {
    Code,
    ShoppingCart,
    Search,
    Megaphone
  } from "lucide-react";
  

export const STATS = [
    { label: 'Years Experience', value: '3+' },
    { label: 'projects Completed', value: '50+' },
    { label: 'Technologies', value: '15+' },
    {label: 'Client satisfaction', value: '98%' }
];

export const SOCIAL_LINKS = {
    tiktok: "https://www.tiktok.com/@gracetechie",
    instagram: "https://www.instagram.com/gracetechie_/",
    facebook: "https://web.facebook.com/gracetechie/",
    dribble: "https://dribble.com",
}

export const ABOUT_STATS = [
    { label: 'Happy Clients', value: '45+' },
    { label: 'Code Commits', value: '2.5k+' },
    { label: 'Github Stars', value: '500+' }
];


  export const NAV_LINKS = [
    { id: "about", label: "About", type: "section" },
  
    {
      id: "services",
      label: "Services",
      type: "dropdown",
      dropdown: [
        {
          label: "Web Design/Development",
          id: "web-dev",
          icon: Code,
          type: "route",
          path: "/services/web-development-pricing",
        },
        {
          label: "Shopify Store",
          id: "shopify",
          icon: ShoppingCart,
          type: "route",
          path: "/services/shopify-store-pricing",
        },
        {
          label: "SEO Optimization",
          id: "seo",
          icon: Search,
          type: "route",
          path: "/services/seo-pricing",
        },
        {
          label: "Social Media Management",
          id: "smm",
          icon: Megaphone,
          type: "route",
          path: "/services/social-media-management",
        },
      ],
    },
  
    { id: "templates", label: "Templates", type: "route", path: "/templates" },
    { id: "projects", label: "Portfolio", type: "section" },
    { id: "contact", label: "Contact", type: "section" },
  ];
  