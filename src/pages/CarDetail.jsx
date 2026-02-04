// src/pages/CarDetail.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// ✅ Nada de imports de imágenes → todo desde public/img/

const products = [
  {
    id: 1,
    name: "Mercedes-Benz CLS63S AMG",
    imageFiles: ["amg1.jpg", "amg1-2.jpg", "amg1-3.jpg", "amg1-4.jpg", "amg1-5.jpg", "amg1-6.jpg"],
    imageAlt: "Mercedes-Benz CLS63S AMG en Gris Plata",
    price: "35000€",
    color: "Gris Plata",
    description: "Potente y elegante, este CLS63S AMG combina lujo y rendimiento.",
    specs: [
      "Motor V8 4.0L Biturbo",
      "612 CV",
      "0-100 km/h en 3.6s",
      "Transmisión AMG Speedshift MCT 9G",
      "Interior en cuero Nappa",
    ],
  },
  {
    id: 2,
    name: "Maserati Levante Leggera",
    imageFiles: ["maserati.jpg", "audi.jpg", "bmw3.jpg", "amg1.jpg", "abarth.jpg"],
    imageAlt: "Maserati Levante Leggera en Blanco Nocta",
    price: "67000€",
    color: "Blanco Nocta",
    description: "El SUV deportivo italiano que combina estilo y potencia.",
    specs: [
      "Motor V6 3.0L Biturbo",
      "430 CV",
      "0-100 km/h en 5.0s",
      "Tracción integral Q4",
      "Asientos deportivos en cuero",
    ],
  },
  {
    id: 3,
    name: "Audi RSQ8 Performance",
    imageFiles: ["audi.jpg", "audi2.jpg", "audi3.jpg", "bmw2.jpg", "amg1.jpg"],
    imageAlt: "Audi RSQ8 Performance en Blanco Perla",
    price: "120000€",
    color: "Blanco Perla",
    description: "El SUV más rápido de Audi, diseñado para la máxima performance.",
    specs: [
      "Motor V8 4.0L Biturbo",
      "600 CV",
      "0-100 km/h en 3.8s",
      "Suspensión neumática adaptativa",
      "Pantalla táctil de 12.3\"",
    ],
  },
];

export default function CarDetail() {
  const { id } = useParams();
  const car = products.find((p) => p.id === parseInt(id));

  if (!car) {
    return <div className="text-white text-center py-10">Coche no encontrado</div>;
  }

  const [selectedImage, setSelectedImage] = useState(`/img/${car.imageFiles[0]}`);

  return (
    <div className="bg-transparent">
      {/* Navbar */}
      <header className="bg-green-800">
        <nav className="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:px-8">
          <a href="/" className="flex-shrink-0">
            <img
              src="/img/logoDTLPC3.png"
              alt="DTL PREMIUM CAR"
              className="h-10 w-auto"
            />
          </a>
          <div className="hidden lg:flex flex-1 justify-center gap-x-10">
            <a href="/" className="text-sm font-semibold text-white hover:text-gray-300 transition">
              Inicio
            </a>
            <a href="#" className="text-sm font-semibold text-white hover:text-gray-300 transition">
              Características
            </a>
            <a href="#" className="text-sm font-semibold text-white hover:text-gray-300 transition">
              Nuestra Historia
            </a>
            <a href="#" className="text-sm font-semibold text-white hover:text-gray-300 transition">
              Financiamiento
            </a>
            <a href="#" className="text-sm font-semibold text-white hover:text-gray-300 transition">
              Contacto
            </a>
          </div>
          <div className="hidden lg:flex">
            <a
              href="/login"
              className="text-sm font-semibold text-white flex items-center gap-1 hover:text-gray-300"
            >
              Iniciar sesión
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 12a4 4 0 110-8 4 4 0 010 8z" />
              </svg>
            </a>
          </div>
        </nav>
      </header>

      {/* Contenido principal con fondo desde public */}
      <div 
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/img/bg1.png)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Botón de volver */}
          <a href="/vehicles" className="text-white mb-6 inline-block hover:underline">
            ← Volver a vehículos
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Imagen principal */}
            <div className="lg:col-span-2">
              <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                <img
                  src={selectedImage}
                  alt={car.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Miniaturas */}
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {car.imageFiles.map((filename, index) => {
                  const imgSrc = `/img/${filename}`;
                  return (
                    <div key={index} className="w-20 h-20 flex-shrink-0">
                      <img
                        src={imgSrc}
                        alt={`Miniatura ${index + 1}`}
                        className={`w-full h-full object-cover rounded border cursor-pointer ${
                          imgSrc === selectedImage ? "border-emerald-600" : "border-gray-300"
                        }`}
                        onClick={() => setSelectedImage(imgSrc)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detalles y formulario */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6">
              <h1 className="text-xl font-bold text-gray-900">{car.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{car.color}</p>
              <p className="text-2xl font-bold text-emerald-600 mt-4">{car.price}</p>

              <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-900">Descripción</h2>
                <p className="mt-2 text-sm text-gray-700">{car.description}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-900">Especificaciones</h2>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {car.specs.map((spec, i) => (
                    <li key={i}>• {spec}</li>
                  ))}
                </ul>
              </div>

              {/* Formulario de contacto */}
              <div className="mt-8">
                <h2 className="text-sm font-medium text-gray-900">Contáctanos</h2>
                <form className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Teléfono</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-xs text-gray-700">
                      Acepto las{" "}
                      <a href="#" className="text-emerald-600 hover:underline">
                        condiciones de uso
                      </a>{" "}
                      y la{" "}
                      <a href="#" className="text-emerald-600 hover:underline">
                        información básica de protección de datos
                      </a>.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="alerts"
                        type="checkbox"
                        className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-xs text-gray-700">
                      Quiero recibir alertas de anuncios similares
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    Contactar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}