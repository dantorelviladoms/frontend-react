// src/components/Footer.jsx
import React, { useState } from "react";

export default function Footer() {
    const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías conectar con un endpoint de contacto
        setSent(true);
        setForm({ nombre: "", email: "", mensaje: "" });
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <footer className="bg-gray-950 border-t border-green-900/40">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Columna 1: Logo + descripción */}
                    <div className="flex flex-col gap-4">
                        <a href="/">
                            <img
                                src="/img/logoDTLPC3.png"
                                alt="DTL PREMIUM CAR"
                                className="h-20 w-auto object-contain"
                            />
                        </a>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Donde el lujo toma el volante. Vehículos de alta gama con garantía
                            y financiación flexible.
                        </p>
                    </div>

                    {/* Columna 2: Navegación */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-1">
                            Navegación
                        </h3>
                        {[
                            { label: "Inicio", href: "/" },
                            { label: "Catálogo", href: "/home" },
                            { label: "Nuestra Historia", href: "#" },
                            { label: "Financiamiento", href: "#" },
                            { label: "Contacto", href: "#contacto" },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Columna 3: Formulario de consulta */}
                    <div id="contacto" className="flex flex-col gap-3">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-1">
                            ¿Tienes alguna duda?
                        </h3>

                        {sent ? (
                            <div className="text-sm text-green-400 border border-green-700/50 rounded-lg px-4 py-3 bg-green-900/20">
                                Mensaje enviado. Te contactaremos pronto.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    name="nombre"
                                    value={form.nombre}
                                    onChange={handleChange}
                                    placeholder="Tu nombre"
                                    required
                                    className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:border-green-600 transition-colors"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Tu email"
                                    required
                                    className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:border-green-600 transition-colors"
                                />
                                <textarea
                                    name="mensaje"
                                    value={form.mensaje}
                                    onChange={handleChange}
                                    placeholder="Tu consulta..."
                                    required
                                    rows={3}
                                    className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:border-green-600 transition-colors resize-none"
                                />
                                <button
                                    type="submit"
                                    className="self-end px-5 py-2 text-sm font-medium text-white bg-green-700 hover:bg-green-600 rounded-md transition-colors"
                                >
                                    Enviar
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Línea inferior */}
                <div className="mt-10 border-t border-green-900/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-gray-600">
                        &copy; {new Date().getFullYear()} DTL Premium Car. Todos los derechos reservados.
                    </p>
                    <p className="text-xs text-gray-700">
                        Diseñado con precisión y pasión.
                    </p>
                </div>
            </div>
        </footer>
    );
}
