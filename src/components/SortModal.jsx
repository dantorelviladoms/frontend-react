import React, { useState, useEffect } from "react";

export default function SortModal({ isOpen, onClose, onApply, currentSort }) {
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        if (currentSort) {
            setSortBy(currentSort.sortBy || "");
            setSortOrder(currentSort.sortOrder || "asc");
        }
    }, [currentSort, isOpen]);

    const sortOptions = [
        { value: "precio-asc", label: "Precio: Menor a mayor", sortBy: "precio", sortOrder: "asc" },
        { value: "precio-desc", label: "Precio: Mayor a menor", sortBy: "precio", sortOrder: "desc" },
        { value: "potencia-asc", label: "Potencia: Menor a mayor", sortBy: "potencia", sortOrder: "asc" },
        { value: "potencia-desc", label: "Potencia: Mayor a menor", sortBy: "potencia", sortOrder: "desc" }
    ];

    const handleOptionClick = (option) => {
        setSortBy(option.sortBy);
        setSortOrder(option.sortOrder);
        onApply({ sortBy: option.sortBy, sortOrder: option.sortOrder });
        onClose();
    };

    const handleClear = () => {
        setSortBy("");
        setSortOrder("asc");
        onApply({ sortBy: "", sortOrder: "asc" });
        onClose();
    };

    if (!isOpen) return null;

    const currentValue = sortBy ? `${sortBy}-${sortOrder}` : "";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/10 p-4">
            <div className="bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-green-700 max-w-md w-full">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-green-700/50">
                    <h2 className="text-2xl font-bold text-white">Ordenar</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${currentValue === option.value
                                ? "bg-green-700 border-green-500 text-white"
                                : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-green-700"
                                }`}
                        >
                            <span className="font-medium">{option.label}</span>
                            {currentValue === option.value && (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-green-700/50">
                    <button
                        onClick={handleClear}
                        className="w-full px-6 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors"
                    >
                        Sin ordenar
                    </button>
                </div>
            </div>
        </div>
    );
}
