"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="sticky top-0 z-20 h-16 w-full flex items-center bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between w-full mx-auto px-4 py-3">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Image
                            src="/icons/Connect.png"
                            alt="StreamWork"
                            width={150}
                            height={32}
                            style={{ width: "auto", height: "auto" }}
                            priority
                        />
                    </div>

                    {/* Botones solo en móvil */}
                    <button
                        className="md:hidden flex items-center justify-center w-9 h-9 rounded-md hover:bg-slate-100 transition-colors"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        <img
                            src={isOpen ? "/icons/Cancel.png" : "/icons/menu.png"}
                            alt={isOpen ? "Cerrar" : "Menú"}
                            width={24}
                            height={24}
                            className="transition-opacity duration-200"
                        />
                    </button>

                </div>
            </nav>

            {/* Menú desplegable — solo en móvil */}
            <div
                className={`md:hidden fixed top-16 left-0 w-full bg-white border-b border-slate-100 shadow-lg z-10 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
            >
                <div className="flex flex-col px-4 py-2">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.route}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 py-3 px-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100 last:border-none"
                        >
                            <img src={link.imgUrl} alt="" width={20} height={20} />
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;
