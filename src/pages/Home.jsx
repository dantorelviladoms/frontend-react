// src/pages/Home.jsx
import React, { useState } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Mercedes-Benz CLS63S AMG",
    imageFile: "amg1.jpg",
    imageAlt: "Mercedes-Benz CLS63S AMG en Gris Plata",
    price: "35000€",
    color: "Gris Plata",
  },
  {
    id: 2,
    name: "Maserati Levante Leggera",
    imageFile: "maserati.jpg",
    imageAlt: "Maserati Levante Leggera en Blanco Nocta",
    price: "67000€",
    color: "Blanco Nocta",
  },
  {
    id: 3,
    name: "Audi RSQ8 Performance",
    imageFile: "audi.jpg",
    imageAlt: "Audi RSQ8 Performance en Blanco Perla",
    price: "120000€",
    color: "Blanco Perla",
  },
  {
    id: 4,
    name: "BMW M8 Grand Coupé",
    imageFile: "bmw2.jpg",
    imageAlt: "BMW M8 Grand Coupé en Blanco Puro",
    price: "85000€",
    color: "Blanco Puro",
  },
  {
    id: 5,
    name: "Mercedes-Benz CLA35 AMG",
    imageFile: "amg2.jpg",
    imageAlt: "Mercedes-Benz CLA35 AMG en Gris Plata",
    price: "38500€",
    color: "Gris Plata",
  },
  {
    id: 6,
    name: "Abarth 695 75º Aniversario",
    imageFile: "abarth.jpg",
    imageAlt: "Abarth 695 75º Aniversario en Negro Pista",
    price: "67000€",
    color: "Negro Pista",
  },
  {
    id: 7,
    name: "Audi TT RS",
    imageFile: "audi3.jpg",
    imageAlt: "Audi TT RS en Verde Limosna",
    price: "75000€",
    color: "Verde Limosna",
  },
  {
    id: 8,
    name: "BMW M2 CS",
    imageFile: "bmw3.jpg",
    imageAlt: "BMW M2 CS en Negro Platino",
    price: "45000€",
    color: "Negro Platino",
  },
  {
    id: 9,
    name: "Audi R8 V10",
    imageFile: "audi2.jpg",
    imageAlt: "Audi R8 V10 en Verde Bosque",
    price: "134000€",
    color: "Verde Bosque",
  },
];

const brands = ["Todos", "Mercedes", "Audi", "BMW", "Maserati", "Abarth"];

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState("Todos");

  const filteredProducts = selectedBrand === "Todos"
    ? products
    : products.filter((product) =>
        product.name.toLowerCase().includes(selectedBrand.toLowerCase())
      );

  return (
    // 👇 Este contenedor ahora ocupa toda la pantalla y es transparente
    <div className="min-h-screen bg-transparent">
      <Navbar />

      {/* Fondo de imagen que empieza desde arriba (detrás del navbar) */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/img/bg2.png)' }}
      >
        {/* Overlay (opcional, lo dejas en opacity 0 si no quieres oscurecer) */}
        <div className="absolute inset-0 bg-black-800 bg-opacit y-0"></div>

        {/* Contenido por encima del fondo */}
        <div className="relative z-10 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-white text-center">
            Vehículos disponibles
          </h2>

          {/* Botones de filtrado */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  selectedBrand === brand
                    ? "bg-green-900 text-white"
                    : "bg-green-700 bg-opacity-20 text-white"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white/10 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-green-700"
              >
                {/* Imagen del coche */}
                <div className="h-56 w-full overflow-hidden">
                  <img
                    alt={product.imageAlt}
                    src={`/img/${product.imageFile}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Información del coche */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        <Link to={`/car/${product.id}`} className="hover:underline">
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-xs text-purple-200">{product.color}</p>
                    </div>
                    <p className="text-sm font-bold text-green-500">{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}