import React from "react";
import "./moduloPagi.css"; // Agrega estilos si los necesitas

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination-controls">
      {/* Botón para página anterior */}
      <button
        onClick={() => onPageChange("prev")}
        disabled={currentPage === 1} // Deshabilitar si es la primera página
      >
        Anterior
      </button>

      {/* Indicador de página actual */}
      <span className="pagination-info">
        Página {currentPage} de {totalPages}
      </span>

      {/* Botón para página siguiente */}
      <button
        onClick={() => onPageChange("next")}
        disabled={currentPage === totalPages} // Deshabilitar si es la última página
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;
