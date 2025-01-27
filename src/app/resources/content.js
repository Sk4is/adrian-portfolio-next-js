import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Adrián",
  lastName: "Pérez Agredano",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Multiplatform & Web Developer",
  avatar: "/images/Photo.png",
  location: "Europe/Madrid", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Spanish", "English"], // optional: Leave the array empty if you don't want to display languages
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Sk4is",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/adri%C3%A1n-p%C3%A9rez-agredano-214789243/",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:adrianperezagredano@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Multiplatform & Web Developer</>,
  subline: (
    <>
      I'm {person.firstName}, a Multiplatform & Web Developer, where I craft from the simple to de complex
      <br /> apps/websites, always looking for a good user experience. After being studying for almost 4 years, I'll show you what i learned.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Adrián is a dedicated web and cross-platform application developer with expertise in technologies like HTML, CSS, JavaScript, PHP, React... With a strong background in both front-end and back-end development, he thrives in collaborative environments and independently managed projects. <br/><br/>
        Passionate about problem-solving and enhancing user experience, Adrián is eager to contribute his skills and creativity to impactful digital projects while staying current with emerging trends and tools.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "SHS",
        timeframe: "March 2023 - June 2023",
        role: "Database Administrator",
        achievements: [
          <>
            Review and maintain the Seville City Council database.
          </>,
          <>
            Create various scripts, both in SQL and PlSQL, thus creating functions and procedures to maintain the database.
          </>,
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "CEI",
        date: "(2024 - 2025)",
        description: <>Web Application Development.</>,
        degree: "Degree: Technician in Web Application Development"
      },
      {
        name: "Udemy",
        date: "(2023 - 2024)",
        description: <>Defensive Cybersecurity.</>,
        degree: "Degree: Defensive Cybersecurity diploma"
      },
      {
        name: "EUSA",
        date: "(2021 - 2023)",
        description: <>Multiplatform Application Development.</>,
        degree: "Degree: Technician in Multiplatform Application Development"
      },
      {
        name: "St James",
        date: "(2008 - 2025)",
        description: <>English School.</>,
        degree: "Degree: B1 (Cambridge)"
      },
      {
        name: "Colegio Aljarafe",
        date: "(2005 - 2021)",
        description: <>Primary, Secondary and High School.</>,
        degree: "Degree: High School diploma"
      },
    ],
  },
  volunteering: {
    title: "Volunteering",
    display: true,
    experiences: [
      {
        organization: "Junta de Andalucía",
        role: "Volunteer Reconstructor",
        timeframe: "(June 2024 - July 2024)",
        description: "Building sustainable infrastructures using recycled and biodegradable materials, promoting eco-friendly construction practices, and creating recreational spaces for youth development.",
      },
    ]
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical Skills",
    skills: [
      {
        title: "Java",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
      },
      {
        title: "HTML",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
      },
      {
        title: "Data Bases",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
      },
      ,
      {
        title: "SQL - PL/SQL",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
      },
      ,
      {
        title: "Integrated Development Environment",
        description: <>Knowledge of some IDE like: Visual Studio Code, IntelliJ IDEA, Eclipse, NetBeans, Android Studio.</>,
      },
      ,
      {
        title: "Front-End",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
      },
      ,
      {
        title: "Back-End",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
      },
      ,
      {
        title: "Operating Systems",
        description: <>I can handle different Operative Systems like: Windows 10, Windows 11 or linux.</>,
      },
      ,
      {
        title: "JavaScript",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
      },
      {
        title: "PHP",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
      },
      {
        title: "Frameworks",
        description: <>Knowledge about React, Node, Laravel, Jest, Next or Bootstrap.</>,
      },
      {
        title: "Productivity Packages (Microsoft Office & Google Workspace)",
        description: <>I have worked with: <br />
        - <b>Microsoft Office</b>: Excel, Word, Powerpoint, Outlook, Teams. <br />
        - <b>Google Workspace</b>: Docs, Slides, Sheets, Calendar, Gmail, Forms, Meet, Drive.</>,
      },
      {
        title: "TypeScript",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
      },
    ],
  },
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  headline: <>Multiplatform & Web Developer</>,
  subline: (
    <>
      I'm {person.firstName}, a Multiplatform & Web Developer, where I craft from the simple to de complex
      <br /> apps/websites, always looking for a good user experience. After being studying for almost 4 years, I'll show you what i learned.
    </>
  ), 
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, home, about, work, gallery };
