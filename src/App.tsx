import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Preloader ─── */
const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(t); setTimeout(onComplete, 400); return 100; } return p + 2; });
    }, 40);
    return () => clearInterval(t);
  }, [onComplete]);

  return (
    <motion.div exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 30%, #f48fb1 60%, #f06292 100%)' }}>
      {['🎂','🧁','🍰','🎀','🍓','🍫','🎂','🧁','🍰','🎀'].map((e, i) => (
        <motion.div key={i} className="absolute text-3xl sm:text-5xl opacity-20 select-none pointer-events-none"
          initial={{ x: Math.random() * 1000, y: Math.random() * 800, rotate: Math.random() * 360, scale: 0.5 + Math.random() * 0.8 }}
          animate={{ y: [0, -30, 30, -20, 0], rotate: [0, 10, -10, 5, 0] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, repeatType: 'mirror', delay: i * 0.2 }}>{e}</motion.div>
      ))}
      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.8, type: 'spring' }} className="text-7xl sm:text-8xl mb-6">🎂</motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="text-3xl sm:text-5xl font-bold text-white mb-2 tracking-tight text-center" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>Cake De Lite</motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="text-white/70 text-sm font-medium mb-10 tracking-widest uppercase">Baking Happiness</motion.p>
      <div className="w-48 sm:w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #fff, #fce4ec)' }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
      </div>
      <span className="mt-3 text-white/50 text-xs font-bold tracking-widest">{progress}%</span>
    </motion.div>
  );
};

/* ─── Cake Divider ─── */
const CakeDivider = () => (
  <div className="relative py-20 flex items-center justify-center overflow-hidden w-full max-w-7xl mx-auto">
    {/* Wavy Background Lines */}
    <div className="absolute inset-0 flex items-center justify-center opacity-30">
      <svg className="w-full h-24 stroke-[#ef4d23]" fill="none" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <motion.path 
          d="M0,50 Q125,0 250,50 T500,50 T750,50 T1000,50" 
          strokeWidth="2"
          strokeDasharray="10 10"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
        <motion.path 
          d="M0,50 Q125,100 250,50 T500,50 T750,50 T1000,50" 
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
          viewport={{ once: true }}
        />
      </svg>
    </div>

    {/* Center Floating Cake */}
    <motion.div 
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative z-10 bg-white rounded-full p-5 shadow-[0_0_50px_rgba(239,77,35,0.15)] border border-[#ef4d23]/20"
    >
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-5xl sm:text-6xl"
      >
        🍰
      </motion.div>

      {/* Orbiting Sparkles */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full rounded-full"
      >
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#ef4d23] text-xl drop-shadow-md">✨</span>
      </motion.div>
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full rounded-full"
      >
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[#ef4d23] text-lg drop-shadow-md">✨</span>
      </motion.div>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
        className="absolute inset-0 w-full h-full rounded-full"
      >
        <span className="absolute top-1/2 -right-3 -translate-y-1/2 text-[#ef4d23] text-sm drop-shadow-md">✨</span>
      </motion.div>
    </motion.div>
  </div>
);

/* ─── Gallery Card ─── */
const GalleryCard: React.FC<{ src: string; label: string; i: number; onSelect: (img: { src: string; label: string }) => void }> = ({ src, label, i, onSelect }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-40px" }}
      onClick={() => onSelect({ src, label })}
      className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative border-2 border-white/80 shadow-md hover:shadow-2xl transition-shadow duration-500">
      <img src={src} alt={label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 sm:p-5 z-20">
        <span className="text-white font-bold text-sm sm:text-base mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">{label}</span>
        <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75">Click to view details</p>
      </div>
    </motion.div>
  );
};

/* ─── Image Modal ─── */
const ImageModal: React.FC<{ 
  image: { src: string; label: string } | null; 
  onClose: () => void; 
  onAddToCart: (item: string) => void;
  whatsapp: string;
}> = ({ image, onClose, onAddToCart, whatsapp }) => {
  if (!image) return null;

  const fullImageUrl = window.location.origin + image.src;
  const whatsappMsg = `Hi! I'd like to order: ${image.label}. Image: ${fullImageUrl}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[210] p-2"
      >
        <X className="w-8 h-8" />
      </button>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-neutral-900 rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-[0_0_100px_rgba(239,77,35,0.2)] border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Left: Image */}
        <div className="w-full md:w-3/5 aspect-square md:aspect-auto h-auto md:h-[600px] overflow-hidden">
          <img src={image.src} alt={image.label} className="w-full h-full object-cover" />
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-center bg-[#111]">
          <span className="text-[#ef4d23] text-xs font-bold tracking-[0.2em] uppercase mb-3">Handcrafted Perfection</span>
          <h2 className="text-3xl font-bold text-white mb-6 leading-tight">{image.label}</h2>
          
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs">✨</span>
              Customizable themes & flavors
            </div>
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs">🚚</span>
              Freshly baked & delivered
            </div>
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs">❤️</span>
              Made with premium ingredients
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => {
                onAddToCart(image.label);
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#ef4d23] text-white rounded-full py-4 font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
            >
              🛒 Add to Cart
            </button>
            <a 
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMsg)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-4 font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
            >
              Order via WhatsApp
            </a>
          </div>
          
          <p className="mt-6 text-center text-white/30 text-[10px] font-medium tracking-wider">SECURE PAYMENTS & FAST DELIVERY</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── App ─── */
function App() {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; label: string } | null>(null);

  const wa = "917204209232";
  const ig = "https://www.instagram.com/cake_de_literaichur?igsh=MTkwZTR1dHA4aGtrZw==";
  const maps = "https://maps.app.goo.gl/8sDNMBxQ3TZX74XS9";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item: string) => {
    setCart(prev => [...prev, item]);
    setShowNotification(item);
    setTimeout(() => setShowNotification(null), 3000);
  };

  const gallery = [
    { src: "/assets/cake6.jpeg", label: "Blue Teddy Bear Cake" },
    { src: "/assets/cake13.jpeg", label: "Birthday King Crown" },
    { src: "/assets/cake1.jpeg", label: "Purple Gold Wedding Cake" },
    { src: "/assets/cake3.jpeg", label: "Chocolate Oreo Drip Cake" },
    { src: "/assets/cake9.jpeg", label: "Love Anniversary Cake" },
    { src: "/assets/cake11.jpeg", label: "Mickey & Minnie Cake" },
    { src: "/assets/cake7.jpeg", label: "25th Anniversary Cake" },
    { src: "/assets/cake10.jpeg", label: "Chocolate Tower Cake" },
    { src: "/assets/cake12.jpeg", label: "Ganesh Festival Cake" },
    { src: "/assets/cake4.jpeg", label: "Cricket Theme Cake" },
    { src: "/assets/cake5.jpeg", label: "Mother's Day Special" },
    { src: "/assets/cake8.jpeg", label: "Best Mom Ever Cake" },
  ];

  return (
    <>
      <AnimatePresence>{loading && <Preloader onComplete={() => setLoading(false)} />}</AnimatePresence>
      
      <Navbar isScrolled={isScrolled} />

      {/* Cart Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed top-24 right-5 z-[101] bg-white border border-[#ef4d23] rounded-xl p-4 shadow-2xl flex items-center gap-3"
          >
            <div className="bg-[#ef4d23]/10 p-2 rounded-lg text-xl">🍰</div>
            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Added to Cart</p>
              <p className="text-sm font-bold text-neutral-900">{showNotification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Detail Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal 
            image={selectedImage} 
            onClose={() => setSelectedImage(null)} 
            onAddToCart={addToCart}
            whatsapp={wa}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen w-full bg-[#ededed] p-3 sm:p-4 font-['Inter'] overflow-x-hidden pt-20">
        {/* ═══ HERO ═══ */}
        <div className="relative w-full min-h-[calc(100svh-40px)] sm:min-h-[calc(100vh-32px)] bg-[#d9d9d9] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden mb-8">
          <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0">
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40 z-[1]" />

          <div className="relative z-10 flex flex-col min-h-[calc(100svh-40px)] sm:min-h-[calc(100vh-32px)]">
            <main className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-12 text-center">
              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 2.5 }}
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-5 py-2 border border-white/20">
                <div className="w-2 h-2 bg-[#ef4d23] rounded-full animate-pulse" />
                <span className="text-[12px] sm:text-[13px] font-bold text-white tracking-wider uppercase">Artisanal Bakery • Since 2020</span>
              </motion.div>

              {/* Business Name */}
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 2.7 }}
                className="mt-5 sm:mt-8 leading-[0.9]"
                style={{ fontSize: 'clamp(52px, 14vw, 140px)', fontWeight: 800, letterSpacing: '-0.05em', color: '#fff', textShadow: '0 4px 60px rgba(0,0,0,0.4)' }}>
                Cake De{' '}<span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }} className="text-[#ef4d23]">Lite</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.9 }}
                className="mt-4 sm:mt-6 text-white/80 font-medium max-w-xl mx-auto px-2"
                style={{ fontSize: 'clamp(14px, 3vw, 19px)', lineHeight: 1.6 }}>
                Delight In Every Bite — Premium handcrafted cakes for weddings, birthdays & every sweet celebration.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 3.1 }}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-lg">
                <a href={`https://wa.me/${wa}?text=Hi! I'd like to place an order.`} target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full px-7 py-3.5 text-[14px] sm:text-[15px] font-bold hover:scale-105 transition-transform shadow-xl">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Order via WhatsApp
                </a>
                <a href="tel:+917204209232"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-md text-white rounded-full px-7 py-3.5 text-[14px] sm:text-[15px] font-bold border border-white/20 hover:bg-white/25 transition-all shadow-lg">
                  <Phone className="w-5 h-5" /> Order via Call
                </a>
              </motion.div>

              {/* Quick Links */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 3.3 }}
                className="mt-10 flex flex-wrap justify-center gap-3">
                <a href={ig} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white rounded-full px-5 py-2.5 text-[13px] sm:text-[14px] font-bold border border-white/15 hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:border-transparent transition-all duration-300 hover:scale-105">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  Instagram
                </a>
                <a href="#gallery" 
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white rounded-full px-5 py-2.5 text-[13px] sm:text-[14px] font-bold border border-white/15 hover:bg-[#ef4d23] hover:border-[#ef4d23] transition-all duration-300 hover:scale-105">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  Gallery
                </a>
                <a href={maps} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white rounded-full px-5 py-2.5 text-[13px] sm:text-[14px] font-bold border border-white/15 hover:bg-[#4285F4] hover:border-[#4285F4] transition-all duration-300 hover:scale-105">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Find Us
                </a>
              </motion.div>
            </main>
          </div>
        </div>

        <CakeDivider />

        {/* ═══ SERVICES ═══ */}
        <section id="services" className="py-16 px-4 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block text-[#ef4d23] text-sm font-bold tracking-widest uppercase mb-3">What We Do</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-neutral-900 mb-4">Our Services</h2>
            <div className="w-16 h-1 bg-[#ef4d23] mx-auto rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Custom Wedding Cakes", desc: "Elegant multi-tier centerpieces crafted for your special day.", icon: "💍" },
              { title: "Birthday Celebrations", desc: "Fun themed cakes for kids & adults — from cartoon to luxury designs.", icon: "🎂" },
              { title: "Corporate & Festivals", desc: "Professional desserts for events, festivals & corporate gatherings.", icon: "🎊" }
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.15 }} viewport={{ once: true }}
                whileHover={{ y: -8 }} className="bg-white p-7 sm:p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ef4d23]/10 to-[#ef4d23]/5 rounded-xl flex items-center justify-center mb-5 text-2xl">{s.icon}</div>
                <h3 className="text-lg font-bold mb-3 text-neutral-900">{s.title}</h3>
                <p className="text-neutral-500 leading-relaxed text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <CakeDivider />

        {/* ═══ GALLERY ═══ */}
        <section id="gallery" className="py-20 bg-white rounded-3xl mx-2 sm:mx-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-5">
              <div>
                <span className="inline-block text-[#ef4d23] text-sm font-bold tracking-widest uppercase mb-3">Portfolio</span>
                <h2 className="text-3xl sm:text-5xl font-bold text-neutral-900 mb-3" style={{ letterSpacing: '-0.03em' }}>
                  Sweet <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }} className="text-[#ef4d23]">Gallery</span>
                </h2>
                <p className="text-neutral-400 max-w-sm text-sm sm:text-base">Every cake tells a story. Explore our handcrafted masterpieces.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="bg-[#ef4d23]/5 border border-[#ef4d23]/10 rounded-full px-5 py-3 flex items-center gap-3">
                  <span className="text-xl">🛒</span>
                  <div>
                    <p className="text-[10px] font-bold text-[#ef4d23] uppercase tracking-wider leading-none">Your Cart</p>
                    <p className="text-sm font-bold text-neutral-900 leading-none mt-1">{cart.length} Items</p>
                  </div>
                </div>
                <a href={ig} target="_blank" rel="noopener noreferrer"
                  className="bg-[#0b0f1a] text-white rounded-full px-6 py-3 text-sm font-bold hover:bg-[#ef4d23] transition-all duration-300 hover:scale-105 shadow-lg flex-shrink-0">
                  View All on Instagram →
                </a>
              </div>
            </motion.div>

            {/* Uniform Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {gallery.map((img, i) => (
                <GalleryCard key={i} src={img.src} label={img.label} i={i} onSelect={setSelectedImage} />
              ))}
            </div>

            {/* CTA below gallery */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hi! I'd like to order the items in my cart: ${cart.join(", ") || "Custom cake"}`)}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-7 py-3.5 font-bold text-sm hover:scale-105 transition-transform shadow-lg">
                🛒 Order via WhatsApp
              </a>
              <a href="tel:+917204209232"
                className="inline-flex items-center gap-2 bg-[#0b0f1a] text-white rounded-full px-7 py-3.5 font-bold text-sm hover:bg-[#ef4d23] transition-all shadow-lg">
                <Phone className="w-4 h-4" /> Order via Call
              </a>
            </motion.div>
          </div>
        </section>

        <CakeDivider />

        {/* ═══ TESTIMONIALS ═══ */}
        <section id="testimonials" className="py-16 px-4 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block text-[#ef4d23] text-sm font-bold tracking-widest uppercase mb-3">Happy Clients</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-neutral-900 mb-4">Testimonials</h2>
            <div className="w-16 h-1 bg-[#ef4d23] mx-auto rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: "Priya S.", text: "The wedding cake was absolutely breathtaking! Everyone was amazed by the design and it tasted even better than it looked.", stars: "⭐⭐⭐⭐⭐" },
              { name: "Rahul M.", text: "Ordered a birthday cake for my daughter. The attention to detail on the Mickey Mouse theme was perfect. Highly recommended!", stars: "⭐⭐⭐⭐⭐" },
              { name: "Anjali K.", text: "Best artisanal cakes in town. The chocolate truffle melts in your mouth. Always my go-to bakery for every family celebration.", stars: "⭐⭐⭐⭐⭐" }
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.15 }} viewport={{ once: true }}
                whileHover={{ y: -8 }} className="bg-white p-7 sm:p-8 rounded-3xl shadow-sm border border-neutral-100 hover:shadow-xl transition-all duration-300">
                <div className="text-2xl mb-4">{t.stars}</div>
                <p className="text-neutral-600 leading-relaxed text-sm mb-6 italic">"{t.text}"</p>
                <div className="font-bold text-neutral-900">— {t.name}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <CakeDivider />

        {/* ═══ FOOTER ═══ */}
        <footer id="footer" className="bg-[#0b0f1a] text-white pt-16 pb-8 px-4 mt-12 rounded-t-3xl">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">🎂</span>
                <span className="text-xl font-bold tracking-tight">Cake De Lite</span>
              </div>
              <p className="text-neutral-400 max-w-sm mb-6 text-sm">Premium artisanal cakes handcrafted for your most precious celebrations. Delight in every bite.</p>
              <div className="flex gap-3">
                <a href={ig} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] transition-colors text-sm font-bold">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#25D366] transition-colors text-sm font-bold">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                <a href="https://www.facebook.com/share/1H3mU5cJFa/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#1877F2] transition-colors text-sm font-bold">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold mb-5">Quick Links</h4>
              <ul className="space-y-3 text-neutral-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Our Cakes</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#footer" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-bold mb-5">Contact Us</h4>
              <ul className="space-y-4 text-neutral-400 text-sm">
                <li>
                  <a href="tel:+917204209232" className="hover:text-white transition-colors underline flex items-center gap-2 w-fit">
                    <Phone className="w-4 h-4" /> +91 72042 09232
                  </a>
                </li>
                <li>
                  <a href="tel:+918861664166" className="hover:text-white transition-colors underline flex items-center gap-2 w-fit">
                    <Phone className="w-4 h-4" /> +91 88616 64166
                  </a>
                </li>
                <li>
                  <a href="mailto:devjain@yahoo.com" className="hover:text-white transition-colors underline flex items-center gap-2 w-fit">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    devjain@yahoo.com
                  </a>
                </li>
                <li>
                  <a href={maps} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline flex items-center gap-2 w-fit">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> 
                    Visit Our Shop
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-neutral-500 text-xs">
            <p>© 2026 Cake De Lite. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

        <CakeDivider />

        {/* ═══ TESTIMONIALS ═══ */}
        <section id="testimonials" className="py-16 px-4 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block text-[#ef4d23] text-sm font-bold tracking-widest uppercase mb-3">Happy Clients</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-neutral-900 mb-4">Testimonials</h2>
            <div className="w-16 h-1 bg-[#ef4d23] mx-auto rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: "Priya S.", text: "The wedding cake was absolutely breathtaking! Everyone was amazed by the design and it tasted even better than it looked.", stars: "⭐⭐⭐⭐⭐" },
              { name: "Rahul M.", text: "Ordered a birthday cake for my daughter. The attention to detail on the Mickey Mouse theme was perfect. Highly recommended!", stars: "⭐⭐⭐⭐⭐" },
              { name: "Anjali K.", text: "Best artisanal cakes in town. The chocolate truffle melts in your mouth. Always my go-to bakery for every family celebration.", stars: "⭐⭐⭐⭐⭐" }
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.15 }} viewport={{ once: true }}
                whileHover={{ y: -8 }} className="bg-white p-7 sm:p-8 rounded-3xl shadow-sm border border-neutral-100 hover:shadow-xl transition-all duration-300">
                <div className="text-2xl mb-4">{t.stars}</div>
                <p className="text-neutral-600 leading-relaxed text-sm mb-6 italic">"{t.text}"</p>
                <div className="font-bold text-neutral-900">— {t.name}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <CakeDivider />

        {/* ═══ FOOTER ═══ */}
        <footer id="footer" className="bg-[#0b0f1a] text-white pt-16 pb-8 px-4 mt-12 rounded-t-3xl">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">🎂</span>
                <span className="text-xl font-bold tracking-tight">Cake De Lite</span>
              </div>
              <p className="text-neutral-400 max-w-sm mb-6 text-sm">Premium artisanal cakes handcrafted for your most precious celebrations. Delight in every bite.</p>
              <div className="flex gap-3">
                <a href={ig} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] transition-colors text-sm font-bold">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#25D366] transition-colors text-sm font-bold">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                <a href="https://www.facebook.com/share/1H3mU5cJFa/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#1877F2] transition-colors text-sm font-bold">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold mb-5">Quick Links</h4>
              <ul className="space-y-3 text-neutral-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Our Cakes</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#footer" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-bold mb-5">Contact Us</h4>
              <ul className="space-y-4 text-neutral-400 text-sm">
                <li>
                  <a href="tel:+917204209232" className="hover:text-white transition-colors underline flex items-center gap-2 w-fit">
                    <Phone className="w-4 h-4" /> +91 72042 09232
                  </a>
                </li>
                <li>
                  <a href="tel:+918861664166" className="hover:text-white transition-colors underline flex items-center gap-2 w-fit">
                    <Phone className="w-4 h-4" /> +91 88616 64166
                  </a>
                </li>
                <li>
                  <a href="mailto:devjain@yahoo.com" className="hover:text-white transition-colors underline flex items-center gap-2 w-fit">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    devjain@yahoo.com
                  </a>
                </li>
                <li>
                  <a href={maps} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline flex items-center gap-2 w-fit">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> 
                    Visit Our Shop
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-neutral-500 text-xs">
            <p>© 2026 Cake De Lite. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
