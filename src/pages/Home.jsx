// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import FilterModal from "../components/FilterModal";
import SortModal from "../components/SortModal";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para modales
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  // Estado para filtros y ordenación
  const [filters, setFilters] = useState({
    marcas: [],
    precioMin: "",
    precioMax: "",
    potenciaMin: "",
    potenciaMax: "",
    colores: []
  });

  const [sort, setSort] = useState({
    sortBy: "",
    sortOrder: "asc"
  });

  useEffect(() => {
    fetchVehiculos();
  }, [filters, sort]);

  const fetchVehiculos = async () => {
    try {
      setLoading(true);

      // Construir query params
      const params = new URLSearchParams();

      // Filtros de marca
      if (filters.marcas.length > 0) {
        filters.marcas.forEach(marca => params.append('marca', marca));
      }

      // Filtros de precio
      if (filters.precioMin) params.append('precioMin', filters.precioMin);
      if (filters.precioMax) params.append('precioMax', filters.precioMax);

      // Filtros de potencia
      if (filters.potenciaMin) params.append('potenciaMin', filters.potenciaMin);
      if (filters.potenciaMax) params.append('potenciaMax', filters.potenciaMax);

      // Filtros de color
      if (filters.colores.length > 0) {
        filters.colores.forEach(color => params.append('color', color));
      }

      // Ordenación
      if (sort.sortBy) {
        params.append('sortBy', sort.sortBy);
        params.append('sortOrder', sort.sortOrder);
      }

      const url = `http://localhost:5000/api/vehiculos${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "success") {
        setProducts(data.data);
      } else {
        setError("Error al cargar los vehículos");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleApplySort = (newSort) => {
    setSort(newSort);
  };

  const hasActiveFilters = filters.marcas.length > 0 ||
    filters.precioMin ||
    filters.precioMax ||
    filters.potenciaMin ||
    filters.potenciaMax ||
    filters.colores.length > 0;

  const hasActiveSort = sort.sortBy !== "";

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar variant="authenticated" />

      {/* Fondo de imagen */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/img/bg2.png)' }}
      >
        <div className="absolute inset-0 bg-black-800 bg-opacity-0"></div>

        {/* Contenido */}
        <div className="relative z-10 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-white text-center">
            Vehículos disponibles
          </h2>

          {/* Botones de Filtros y Ordenar */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${hasActiveFilters
                ? "bg-green-700 text-white shadow-lg"
                : "bg-white/10 backdrop-blur-sm text-white border border-green-700 hover:bg-green-700/20"
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtros
              {hasActiveFilters && (
                <span className="bg-white text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">
                  Activo
                </span>
              )}
            </button>

            <button
              onClick={() => setIsSortModalOpen(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${hasActiveSort
                ? "bg-green-700 text-white shadow-lg"
                : "bg-white/10 backdrop-blur-sm text-white border border-green-700 hover:bg-green-700/20"
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              Ordenar
              {hasActiveSort && (
                <span className="bg-white text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">
                  Activo
                </span>
              )}
            </button>
          </div>

          {/* Estado de carga */}
          {loading && (
            <div className="mt-12 text-center text-white">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="mt-2">Cargando vehículos...</p>
            </div>
          )}

          {/* Estado de error */}
          {error && (
            <div className="mt-12 text-center">
              <div className="bg-red-500/20 border border-red-500 text-red-100 px-6 py-4 rounded-lg inline-block">
                {error}
              </div>
            </div>
          )}

          {/* Grid de productos */}
          {!loading && !error && (
            <div className="mt-12 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group relative bg-white/10 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-green-700"
                >
                  {/* Imagen del coche */}
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      alt={`${product.marca} ${product.modelo}`}
                      src={
                        product.imageFile && product.imageFile.length > 0
                          ? `/img/${product.imageFile[0]}`
                          : "/img/default-car.jpg"
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Información del coche */}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-white">
                          <Link to={`/car/${product._id}`} className="hover:underline">
                            {product.marca} {product.modelo}
                          </Link>
                        </h3>
                        <p className="mt-1 text-xs text-purple-200">{product.color}</p>
                        <p className="mt-1 text-xs text-gray-300">{product.potencia} CV</p>
                      </div>
                      <p className="text-sm font-bold text-green-500">{product.precio}€</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sin productos */}
          {!loading && !error && products.length === 0 && (
            <div className="mt-12 text-center text-white">
              <p>No hay vehículos disponibles con los filtros seleccionados.</p>
              <button
                onClick={() => {
                  setFilters({
                    marcas: [],
                    precioMin: "",
                    precioMax: "",
                    potenciaMin: "",
                    potenciaMax: "",
                    colores: []
                  });
                  setSort({ sortBy: "", sortOrder: "asc" });
                }}
                className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />

      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onApply={handleApplySort}
        currentSort={sort}
      />
      <Footer />
    </div>
  );
}
