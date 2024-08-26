import React, { useState } from 'react';
import Card from '../../components/acceuil/card';
import './cardpage.css';

const CardPage = ({ equipe, type }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  const defaultEquipe = { medecins: [], secretaires: [], assistants: [] };
  const { medecins, secretaires, assistants } = equipe || defaultEquipe;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filterBySearchTerm = (list) => {
    return list.filter(item => item.nom && item.nom.toLowerCase().startsWith(searchTerm.toLowerCase()));
  };

  const filteredMedecins = filterBySearchTerm(medecins);
  const filteredSecretaires = filterBySearchTerm(secretaires);
  const filteredAssistants = filterBySearchTerm(assistants);

  const getFilteredData = () => {
    if (type === 'prat') return filteredMedecins;
    if (type === 'sec') return filteredSecretaires;
    if (type === 'ass') return filteredAssistants;
    return [];
  };

  const filteredData = getFilteredData();
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="card-page">
      <div className="search-bar">
        <div className="search-nav">
          <div className="mon-agenda">
            {type === "prat" && "Mes praticiens"}
            {type === "sec" && "Mes secretaires"}
            {type === "ass" && "Mes assistantes"}
          </div>
          <div className="search-nave">
            <input
              type="text"
              id="searchInput"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Rechercher"
            />
          </div>
        </div>
      </div>
      <div className="card-grid">
        {paginatedData.map((person) => (
          <Card key={person.id} type={type} team={person} />
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="pagination-button">&laquo;</button>
        )}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={handleNextPage} className="pagination-button">&raquo;</button>
        )}
      </div>
    </div>
  );
};

export default CardPage;
