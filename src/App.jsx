// src/App.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "./App.css";

const navigation = [
  { name: "Catálogo", href: "/home" }, 
  { name: "Características", href: "#" },
  { name: "Nuestra Historia", href: "#" },
  { name: "Financiamiento", href: "#" },
  { name: "Contacto", href: "#" },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div 
      className="relative bg-cover bg-center bg-no-repeat min-h-screen bg-black"
      style={{ backgroundImage: 'url(/img/interior3.png)' }} 
    >
    {/* overlay oscuro suave para que se lea mejor la img*/}
      <div className="absolute inset-0 bg-black/70"></div>
      

      {/* Contenido real (encima del fondo) */}
      <div className="relative z-10">

        {/* Header */}
        <header className="absolute inset-x-2 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-start justify-between p-7 lg:px-5"
          >
            <div className="flex lg:flex-1">
              <a href="/" className="-m-15 p-4.5">
                <span className="sr-only">DTL PREMIUM CAR</span>
                
                <img
                  src="/img/logoDTLPC3.png"
                  alt="DTL PREMIUM CAR"
                  className="h-35 w-auto"
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-green-400"
              >
                <span className="sr-only">Abrir menú principal</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold text-white hover:text-green-200 transition"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="/login" className="text-sm font-semibold text-white flex items-center gap-1 hover:text-green-200">
                Iniciar sesión
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </a>
            </div>
          </nav>

          {/* Menú móvil */}
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-green-100/10">
              <div className="flex items-center justify-between">
                <div></div>
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">DTL PREMIUM CAR</span>
                  <img
                    src="/img/logoDTLPC3.png"
                    alt="DTL PREMIUM CAR"
                    className="h-50 w-auto"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-200"
                >
                  <span className="sr-only">Cerrar Menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-white/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-green-700"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-green-500"
                    >
                      Iniciar sesión
                    </a>
                    <a 
                      href="/register"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-green-500"
                    >
                      Registrarse
                    </a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

        {/* Hero */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
                DTL PREMIUM CAR
              </h1>
              <p className="mt-6 text-lg text-gray-300 sm:text-xl">
                Donde el lujo toma el volante, el prestigio no va en el asiento del copiloto… va contigo.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/vehicles"
                  className="rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                >
                  Encuentra tu nuevo pasión!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outlet (renderiza rutas hijas si las hubiera) */}
      <Outlet />
    </div>
  );
}

export default App;