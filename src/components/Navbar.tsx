import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isScrolled?: boolean;
  cartCount?: number;
  onOpenCart?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled = false, cartCount = 0, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Our Cakes', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#footer' },
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 flex justify-center w-full px-3 sm:px-4 ${isScrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-6'}`}>
      <nav className={`transition-all duration-300 rounded-full pl-4 pr-2 py-2 w-full max-w-[1000px] relative flex items-center justify-between ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg border border-white/20' 
          : 'bg-white shadow-sm border border-neutral-200'
      }`}>
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <span className="text-2xl sm:text-3xl">🎂</span>
          <span className={`font-bold hidden sm:block text-lg whitespace-nowrap transition-colors ${isScrolled ? 'text-[#ef4d23]' : 'text-neutral-900'}`} style={{ letterSpacing: '-0.02em' }}>Cake De Lite</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-5 lg:gap-7 items-center text-[14px] lg:text-[15px] font-medium mx-auto">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-[#ef4d23] transition-colors flex items-center gap-1 font-bold text-neutral-900 whitespace-nowrap">
              {link.name === 'Home' && <span className="w-1.5 h-1.5 bg-[#ef4d23] rounded-full" />}
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Cluster */}
        <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-neutral-600 hover:text-[#ef4d23] transition-colors group"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ef4d23] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                {cartCount}
              </span>
            )}
          </button>

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
              className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-neutral-200 p-5 z-50 flex flex-col gap-4 md:hidden"
            >
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-neutral-700 font-bold text-[16px] flex items-center justify-between hover:text-[#ef4d23] transition-colors">
                  {link.name}
                </a>
              ))}
              <hr className="border-neutral-100 my-1" />
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { onOpenCart?.(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 bg-neutral-900 text-white rounded-full py-3 font-bold shadow-md"
                >
                  <ShoppingCart className="w-5 h-5" /> View Cart ({cartCount})
                </button>
                <a href="https://wa.me/917204209232" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-3 font-bold shadow-md">
                  Order via WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
