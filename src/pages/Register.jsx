// src/pages/Register.jsx
import React from "react";

export default function Register() {
  return (
    // Contenedor principal con fondo de imagen (igual que en Login)
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/img/bglogin.png)' }}
    >
      {/* Overlay negro más oscuro */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Formulario centrado, con mismo estilo que login */}
      <div className="relative w-full max-w-md p-8 space-y-6 bg-gray-900 backdrop-blur-sm rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-white">Crear cuenta</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700">Nombre completo</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Correo electrónico</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-500"
          >
            Registrarse
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}