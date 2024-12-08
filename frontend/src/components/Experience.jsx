import { CheckCircle2 } from "lucide-react";
import { checklistItems } from "../constants";
import BooksCanvas from '../canvas/Book';
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl mb-7 lg:text-6xl text-center mt-6 tracking-wide">
     
        <span className="bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text">
      
        </span>
      </h2>
      <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
          My Tech{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Experience.
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Where I Honed My Skills and Knowledge
          </p>
        </motion.div>
      <div className="flex flex-wrap justify-center">
        <div className="p-2 w-full lg:w-1/2">
          <BooksCanvas />
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-12">
              <div className="text-blue-400 mx-6 bg-neutral-700 h-10 w-10 p-2 justify-center items-center rounded-full">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
