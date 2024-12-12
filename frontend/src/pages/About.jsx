import React from 'react';
import { 
  FaCode, FaCamera, FaBook, FaGamepad, 
  FaLaptopCode, FaGraduationCap, FaRocket, 
  FaReact, FaNodeJs, FaDatabase, FaServer, 
  FaPython, FaCloud, FaDocker, FaGit 
} from "react-icons/fa";
import { 
  SiTypescript, SiJavascript, SiMongodb, 
  SiPostgresql, SiGraphql, SiRedux, 
  SiTailwindcss, SiNextdotjs, SiNestjs, 
  SiExpress, SiWebpack, SiJest, SiKubernetes 
} from "react-icons/si";
import hero from "../assets/hero1.jpeg";

export default function About() {
  const about = {
    name: "Hassan Farooq",
    title: "Full Stack Developer",
    description:
      "Passionate technologist with a keen eye for creating innovative, efficient web solutions. My journey is driven by curiosity, continuous learning, and a commitment to solving complex problems through elegant code.",
    profileImage: hero,
    skills: [
      // Programming Languages
      { 
        category: "Programming Languages", 
        items: [
          { name: "JS", icon: <SiJavascript className="text-yellow-500" /> },
          { name: "TS", icon: <SiTypescript className="text-blue-600" /> },
          { name: "Python", icon: <FaPython className="text-blue-400" /> }
        ]
      },
      // Frontend Technologies
      { 
        category: "Frontend", 
        items: [
          { name: "React", icon: <FaReact className="text-blue-500" /> },
          { name: "Next.js", icon: <SiNextdotjs className="text-black" /> },
          { name: "Redux", icon: <SiRedux className="text-purple-600" /> },
          { name: "Tailwind", icon: <SiTailwindcss className="text-blue-400" /> }
        ]
      },
      // Backend Technologies
      { 
        category: "Backend", 
        items: [
          { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
          { name: "NestJS", icon: <SiNestjs className="text-red-600" /> },
          { name: "Express", icon: <SiExpress className="text-gray-700" /> }
        ]
      },
      // Databases
      { 
        category: "Databases", 
        items: [
          { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
          { name: "PostSQL", icon: <SiPostgresql className="text-blue-600" /> }
        ]
      },
      // DevOps & Cloud
      { 
        category: "DevOps & Cloud", 
        items: [
          { name: "Docker", icon: <FaDocker className="text-blue-600" /> },
          { name: "Git", icon: <FaGit className="text-orange-600" /> }
        ]
      },
     
    ],
    experience: [
      {
        role: "React JS Developer",
        company: "WebWave Creatives",
        years: "May 2022 - June 2023",
        description: "As a React JS Developer at WebWave Creatives, I built dynamic, high-performance web applications using React.js."
      },
      {
        role: "Backend Developer",
        company: "CodeCraft Solutions",
        years: "June 2023 - Dec 2023",
        description: "As a Backend Developer at CodeCraft Solutions, I designed and implemented robust server-side applications and APIs."
      },
      {
        role: "MERN Stack Developer",
        company: "WebWiz Creators",
        years: "Jan 2024 - Present",
        description: "As a MERN Stack Developer at WebWiz Creators, I built full-stack applications using MongoDB, Express.js, React.js, and Node.js.."
      }
    ],
    education: [
      {
        degree: "Bachelor of Computer Science",
        institution: "PMAS Arid Agriculture University",
        year: "2023 - 2027"
      }
    ],
    hobbies: [
      { name: "Photography", icon: <FaCamera /> },
      { name: "Reading", icon: <FaBook /> },
      { name: "Gaming", icon: <FaGamepad /> }
    ]
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center mb-16">
  <div className="col-span-1 flex justify-center">
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
      <div className="relative bg-white p-2 rounded-xl">
        <img 
          src={about.profileImage} 
          alt={about.name} 
          className="w-40 h-40 sm:w-64 sm:h-64 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  </div>
  <div className="col-span-1 md:col-span-2 text-center md:text-left">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      {about.name}
    </h1>
    <p className="text-xl sm:text-2xl text-blue-600 font-semibold mb-6">
      {about.title}
    </p>
    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
      {about.description}
    </p>
  </div>
</div>


        {/* Skills and Experience */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Skills Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-10 h-full">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center border-b-4 border-blue-500 pb-4">
              Technical Skills
            </h2>
            <div className="space-y-6">
              {about.skills.map((skillCategory, categoryIndex) => (
                <div key={categoryIndex} className="mb-4">
                  <h3 className="text-xl font-semibold text-blue-600 mb-4 border-b border-gray-200 pb-2">
                    {skillCategory.category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex} 
                        className="flex items-center gap-2 p-2 px-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition duration-300 hover:shadow-md group"
                      >
                        <div className="text-2xl text-blue-600 group-hover:text-blue-800 transition duration-300">
                          {skill.icon}
                        </div>
                        <span className="font-medium text-gray-800 text-sm sm:text-base group-hover:text-blue-800 transition duration-300">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-10 h-full">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center border-b-4 border-blue-500 pb-4">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {about.experience.map((job, index) => (
                <div 
                  key={index} 
                  className="pb-6 border-b border-gray-200 last:border-b-0"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.role}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {job.company}
                  </p>
                  <p className="text-gray-500 mb-2">
                    {job.years}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education and Hobbies */}
        <div className="grid md:grid-cols-2 pt-10 gap-10 mt-10">
          {/* Education Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-500 pb-3">
              Education
            </h2>
            {about.education.map((edu, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {edu.degree}
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  {edu.institution}
                </p>
                <p className="text-gray-500">
                  {edu.year}
                </p>
              </div>
            ))}
          </div>

          {/* Hobbies Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-500 pb-3">
              Hobbies
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {about.hobbies.map((hobby, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition duration-300"
                >
                  <div className="text-3xl text-blue-600">{hobby.icon}</div>
                  <span className="font-medium text-gray-800">{hobby.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
