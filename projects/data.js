/**
 * projects/data.js
 * Single source of truth for all portfolio project data.
 * Import or include this file wherever project data is needed.
 */

const PROJECTS = [
  {
    id: 'ovia',
    title: 'Ovia',
    subtitle: 'Product Design',
    chip: 'Health · Wellness',
    image: 'projects/cover-images/Ovia_C.png',
    images: [
      'projects/Ovia.jpg.jpeg'
    ],
    color: 'wcp-green',
    tags: ['Product Design', 'UI/UX', 'Mobile', 'Health Tech'],
    desc: 'Health and wellness product design — intuitive onboarding, personalised dashboards, and a clean visual language that puts user wellbeing first.',
    overview: 'Ovia is a health and wellness platform designed to make personal health tracking approachable and empowering. The design prioritises clarity, calm, and progressive disclosure.',
    role: 'UI/UX Designer',
    duration: '6 Weeks',
    platform: 'Mobile App',
    process: [
      { phase: 'Discovery', detail: 'Stakeholder workshops and user persona development to define core health tracking needs.' },
      { phase: 'UX Design', detail: 'Onboarding flow, goal-setting wizard, and dashboard architecture designed for daily engagement.' },
      { phase: 'Prototyping', detail: 'Interactive Figma prototype tested with 12 users to validate navigation and readability.' },
      { phase: 'UI Polish', detail: 'Calming colour palette, soft typography, and micro-interactions to reduce anxiety in health tracking.' }
    ],
    behanceUrl: 'https://behance.net/vishnurajkj'
  },
  {
    id: 'hotel-booking',
    title: 'Hotel Booking',
    subtitle: 'Visual Design',
    chip: 'Hospitality · Travel',
    image: 'projects/cover-images/Hotelo_C.jpg',
    images: [
      'projects/Hotel Booking (Case study) 4.png'
    ],
    color: 'wcp-blue',
    tags: ['Visual Design', 'UI/UX', 'Responsive', 'Travel'],
    desc: 'High-fidelity visual design iteration for the hotel booking platform — refined UI components, updated colour system, and polished responsive layouts.',
    overview: 'A visual design deep-dive building on the original hotel booking case study. This iteration focuses on refining the UI component library, improving accessibility, and elevating the overall aesthetic.',
    role: 'UI Designer',
    duration: '4 Weeks',
    platform: 'Mobile & Web',
    process: [
      { phase: 'Component Audit', detail: 'Reviewed all existing components for consistency and accessibility compliance.' },
      { phase: 'Colour Refinement', detail: 'Updated colour palette to meet WCAG AA contrast ratios throughout.' },
      { phase: 'UI Components', detail: 'Rebuilt card, form, and navigation components with improved visual polish.' },
      { phase: 'Responsive Layouts', detail: 'Full responsive design across mobile (375px), tablet (768px), and desktop (1440px).' }
    ],
    behanceUrl: 'https://behance.net/vishnurajkj'
  },
  {
    id: 'web-1920-v1',
    title: 'Web 1920 — I',
    subtitle: 'UI Design',
    chip: 'Web · UI Design',
    image: 'projects/cover-images/Music_App.png',
    images: [
      'projects/Web 1920  1.jpg.jpeg'
    ],
    color: 'wcp-teal',
    tags: ['UI Design', 'Web', 'Responsive', 'Visual Design'],
    desc: 'Full-scale web UI design at 1920px — bold layout composition, strong visual hierarchy, and a refined design system for a modern digital experience.',
    overview: 'A desktop-first web UI exploration at 1920px canvas width. Emphasis on bold typographic composition, generous whitespace, and a cohesive visual system that scales gracefully across viewports.',
    role: 'UI/UX Designer',
    duration: '3 Weeks',
    platform: 'Web',
    process: [
      { phase: 'Concept', detail: 'Moodboarding and style exploration to define the visual direction and tone.' },
      { phase: 'Layout', detail: '1920px grid layout with intentional breakpoints at 1440px, 1024px, and 768px.' },
      { phase: 'Typography & Colour', detail: 'Custom type scale and colour system built for contrast and accessibility.' },
      { phase: 'Final UI', detail: 'Polished screens delivered as exportable Figma frames with auto-layout.' }
    ],
    behanceUrl: 'https://behance.net/vishnurajkj'
  },
  {
    id: 'atco-business-solutions',
    title: 'Atco business solutions',
    subtitle: 'Task Management',
    chip: 'Productivity · SaaS',
    image: 'projects/cover-images/Pemmin_Task.png',
    images: [
      'projects/Pemmin_Task.jpg.jpeg'
    ],
    color: 'wcp-purple',
    tags: ['Dashboard', 'UI/UX', 'SaaS', 'Productivity'],
    desc: 'Task and project management SaaS — designed for teams that need clarity. Clean dashboards, smart workflows, and a design system built for scale.',
    overview: 'Pemmin Task is a productivity SaaS tool for distributed teams. The design challenge was balancing feature density with visual simplicity — giving power users depth without overwhelming new users.',
    role: 'Product Designer',
    duration: '10 Weeks',
    platform: 'Web App',
    process: [
      { phase: 'Audit & Research', detail: 'Competitive audit of Asana, Linear, and Notion to identify differentiation opportunities.' },
      { phase: 'Design System', detail: 'Built a scalable component library with tokens for spacing, colour, and typography.' },
      { phase: 'Interaction Design', detail: 'Drag-and-drop board, kanban lanes, and inline editing with real-time feedback states.' },
      { phase: 'Handoff', detail: 'Detailed specs and annotated components delivered to the engineering team via Figma.' }
    ],
    behanceUrl: 'https://behance.net/vishnurajkj'
  },
  {
    id: 'sks-website',
    title: 'SKS Website',
    subtitle: 'Web Design',
    chip: 'Corporate · Branding',
    image: 'projects/cover-images/sks.png',
    images: [
      'projects/SKS WEBSITE JPEG(3 SLIDE).jpg.jpeg'
    ],
    color: 'wcp-orange',
    tags: ['Web Design', 'Branding', 'UI/UX', 'Corporate'],
    desc: 'Corporate website redesign with a strong visual identity — modern layout system, brand-consistent design language, and conversion-optimised page structures.',
    overview: 'A full corporate website redesign for SKS, focusing on brand elevation and lead generation. Structured content hierarchy, strong visual language, and responsive layouts across all breakpoints.',
    role: 'UI Designer',
    duration: '4 Weeks',
    platform: 'Web',
    process: [
      { phase: 'Brand Review', detail: 'Analysed existing brand assets and identified inconsistencies to resolve in the new design.' },
      { phase: 'Layout System', detail: 'Designed a modular grid system with reusable page sections for scalable content updates.' },
      { phase: 'Visual Design', detail: 'High-fidelity mockups for homepage, about, services, and contact pages across 3 breakpoints.' },
      { phase: 'Delivery', detail: 'Pixel-perfect assets and developer-ready specs exported from Figma.' }
    ],
    behanceUrl: 'https://behance.net/vishnurajkj'
  }
  // {
  //   id: 'web-1920-v2',
  //   title: 'Web 1920 — II',
  //   subtitle: 'UI Design',
  //   chip: 'Web · UI Design',
  //   image: 'projects/cover-images/music_player_cover_431x242.jpg',
  //   images: [
  //     'projects/Web 1920  2.jpg.jpeg'
  //   ],
  //   color: 'wcp-pink',
  //   tags: ['UI Design', 'Web', 'Interaction', 'Visual Design'],
  //   desc: 'Continuation of the Web 1920 series — deeper interaction design, refined motion principles, and a more sophisticated visual language for digital interfaces.',
  //   overview: 'The second chapter of the Web 1920 series pushes further into interaction design and motion. More complex component states, hover behaviours, and an evolved design language.',
  //   role: 'UI/UX Designer',
  //   duration: '3 Weeks',
  //   platform: 'Web',
  //   process: [
  //     { phase: 'Design Review', detail: 'Iterated on feedback from Web 1920 — I to refine layout density and component reuse.' },
  //     { phase: 'Interaction States', detail: 'Defined hover, focus, active, and disabled states for all interactive components.' },
  //     { phase: 'Motion Principles', detail: 'Documented animation guidelines: duration, easing, and transition patterns.' },
  //     { phase: 'Prototype', detail: 'High-fidelity interactive prototype in Figma for stakeholder review.' }
  //   ],
  //   behanceUrl: 'https://behance.net/vishnurajkj'
  // },
  // {
  //   id: 'hotel-booking-2',
  //   title: 'Hotel Booking — II',
  //   subtitle: 'Case Study',
  //   chip: 'Hospitality · Travel',
  //   image: 'projects/cover-images/Hotel Booking (Case study) 4.png',
  //   images: [
  //     'projects/Hotel Booking (Case study)  4.jpg.jpeg'
  //   ],
  //   color: 'wcp-blue',
  //   tags: ['UI/UX', 'UX Research', 'Mobile', 'Case Study'],
  //   desc: 'End-to-end hotel booking experience — user research, journey mapping, information architecture, and high-fidelity UI design for a seamless travel booking flow.',
  //   overview: 'A comprehensive UX case study redesigning the hotel booking experience from the ground up. Focused on reducing friction in the search-to-checkout flow while improving trust signals and visual clarity.',
  //   role: 'Lead UI/UX Designer',
  //   duration: '8 Weeks',
  //   platform: 'Mobile & Web',
  //   process: [
  //     { phase: 'Research', detail: 'User interviews, competitor analysis, and journey mapping to identify pain points in existing booking flows.' },
  //     { phase: 'Information Architecture', detail: 'Restructured navigation and content hierarchy to reduce cognitive load during the booking process.' },
  //     { phase: 'Wireframing', detail: 'Low and mid-fidelity wireframes iterated through 3 rounds of usability testing.' },
  //     { phase: 'Visual Design', detail: 'High-fidelity UI with a refined design system — typography, colour palette, and component library.' }
  //   ],
  //   behanceUrl: 'https://behance.net/vishnurajkj'
  // }
];

// Export for use in project-detail.js (script tag approach — no module bundler)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PROJECTS;
}
