import React from "react";

const PaginationNetwork = ({ totalPages, currentPage, onPageChange, generatePageLink }) => {

  const changePage = (increment) => {
    const nextPage = Math.max(1, Math.min(totalPages, currentPage + increment));
    onPageChange(nextPage);
  };

  return (
     <div className="page-numbers">
                        <div className="number-container">
                            <img
                                className={page <= 1 ? "disable" : ""}
                                src="../../icons/flech-white.svg"
                                alt="Flèche précédente"
                                onClick={() => changePage(-1)}
                            />
                            {Array.from({ length: totalPages }, (_, index) => (
                                <a
                                    key={index}
                                    className={index + 1 === page ? "active" : ""}
                                    href={generatePageLink(index + 1)}
                                >
                                    {index + 1}
                                </a>
                            ))}
                            <div
                                onClick={() => changePage(1)}
                                className={page === totalPages ? "disable next" : "next"}
                            >
                                <span>Page Suivante</span>
                                <img src="../../icons/flech-white.svg" alt="Flèche suivante" />
                            </div>
                        </div>
                    </div>
                

  );
};

export default PaginationNetwork;
  
                   