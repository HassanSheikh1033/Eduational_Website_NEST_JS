import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";


import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Phase 1",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, dolor. Sapiente maiores ducimus quod?",
  },
  {
    icon: <Fingerprint />,
    text: "Phase 2",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, dolor. Sapiente maiores ducimus quod?",
  },
  {
    icon: <ShieldHalf />,
    text: "Phase 3",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, dolor. Sapiente maiores ducimus quod?",
  },
  {
    icon: <BatteryCharging />,
    text: "Phase 4",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, dolor. Sapiente maiores ducimus quod?",
  },
  {
    icon: <PlugZap />,
    text: "Phase 5",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, dolor. Sapiente maiores ducimus quod?",
  },
  {
    icon: <GlobeLock />,
    text: "Phase 6",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, dolor. Sapiente maiores ducimus quod?",
  },
];

export const checklistItems = [
  {
    title: "Web Development",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "App Development",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Desktop Applications",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];



export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
