// src/pages/Login.jsx
import React from "react";

export default function Login() {
  return (
    // Contenedor principal con fondo de imagen
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/img/bglogin.png)' }} // ← ¡cambia esta ruta!
    >
      {/* Overlay opcional, pa que el formulario se lea bien*/}
      <div className="absolute inset-0 bg-black/30 bg-opacity-400"></div>

      {/* Formulario centrado */}
      <div className="relative w-full max-w-md p-8 space-y-6 bg-gray-900 backdrop-blur-sm rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-white">Iniciar sesión</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700">Correo electrónico</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-500"
          >
            Entrar
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-green-600 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}