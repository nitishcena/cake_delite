import React, { useState } from 'react';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Our Cakes', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#footer' },
  ];

  return (
    <div className="flex justify-center pt-4 sm:pt-6 px-3 sm:px-4 relative z-50 w-full">
      <nav className="bg-white rounded-full shadow-sm border border-neutral-200 pl-4 pr-2 py-2 w-full max-w-[900px] relative flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <span className="text-2xl sm:text-3xl">🎂</span>
          <span className="font-bold text-neutral-900 hidden sm:block text-lg whitespace-nowrap" style={{ letterSpacing: '-0.02em' }}>Cake De Lite</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-5 lg:gap-7 items-center text-[14px] lg:text-[15px] font-medium text-neutral-600 mx-auto">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-[#ef4d23] transition-colors flex items-center gap-1 font-bold text-neutral-900 whitespace-nowrap">
              {link.name === 'Home' && <span className="w-1.5 h-1.5 bg-[#ef4d23] rounded-full" />}
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Cluster */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a 
            href="https://wa.me/917204209232" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex bg-[#25D366] text-white rounded-full px-5 py-2 text-[14px] font-bold items-center gap-2 hover:scale-105 transition-all shadow-md whitespace-nowrap"
          >
            Order Now
          </a>
          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-neutral-600 hover:text-[#ef4d23] transition-colors focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-neutral-200 p-5 z-50 flex flex-col gap-4 md:hidden"
            >
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-neutral-700 font-bold text-[16px] flex items-center justify-between hover:text-[#ef4d23] transition-colors">
                  {link.name}
                </a>
              ))}
              <hr className="border-neutral-100 my-1" />
              <a href="https://wa.me/917204209232" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-3 font-bold shadow-md">
                Order Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
