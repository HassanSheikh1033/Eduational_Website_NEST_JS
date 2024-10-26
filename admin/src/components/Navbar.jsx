import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import { FaBookReader } from "react-icons/fa";
import { SiLibreofficewriter } from "react-icons/si";
import { MdDashboard } from "react-icons/md";


export default function Navbar() {

  const [menu, setMenu] = useState([
    {
      id: 1,
      name: "Dashboard",
      icon: <MdDashboard />,
      isActive: false,
      path: '/dashboard'
    },
    {
      id: 2,
      name: "Add Courses",
      icon: < FaBookReader />,
      isActive: true,
      path: '/'
    },
    {
      id: 3,
      name: "Add Projects",
      icon: <SiLibreofficewriter />,
      isActive: false,
      path: '/addProjects'
    },
  ]);

  const [sideMenuActive, setSideMenuActive] = useState(false);


  // Function to handle active menu changes
  const changeActive = (id) => {
    setMenu(
      menu.map(item => ({
        ...item,
        isActive: item.id === id // Set active item
      }))
    );
  };

  return (
    <div className='w-full bg-white'>
      <div className='flex justify-between items-center p-5 shadow-custom'>
        
        {/* Hamburger menu icon */}
        <div
          onClick={() => setSideMenuActive(true)}
        >
          <IoMenu className='w-7 h-7 ml-9 cursor-pointer' />
        </div>

        {/* Sidebar menu */}
        <aside className={`min-h-screen z-500 py-8 px-6 w-[400px] bg-white adminMenu ${sideMenuActive ? 'menuActive' : 'menuInactive'}`}>
          
          {/* Header section with close icon */}
          <section className='flex items-center justify-between'>
            <div className="flex gap-4 items-center">
              {/* Replace empty src or remove the image if not used */}
              <img src={''} alt="Logo" className="w-[30px]" />
              <h1 className="text-2xl font-bold font-Oswald">HF Tech</h1>
            </div>
            <div
              className='cursor-pointer text-2xl'
              onClick={() => setSideMenuActive(false)}
            >
              <AiOutlineClose />
            </div>
          </section>

          {/* Menu items */}
          <div className='space-y-6 mt-10'>
            {menu.map(item => (
              <Link
                to={item.path}
                className={`flex items-center gap-3 text-xl px-4 py-3 rounded-lg cursor-pointer w-[200px] ${item.isActive ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                key={item.id}
                onClick={() => {
                  changeActive(item.id);
                  setSideMenuActive(false); // Close the menu after selecting an item
                }}
              >
                {item.icon}
                <p>{item.name}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
