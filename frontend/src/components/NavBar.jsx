import React from 'react';
import { Menu } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="px-4 sm:px-6 py-4 flex justify-between items-center ">
      {/* Logo */}
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold text-white font-inter">
          10
          <span className="text-white ml-1 italic font-light font-playfair">questions</span>
        </h1>
      </div>

      {/* Desktop Links */}
      <div className="hidden sm:flex gap-6">
        {['About', 'Contact'].map((val, i) => (
          <a
            key={i}
            href={`/${val}`}
            className="text-sm sm:text-base font-inter text-zinc-400 font-medium tracking-tight hover:text-white transition-colors"
          >
            {val}
          </a>
        ))}
      </div>

      {/* Mobile Menu Icon (optional functionality) */}
      <div className="sm:hidden">
        <Menu className="text-white w-6 h-6" />
        {/* You can implement dropdown/toggle menu here if desired */}
      </div>
    </nav>
  );
};

export default NavBar;
