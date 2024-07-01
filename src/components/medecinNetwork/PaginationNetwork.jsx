import React from "react";
import { Link } from "react-router-dom";

const PaginationNetwork = ({ totalPages, currentPage, onPageChange, generatePageLink }) => {
  const changePage = (increment) => {
    const nextPage = Math.max(1, Math.min(totalPages, currentPage + increment));
    onPageChange(nextPage);
  };

  if (totalPages <= 1) {
    return null; // Ne pas rendre la pagination s'il n'y a qu'une seule page ou moins
  }

  return (
    <div className="page-numbers">
      <div className="number-container">
        {/* Flèche précédente */}
        <img
         
          src="/icons/flech-white.svg"
          alt="Flèche précédente"
          className={`arrow ${currentPage <= 1 ? "disable" : ""}`}
          onClick={() => {
            const prevPage = currentPage - 1;
            changePage(-1);
            const prevPageLink = generatePageLink(prevPage);
            window.history.pushState({}, "", prevPageLink);
          }}
         
        />

        {/* Numéros de page */}
        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            key={index + 1}
            className={`page-number ${index + 1 === currentPage ? "active" : ""}`}
            to={generatePageLink(index + 1)}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Link>
        ))}

        {/* Flèche suivante */}
        <div
          onClick={() => {
            const nextPage = currentPage + 1;
            changePage(1);
            const nextPageLink = generatePageLink(nextPage);
            window.history.pushState({}, "", nextPageLink);
          }}
          className={`arrow ${currentPage === totalPages ? "disable next" : "next"}`}
        >
          <span></span>
          <img
            src="/icons/flech-white.svg"
            alt="Flèche suivante"
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationNetwork;



/*import React from "react";

const PaginationNetwork = ({ totalPages, currentPage, onPageChange, generatePageLink }) => {
  const changePage = (increment) => {
    const nextPage = Math.max(1, Math.min(totalPages, currentPage + increment));
    onPageChange(nextPage);
  };

  if (totalPages <= 1) {
    return null; // Ne pas rendre la pagination s'il n'y a qu'une seule page ou moins
  }*/

  /*return (
    <div className="page-numbers">
      <div className="number-container">
    
        <img
          className={currentPage <= 1 ? "disable" : ""}
          src="../../icons/flech-white.svg"
          alt="Flèche précédente"
          onClick={() => changePage(-1)}
        />


        {Array.from({ length: totalPages }, (_, index) => (
          <a
            key={index}
            className={index + 1 === currentPage ? "active" : ""}
            href={generatePageLink(index + 1)}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(index + 1);
            }}
          >
            {index + 1}
          </a>
        ))}

       
        <div
          onClick={() => changePage(1)}
          className={currentPage === totalPages ? "disable next" : "next"}
        >
          <span>Page Suivante</span>
          <img src="../../icons/flech-white.svg" alt="Flèche suivante" />
        </div>
      </div>
    </div>
  );
};

export default PaginationNetwork;*/
