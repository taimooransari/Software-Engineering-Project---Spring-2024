"use client";

import React from 'react';

const Footer = () => (
  <footer className="bg-black text-white py-4 fixed inset-x-0 bottom-0 mt-auto">
    <div className="container mx-auto flex justify-between items-center">
      <p className="text-sm">© 2023 My Company. All rights reserved.</p>
      <nav className="flex space-x-4">
        <a href="#" className="text-sm hover:underline">Privacy Policy</a>
        <a href="#" className="text-sm hover:underline">Terms of Service</a>
      </nav>
    </div>
  </footer>
);

export default Footer;
