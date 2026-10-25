import type { Dictionary } from './he';

const en: Dictionary = {
  meta: {
    home: {
      title: 'Custom Websites for Small Businesses in Israel | Web Witch',
      description:
        'Custom web design and development for small and creative businesses in Israel. Design, development and automations in one place, in Hebrew and English.',
    },
    about: {
      title: 'About Julia Savransky-Perl, Web Designer | Web Witch',
      description:
        "I'm Julia Savransky-Perl, an industrial designer turned web developer. I build websites for businesses that know their vibe and need someone to build it right.",
    },
    projects: {
      title: 'Selected Work: Websites for Creative Businesses | Web Witch',
      description:
        'Websites I built for a numerologist, a spiritual shop, a couture atelier, workshops and an education project. Each one shaped around the business.',
    },
    contact: {
      title: "Contact: Let's Build Your Website | Web Witch",
      description:
        'Want a website that actually feels like you? Leave your details in the form or message me directly on WhatsApp.',
    },
    privacy: {
      title: 'Privacy Policy | Web Witch',
      description: 'What information the Web Witch website collects and why.',
    },
  },
  nav: {
    label: 'Main navigation',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
    home: 'Home',
    about: 'About',
    projects: 'Work',
    contact: 'Contact',
    otherLang: 'עברית',
  },
  common: {
    whatsapp: 'Message me on WhatsApp',
    newTab: '(opens in a new tab)',
    ogImageAlt: 'Web Witch card: the wordmark above the line "Custom websites for small and creative businesses in Israel"',
  },
  home: {
    h1: 'Custom websites for small and creative businesses in Israel',
    lead: 'Design, development and automations in one place. You bring the vibe, I build a site that brings clients.',
    secondaryCta: 'See my work',
    servicesTitle: 'What I build',
    services: [
      { title: 'Design', body: "Design that grows out of your business's character, not out of a template." },
      { title: 'Development', body: 'A Hebrew and English site that looks right and works well on phones and desktops.' },
      { title: 'Automations', body: 'Forms and workflows that connect to your business and run on their own, so you can focus on clients.' },
    ],
    processTitle: 'How it works',
    process: [
      { title: 'Intro call', body: 'We talk about your business, your clients and what the site needs to do for you.' },
      { title: 'Design and build', body: 'I design and build, and you see the site take shape along the way.' },
      { title: 'Launch', body: 'The site goes live, ready to present your business and bring in enquiries.' },
    ],
    clientsTitle: "I've worked with",
    finalTitle: 'Have an idea for a website?',
    finalBody: 'Tell me about it, on WhatsApp or through the form.',
    finalCta: 'Go to the contact form',
  },
  about: {
    h1: 'Julia Savransky-Perl, web designer and developer',
    photoAlt: 'Julia Savransky-Perl, web designer and developer at Web Witch',
    paragraphs: [
      "I'm Julia, an industrial designer turned creative web developer. I blend aesthetics, technology and just the right amount of magic to build websites that don't just work, they feel.",
      'Every project I take on is crafted with care, designed to stand out and coded to connect. I love turning ideas into interfaces, dreams into code and brands into experiences people remember.',
      "If you're a small business owner or a designer looking for a developer, let's talk.",
    ],
    toolsTitle: 'Tools I code with',
    cta: "Let's talk",
  },
  projects: {
    h1: 'Selected work',
    lead: 'Websites I built for real businesses, and how ideas become sites that work.',
    visit: 'Visit site',
    experimentsTitle: 'Experiments and practice',
    experimentsLead: 'Projects I built along the way to learn and try things out.',
  },
  contact: {
    h1: "Let's talk",
    lead: "Leave your details here, or message me directly on WhatsApp. I'll get back to you soon.",
    orForm: 'Or use the form:',
    name: 'Name',
    email: 'Email',
    message: 'Tell me about your project',
    send: 'Send message',
    sending: 'Sending...',
    sent: "Message sent. I'll get back to you soon.",
    errorTitle: "Your message wasn't sent",
    errorBody: 'Something went wrong while sending. You can try again, or message me on WhatsApp.',
    errorWhatsapp: 'Open WhatsApp',
    errorClose: 'Close',
  },
  footer: {
    tagline: 'Web design and development for small and creative businesses in Israel.',
    contactTitle: 'Contact',
    linksTitle: 'Links',
    privacy: 'Privacy policy',
  },
  privacy: {
    h1: 'Privacy policy',
    sections: [
      {
        title: 'Contact form',
        body: "When you send the form, your name, email and message are emailed to me so I can reply. They aren't stored on the website or shared with anyone else.",
      },
      {
        title: 'Google Analytics',
        body: 'The site uses Google Analytics to understand how many people visit and which pages help them. Google stores cookies in your browser for this. You can block them in your browser settings.',
      },
      {
        title: 'Requests and deletion',
        body: 'To see or delete information about you, message me on WhatsApp or through the contact form.',
      },
    ],
  },
  notFound: {
    title: 'Page not found',
    body: 'The link may have changed. You can continue from here:',
  },
};

export default en;
