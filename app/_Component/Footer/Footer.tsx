"use client";

import React from 'react';
import { Github, Linkedin, Youtube, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        navigation: [
            { name: 'Home', href: '#' },
            { name: 'About', href: '#about' },
            { name: 'Projects', href: '#projects' },
            { name: 'Contact', href: '#contact' }
        ],
        services: [
            { name: 'Web Development', href: '#' },
            { name: 'UI/UX Design', href: '#' },
            { name: 'Mobile Apps', href: '#' },
            { name: 'Consulting', href: '#' }
        ],
        social: [
            { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/msfofficial/' },
            { name: 'GitHub', icon: Github, href: 'https://github.com/MISFOfficial' },
            { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/' },
            { name: 'Email', icon: Mail, href: 'mailto:muksitul44@gmail.com' }
        ]

    };

    return (
        <footer className="bg-[#0a0a0a] border-t border-white/5">
            <div className="ratio py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-black text-white mb-4">
                            Muksitul <span className="primary-text">Islam</span>
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Full-stack developer and designer crafting beautiful digital experiences.
                            Let's build something amazing together.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {footerLinks.social.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#20255e] flex items-center justify-center transition-all group"
                                    aria-label={social.name}
                                >

                                    <social.icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-3">
                            {footerLinks.navigation.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} Muksitul Islam. All rights reserved.
                        </p>

                        <p className="text-gray-500 text-sm flex items-center gap-2">
                            Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Bangladesh
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}