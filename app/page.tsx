"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });
import type { City } from "./MapComponent";

const categories = [
  "Catering",
  "Charcuterie",
  "Coffee",
  "Customized",
  "Decor",
  "Desserts",
  "Flowers",
  "Ribbon Eternal Bouquets",
  "Other",
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([...categories]);
  const allSelected = selected.length === categories.length;
  const [selectedMarker, setSelectedMarker] = useState<City | null>(null);
  

  const handleAllToggle = () => {
    setSelected(allSelected ? [] : [...categories]);
  };

  const handleCategoryToggle = (cat: string) => {
    setSelected(
      selected.includes(cat)
        ? selected.filter((c) => c !== cat)
        : [...selected, cat]
    );
  };

  return (
    <main className="[font-family:var(--font-geist-sans),sans-serif] min-h-screen bg-pink-100 flex flex-col relative">
      {/* Fixed Hamburger Icon (always on top, at top left) */}
      <button
        className="fixed top-4 left-4 flex flex-col h-10 w-10 justify-center items-center focus:outline-none z-1002"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        style={{ cursor: "pointer" }}
      >
        <span className={`absolute h-1 w-8 rounded bg-pink-500 transition-all duration-300 ${open ? "rotate-45 top-4" : "top-2"}`}></span>
        <span className={`absolute h-1 w-8 rounded bg-pink-500 transition-all duration-300 ${open ? "opacity-0 top-4" : "top-4"}`}></span>
        <span className={`absolute h-1 w-8 rounded bg-pink-500 transition-all duration-300 ${open ? "-rotate-45 top-4" : "top-6"}`}></span>
      </button>

      {/* Sidebar Overlay Menu */}
      
      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/10 z-1001"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{
                type: "tween",
                duration: 0.1,
                ease: "easeOut", // can also be a custom array, e.g. [0.42, 0, 0.58, 1]
              }}
              className="fixed top-0 left-0 h-full w-64 bg-white/90 shadow-2xl z-1001 border-r-2 border-pink-200 pt-18 flex flex-col transition-transform rounded-r-xl"
            >
              {/* menu contents as before */}
              <ul className="space-y-2 px-6">
              <li>
                <button
                  className={`w-full text-left py-2 px-3 rounded font-semibold transition 
                    ${allSelected ? "bg-pink-600 text-white" : "text-pink-600 hover:bg-pink-100"}`}
                  onClick={handleAllToggle}
                >
                  All
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryToggle(cat)}
                    className={`w-full text-left py-2 px-3 rounded transition 
                      ${selected.includes(cat) ? "bg-pink-400 text-white" : "text-pink-600 hover:bg-pink-100"}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMarker && (
          <>
            {/* Overlay: clicking it closes the menu */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-0 z-1001"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMarker(null)}
            />

            {/* Right menu itself */}
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-1002 shadow-2xl border-l-2 border-pink-200 px-6 pt-16 flex flex-col rounded-l-xl"
              onClick={e => e.stopPropagation()} // Prevent clicks inside the menu from closing it
            >
              <button className="absolute top-4 right-4 text-pink-500 font-bold text-2xl"
                onClick={() => setSelectedMarker(null)}>×</button>
              <h2 className="font-bold text-pink-500 text-2xl mb-3">{selectedMarker.name}</h2>
              <div className="mb-2 text-pink-800">Category: <span className="font-semibold">{selectedMarker.category}</span></div>
              <br></br>
              <h2 className="">Instagram:</h2>
              <a href={selectedMarker.link1} className="text-pink-800"> {selectedMarker.link1}
              </a>
              <br></br>
              <h2 className="">TikTok:</h2>
              <a href={selectedMarker.link2} className="text-pink-800"> {selectedMarker.link2}</a>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* Centered Title */}
      <div className="flex flex-col items-center pt-16 pl-8 pr-8">
        <h1 className="text-4xl font-bold text-pink-500 tracking-tight antialiased text-center">
          Women Owned Business Map
        </h1>
      </div>

      <div className="flex justify-center flex-grow max-h-full max-w-full m-8">
        <MapComponent 
          selectedCategories={selected}
          onMarkerSelect={setSelectedMarker}
        />
      </div>
    </main>
  );
}
