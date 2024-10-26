import { platformLinks, communityLinks } from "../constants";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Optional: Add icons

const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700 bg-white text-black-300">
      <div className="max-w-screen-xl mx-auto px-[70px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-black transition duration-300 ease-in-out"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-black transition duration-300 ease-in-out"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-start space-x-4">
              <a href="#" className=" transition duration-300 ease-in-out">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="transition duration-300 ease-in-out">
                <FaTwitter size={24} />
              </a>
              <a href="#" className=" transition duration-300 ease-in-out">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className=" transition duration-300 ease-in-out">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
