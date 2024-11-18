import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./moduloPagi.css"

const Pagination = ({ pageNumber, info, updatePageNumber }) => {
  // Establece el estado del ancho de la ventana
  const [width, setWidth] = useState(window.innerWidth);

  // Actualiza el ancho de la ventana cuando cambia el tamaño
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  // Efecto para agregar y limpiar el evento de cambio de tamaño de la ventana
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Lógica para la paginación
  const handlePageChange = (selectedPage) => {
    updatePageNumber(selectedPage.selected + 1); // ReactPaginate usa 0-indexed, así que sumamos 1
  };

  // Verifica si la ventana es lo suficientemente ancha para mostrar el paginador completo
  const isMobile = width <= 768;

  return (
    <div className={`pagination-container ${isMobile ? "mobile" : ""}`}>
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        pageCount={info?.pages || 0} // Número total de páginas
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        disabledClassName={"disabled"}
        forcePage={pageNumber - 1} // ReactPaginate usa 0-indexed, así que ajustamos
      />
    </div>
  );
};

export default Pagination;
