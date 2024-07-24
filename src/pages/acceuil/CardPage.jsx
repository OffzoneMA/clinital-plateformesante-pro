// src/CardPage.js
import React, { useState,useEffect } from 'react';
import Card from '../../components/acceuil/card';
import './CardPage.css';
const CardPage = ({ patients }) => {
  const staticPatients = [
    { id: 1, nom_pat: "Nom1", prenom_pat: "Prenom1", dateNaissance: "1990-01-01", ville: { nom_ville: "Casablanca" } },
    { id: 2, nom_pat: "Nom2", prenom_pat: "Prenom2", dateNaissance: "1992-02-02", ville: { nom_ville: "Rabat" } },
    { id: 3, nom_pat: "Nom3", prenom_pat: "Prenom3", dateNaissance: "1993-03-03", ville: { nom_ville: "Fès" } },
    { id: 4, nom_pat: "Nom4", prenom_pat: "Prenom4", dateNaissance: "1994-04-04", ville: { nom_ville: "Marrakech" } },
    { id: 5, nom_pat: "Nom5", prenom_pat: "Prenom5", dateNaissance: "1995-05-05", ville: { nom_ville: "Tangier" } },
    { id: 6, nom_pat: "Nom6", prenom_pat: "Prenom6", dateNaissance: "1996-06-06", ville: { nom_ville: "Agadir" } },
    { id: 7, nom_pat: "Nom7", prenom_pat: "Prenom7", dateNaissance: "1997-07-07", ville: { nom_ville: "Meknes" } },
    { id: 8, nom_pat: "Nom8", prenom_pat: "Prenom8", dateNaissance: "1998-08-08", ville: { nom_ville: "Oujda" } },
    { id: 9, nom_pat: "Nom9", prenom_pat: "Prenom9", dateNaissance: "1999-09-09", ville: { nom_ville: "Kenitra" } },
    { id: 10, nom_pat: "Nom10", prenom_pat: "Prenom10", dateNaissance: "2000-10-10", ville: { nom_ville: "Tetouan" } },
    { id: 11, nom_pat: "Nom11", prenom_pat: "Prenom11", dateNaissance: "2001-11-11", ville: { nom_ville: "Safi" } },
    { id: 12, nom_pat: "Nom12", prenom_pat: "Prenom12", dateNaissance: "2002-12-12", ville: { nom_ville: "El Jadida" } },
    { id: 13, nom_pat: "Nom13", prenom_pat: "Prenom13", dateNaissance: "2003-01-13", ville: { nom_ville: "Beni Mellal" } },
    { id: 14, nom_pat: "Nom14", prenom_pat: "Prenom14", dateNaissance: "2004-02-14", ville: { nom_ville: "Nador" } },
    { id: 15, nom_pat: "Nom15", prenom_pat: "Prenom15", dateNaissance: "2005-03-15", ville: { nom_ville: "Essaouira" } },
    { id: 16, nom_pat: "Nom16", prenom_pat: "Prenom16", dateNaissance: "2006-04-16", ville: { nom_ville: "Tetouan" } },
    { id: 17, nom_pat: "Nom17", prenom_pat: "Prenom17", dateNaissance: "2007-05-17", ville: { nom_ville: "Safi" } },
    { id: 18, nom_pat: "Nom18", prenom_pat: "Prenom18", dateNaissance: "2008-06-18", ville: { nom_ville: "El Jadida" } },
    { id: 19, nom_pat: "Nom19", prenom_pat: "Prenom19", dateNaissance: "2009-07-19", ville: { nom_ville: "Beni Mellal" } },
    { id: 20, nom_pat: "Nom20", prenom_pat: "Prenom20", dateNaissance: "2010-08-20", ville: { nom_ville: "Nador" } }
  ];
  
  const [allpat, setallpat] = useState({ patients });

  // If patients prop can change, you might want to update state accordingly
  useEffect(() => {
    setallpat({ patients });
  }, [patients]);
  const cities = [
    'Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Tangier', 'Agadir', 'Meknes',
    'Oujda', 'Kenitra', 'Tetouan', 'Safi', 'El Jadida', 'Beni Mellal', 'Nador', 'Essaouira', 'Tetouan', 'Safi', 'El Jadida', 'Beni Mellal', 'Nador', 'Essaouira'
    , 'Tetouan', 'Safi', 'El Jadida', 'Beni Mellal', 'Nador', 'Essaouira'
  ];
  
  let cityOptions = `<select id="cityFilter" onChange={(e) => setCityFilter(e.target.value)}>`;
  cityOptions += '<option value="">All</option>'; // Add an option for "All"
  for (let i = 0; i < cities.length; i++) {
    cityOptions += `<option title="${cities[i]}" value="${cities[i]}">${cities[i]}</option>`;
  }
  cityOptions += '</select>';
    
  
    const [currentPage, setCurrentPage] = useState(1);
    const [cityFilter, setCityFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
  
    const itemsPerPage = 12; // Adjust as per your requirement
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
  
    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };
  
    const handleSearch = () => {
      setCurrentPage(1); // Reset to first page on new search
    };
    
    
    // Filter and paginate data
    const filteredData = allpat.patients.filter((patient) => {
      

      return (
        (cityFilter === '' || patient?.ville?.nom_ville === cityFilter) &&
        (searchTerm === '' ||
          patient.nom_pat.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.prenom_pat.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    const paginatedData = filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
    return (
      <div className="card-page">
        <div className="search-bar">
            <div className="search-nav">
                <div className="filtre">
                    <label htmlFor="cityFilter">Filter :</label>
                    <select id="cityFilter" value={cityFilter } onChange={(e) => setCityFilter(e.target.value)}>
                      <option value="">All</option>
                      {cities.map((city, index) => (
                        <option key={index} title={city} value={city}>
                          {city}
                        </option>
                      ))}
                   </select>  
                </div>  
                <div className="search-nave">
                   
                        
                        <input
                            type="text"
                            id="searchInput"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Rechercher un patient"
                        />
                        
                <button className='btn-search' onClick={handleSearch}>Rechercher <img src='/icons/arrow-right.svg' alt=''/></button>
                </div>
            
            </div>
            <div className="card-grid">
            {paginatedData.map((rdv, index) => (
                
                <Card
                key={index}
                name={`${rdv?.nom_pat} ${rdv?.prenom_pat}`}
                birthDate={rdv?.dateNaissance}
                address={rdv?.ville?.nom_ville}
                patientId={rdv?.id}
                />
                
            ))}
            </div>
            <div className="pagination">
              
            {currentPage > 1 && (
                <button onClick={handlePreviousPage} className="pagination-button">&laquo; </button>
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
                <button onClick={handleNextPage} className="pagination-button"> &raquo;</button>
            )}
                </div>
            
        </div>
      </div>
    );
  };
  
  export default CardPage;