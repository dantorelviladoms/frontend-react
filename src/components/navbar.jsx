// src/components/navbar.jsx
import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Características", href: "#" },
  { name: "Nuestra Historia", href: "#" },
  { name: "Financiamiento", href: "#" },
  { name: "Contacto", href: "#" },
];

export default function Navbar() {
  return (
    <header className="bg-transparent absolute w-full z-20">
      <nav
        className="flex items-center justify-between h-16 px-4 lg:px-6" // ← ¡padding solo en los lados, y más suave!
        aria-label="Global"
      >
        {/* Logo: pegado a la izquierda */}
        <a href="/" className="flex-shrink-0">
          <img
            src="/img/logoDTLPC3.png"
            alt="DTL PREMIUM CAR"
            className="h-30 w-auto object-contain" // ← h-30 es demasiado (30*0.25rem = 7.5rem = 120px). Mejor h-10 (40px) o h-12 si quieres más grande.
          />
        </a>

        {/* Menú centrado */}
        <div className="hidden lg:flex flex-1 justify-center gap-x-10">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-white hover:text-green-500 transition"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Iniciar sesión: pegado a la derecha */}
        <div className="hidden lg:flex flex-shrink-0">
          <a
            href="/login"
            className="text-sm font-semibold text-white flex items-center gap-1 hover:text-green-300"
          >
            Iniciar sesión
            <UserIcon className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}