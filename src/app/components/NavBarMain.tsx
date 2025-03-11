"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../types/section";
import { NavbarItems } from "./NavBarItems";
import { sections } from "../data/sections";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'



export const NavBarMain = () => {
  const [breadcrumb, setBreadcrumb] = useState<Section[]>([]);

  const currentSection = breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1] : null;

  return (
    <div className="p-4">
      <AnimatePresence mode="wait">
        {!currentSection && (
          <motion.ul
            key="main"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-5"
          >
            {sections.map((section) => (
              <li
                key={section.slug}
                onClick={() => setBreadcrumb([section])}
                className="cursor-pointer text-xl"
              >
                {section.name}
              </li>
            ))}
          </motion.ul>
        )}

        {currentSection && (
          <motion.div
            key={currentSection.slug}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-2">{currentSection.name}</h3>
            
            <NavbarItems currentSection={currentSection} setBreadcrumb={setBreadcrumb} breadcrumb={breadcrumb} />
            <button
              className="mt-3 cursor-pointer hover:text-gray-400 transition-normal duration-200 ease-in-out"
              onClick={() => setBreadcrumb(breadcrumb.slice(0, -1))}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="fa-fw" />
              Volver
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
