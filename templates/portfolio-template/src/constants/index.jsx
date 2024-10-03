import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";
import user4 from "../assets/user4.jpg";
import user5 from "../assets/user5.jpg";
import user6 from "../assets/user6.jpg";

import {
    FaXTwitter,
    FaGithub,
    FaLinkedin,
    FaDiscord,
    FaInstagram,
    FaSlack,
} from "react-icons/fa6";

export const NAVBAR_MEDIA_LINKS = [
    {
        href: "#",
        icon: <FaXTwitter fontSize={25} className="hover:opacity-80" />,
    },
    {
        href: "https://github.com/AE-Hertz/",
        icon: <FaGithub fontSize={25} className="hover:opacity-80" />,
    },
];

export const HERO_NAME = "AE_HERTZ";
export const HERO_HEADING = "Full Stack Developer";
export const HERO_CONTENT = `I am a passionate full stack developer with a knack for crafting robust and scalable web applications. With my emerging knowledge of hands-on experience, I have honed my skills in front-end technologies like React and Next.js, as well as back-end technologies like Node.js and MongoDB. My goal is to leverage my expertise to create innovative solutions that drive business growth and deliver exceptional user experiences.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. I have worked with a variety of technologies, including React, Next.js, Node.js and MongoDB. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const WORK = [
    {
        year: "2023 - Present",
        role: "Senior Full Stack Developer",
        company: "Animata.Design",
        description: `Lead a team in designing and developing innovative design tools using JavaScript, React.js, and Node.js. Implemented RESTful APIs and integrated with MongoDB databases. Collaborated with clients and stakeholders to define project requirements and timelines.`,
        technologies: ["JavaScript", "React.js", "Next.js", "MongoDB"],
    },
    {
        year: "2022 - 2023",
        role: "Frontend Developer",
        company: "Figma",
        description: `Designed and developed user interfaces for collaborative design applications using Next.js and React. Worked closely with backend developers to integrate frontend components with Node.js APIs. Implemented responsive designs and optimized performance for seamless user experience.`,
        technologies: ["HTML", "CSS", "Vue.js", "MySQL"],
    },
    {
        year: "2021 - 2022",
        role: "Full Stack Developer",
        company: "Dribbble",
        description: `Developed and maintained web applications to enhance the design community using JavaScript, React.js, and Node.js. Designed and implemented RESTful APIs for data communication and user interaction. Collaborated with designers and product teams to deliver high-quality software products on schedule.`,
        technologies: ["Python", "Svelte", "Three.js", "PostgreSQL"],
    },
    {
        year: "2020 - 2021",
        role: "Software Engineer",
        company: "Behance",
        description: `Contributed to the development of web applications for showcasing creative work using JavaScript, React.js, and Node.js. Managed databases and implemented data storage solutions using MongoDB. Worked closely with product managers to prioritize features and enhancements for better user engagement.`,
        technologies: ["Ruby", "Rails", "PHP", "SQLite"],
    },
];

export const TESTIMONIALS_CONTENT = {
    sectionTitle: "What Our Clients Say",
    sectionDescription:
        "Hear from the professionals who rely on Animata.Design to create stunning products and enhance their workflows.",
    reviews: [
        {
            name: "Alice Johnson",
            title: "Product Designer",
            review: "Animata.Design has transformed how we approach design. The intuitive interface and powerful tools have made it easy to iterate on ideas and deliver high-quality products faster.",
            image: user1,
        },
        {
            name: "Bob Smith",
            title: "Creative Director",
            review: "The Animata.Design team has been exceptional. Their platform offers incredible flexibility, allowing us to adapt quickly to client needs while maintaining creative control.",
            image: user2,
        },
        {
            name: "Carla Mendes",
            title: "UI/UX Lead",
            review: "The precision and ease of use in Animata.Design are unparalleled. Our team has been able to design beautiful, functional interfaces that truly resonate with our users.",
            image: user3,
        },
        {
            name: "David Lee",
            title: "Head of Design",
            review: "Since adopting Animata.Design, we've seen a significant boost in efficiency. The platform's collaboration features make it easy for teams to work together seamlessly.",
            image: user4,
        },
        {
            name: "Ella Fernandez",
            title: "Freelance Designer",
            review: "Animata.Design offers the perfect blend of creative freedom and technical precision. It’s an essential tool in my design toolkit, and I couldn’t imagine working without it.",
            image: user5,
        },
        {
            name: "Frank Wilson",
            title: "Design Strategist",
            review: "The insights and analytics provided by Animata.Design help us make informed design decisions. It's a game-changer for anyone serious about elevating their design process.",
            image: user6,
        },
    ],
};

export const SOCIAL_MEDIA_LINKS = [
    {
        href: "#",
        icon: <FaSlack fontSize={25} className="hover:opacity-80" />,
    },
    {
        href: "#",
        icon: <FaDiscord fontSize={25} className="hover:opacity-80" />,
    },
    {
        href: "#",
        icon: <FaInstagram fontSize={25} className="hover:opacity-80" />,
    },
    {
        href: "#",
        icon: <FaXTwitter fontSize={25} className="hover:opacity-80" />,
    },
    {
        href: "https://github.com/AE-Hertz/",
        icon: <FaGithub fontSize={25} className="hover:opacity-80" />,
    },
    {
        href: "#",
        icon: <FaLinkedin fontSize={25} className="hover:opacity-80" />,
    },
];

export const CONTACT = {
    address: "Inside Github repo, at Floor.Vercel , USA",
    phoneNo: "+91 9090909090",
    email: "any@example.com",
};
