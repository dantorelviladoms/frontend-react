// src/pages/CarDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";


export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState(null);

  const userId = localStorage.getItem("userId");
  const isLoggedIn = !!userId;

  useEffect(() => {
    fetchVehiculo();
  }, [id]);

  const fetchVehiculo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/vehiculos/${id}`);
      const data = await response.json();

      if (data.status === "success") {
        setCar(data.data);
        // Establecer primera imagen del array como principal
        if (data.data.imageFile && data.data.imageFile.length > 0) {
          setSelectedImage(`/img/${data.data.imageFile[0]}`);
        }
      } else {
        setError("Vehículo no encontrado");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error("Error fetching vehicle:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setAddingToCart(true);
    setCartMessage(null);

    try {
      const response = await fetch("http://localhost:5000/api/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: userId,
          id_vehiculo: car._id
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setCartMessage({ type: "success", text: "¡Añadido al carrito!" });
      } else {
        setCartMessage({ type: "error", text: data.message || "Error al añadir al carrito" });
      }
    } catch (err) {
      setCartMessage({ type: "error", text: "Error de conexión" });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="mt-2">Cargando vehículo...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/20 border border-red-500 text-red-100 px-6 py-4 rounded-lg">
            {error || "Vehículo no encontrado"}
          </div>
          <a href="/home" className="mt-4 inline-block text-green-400 hover:underline">
            ← Volver al catálogo
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent">
      {/* Navbar */}
      <Navbar variant={isLoggedIn ? "authenticated" : "public"} />

      {/* Contenido principal con el mismo fondo de Home */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/img/bg2.png)' }}
      >
        <div className="absolute inset-0 bg-black-800 bg-opacity-0"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-8 sm:px-6 sm:pb-12 lg:px-8">
          {/* Botón de volver */}
          <a
            href="/home"
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-900/60 backdrop-blur-md text-white rounded-lg border border-transparent hover:border-green-500 transition-all shadow-lg"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al catálogo
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Imagen principal y galería */}
            <div className="lg:col-span-2">
              {/* Imagen principal */}
              <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                <img
                  src={selectedImage || "/img/default-car.jpg"}
                  alt={`${car.marca} ${car.modelo}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Galería de miniaturas */}
              {car.imageFile && car.imageFile.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {car.imageFile.map((imgFile, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(`/img/${imgFile}`)}
                      className={`aspect-video overflow-hidden rounded-lg border-2 transition-all ${selectedImage === `/img/${imgFile}`
                        ? "border-green-500 ring-2 ring-green-500"
                        : "border-gray-700 hover:border-green-400"
                        }`}
                    >
                      <img
                        src={`/img/${imgFile}`}
                        alt={`${car.marca} ${car.modelo} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Detalles y botón de añadir al carrito */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6">
              <h1 className="text-xl font-bold text-gray-900">{car.marca} {car.modelo}</h1>
              {car.version && <p className="text-sm text-gray-600">{car.version}</p>}
              <p className="text-sm text-gray-500 mt-1">{car.color}</p>
              <p className="text-2xl font-bold text-emerald-600 mt-4">{car.precio}€</p>

              <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-900">Especificaciones</h2>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li>• Año: {car.ano}</li>
                  <li>• Kilometraje: {car.kilometraje?.toLocaleString()} km</li>
                  <li>• Combustible: {car.combustible}</li>
                  <li>• Transmisión: {car.transmision}</li>
                  <li>• Potencia: {car.potencia} CV</li>
                  <li>• Plazas: {car.plazas}</li>
                  <li>• Estado: {car.estado}</li>
                  <li>• Garantía: {car.garantia}</li>
                </ul>
              </div>

              {/* Mensaje del carrito */}
              {cartMessage && (
                <div className={`mt-4 p-3 rounded text-sm text-center ${cartMessage.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
                  }`}>
                  {cartMessage.text}
                </div>
              )}

              {/* Botón añadir al carrito */}
              <div className="mt-6">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addingToCart ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Añadiendo...
                        </>
                      ) : (
                        "Añadir al carrito"
                      )}
                    </button>
                    <button
                      onClick={() => alert("Próximamente se abrirá la pestaña de compra")}
                      className="w-full flex justify-center py-3 px-4 border border-green-600 rounded-md shadow-sm text-sm font-medium text-green-400 bg-transparent hover:bg-green-600/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                      Comprar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Iniciar sesión para comprar
                  </button>
                )}
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
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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