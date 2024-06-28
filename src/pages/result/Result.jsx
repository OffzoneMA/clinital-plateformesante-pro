import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Map from "react-map-gl";
import axios from "axios";
 
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import PriseRdv from "../../components/result/priseRdv/PriseRdv";
import DoctorResult from "../../components/result/DoctorResult";
import SearchBarDocresult from "../../components/searchBarDoc/SearchBarDoc";

import "mapbox-gl/dist/mapbox-gl.css";
import "./result.scss";
import LoginModal from "../../components/Modals/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoginToggle } from "../../utils/redux/GlobalSlice";
import Register from "../../components/connexion/Register";
import searchApi from "../../components/searchBarDoc/SearchApi/searchApi";
import SearchServices from "../../components/searchBarDoc/SearchServices/SearchServices";
import { TOKEN } from '../../services/api';
import { useTranslation } from "react-i18next";

function Result() {
  const url = window.location.search;
  const { t } = useTranslation();
  const [result, setResult] = useState([]);
  // const [search, setSearch] = useState({ city: "", spec: "" });
  const [s_Params, setS_Params] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageBar, setPageBar] = useState({ pages: [], items: [] });
  const filterBar = useRef();
  const [randomX, setRandomX] = useState();
  const [params] = useSearchParams();
    const idVille = params.get("id_ville");
    const page = Number(params.get("page"));
    const search = params.get("search");
    const ville = params.get("ville");

 //FILTRE DISPONIBILITÉ ---------------------------------
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedLangueFilter, setSelectedLangueFilter] = useState(null);
  const [filterApplied, setFilterApplied] = useState(false);

    //les résultats initiaux
  const [initialResult, setInitialResult] = useState([]);
  
  const handleFilterChange = (filter) => {
  
  if (selectedFilter !== filter) {
    setSelectedFilter(filter); // Mettre à jour le filtre sélectionné
    setSelectedLangueFilter(null); //Desactiver le filtrelangue 
    setFilterApplied(false); // Réinitialiser l'état indiquant que le filtrage a été appliqué
  } else {
    
    setSelectedFilter(null);
   // console.log(initialResult)
    setResult(initialResult); // Réinitialiser les résultats de la recherche
    setFilterApplied(false); // Réinitialiser l'état indiquant que le filtrage a été appliqué
  }
};

const handleLangueFilter = (langueName) => {
  // Vérifier si le filtre actuel est différent du nouveau filtre sélectionné
  if (selectedLangueFilter !== langueName) {
    setSelectedLangueFilter(langueName); // Mettre à jour le filtre sélectionné
     setSelectedFilter(null); // Désactiver le filtre de disponibilité
    setFilterApplied(false); // Réinitialiser l'état indiquant que le filtrage a été appliqué
  } else {
    
    setSelectedLangueFilter(null);
    //console.log(initialResult)
    setResult(initialResult); // Réinitialiser les résultats de la recherche
    setFilterApplied(false); // Réinitialiser l'état indiquant que le filtrage a été appliqué
  }
};

 //---------------------------------------------

    // Function to generate API link
    const generateApiLink = () => {
      if (idVille) {
        return searchApi.getMedbyCity(idVille);
      } else if (search && !ville) {
        return searchApi.getMedbySpecOrName(search);
      } else if (search && ville) {
        return searchApi.getMedbyNameOrSpecAndCity(search, ville);
      }
    };
    // Function to fetch search results---------------------------------
    const fetchResult = (link) => {
      //console.log(link)
      setLoading(true);
      try {
        SearchServices.FetchSearchResult(link).then((res)=>{
          //console.log("test"+link)
          if (res.status >= 200 && res.status < 300) {
            setResult(res.data);
            setInitialResult(res.data);
           
            //console.log(link)
          }
        }).catch((error)=>{
          toast.error(error.message);
        }).finally(()=>{
          setLoading(false);
        });
        
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
  };
  //----------------------------------------------------------------
  
  
  // Get search params & fetch search result
  const searchDoc = () => {
    setSelectedFilter(null); // reinitialize filter

    //console.log("searchDoc")
    setS_Params({
      idVille: idVille,
      search: search,
      ville: ville,
      page: page,
    });

    // Fetch result
    const link = generateApiLink();
    console.log(link)
    if (link) {
      fetchResult(link);
    }
  };

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => searchDoc(), [randomX]);

  //PAGINATION----------------------------------------------------------------
  // Generate array of page numbers
  useEffect(() => {
    const pagesItems = () => {
      const pageNbr = Math.ceil(result.length / 6);

      var pageArray = [];
      for (let i = 0; i < pageNbr; i++)
        pageArray.push((s_Params.page - 1) * 6 + i + 1);

      var itemArray = [];
      for (let i = 0; i < (6 && result.length); i++)
        itemArray.push((s_Params.page - 1) * 6 + i + 1);

      setPageBar({ pages: pageArray, items: itemArray });
    };
    pagesItems();
  }, [result.length, s_Params.page]);

  // Generate page link on click to the page button
  const generatePageLink = (page) => {
    if (url.includes("page")) {
      const indexPage = url.indexOf("&page=") + 6;
      const newUrl = url.replace("page=" + url[indexPage], `page=${page}`);
      return newUrl;
    } else return url + "&page=1";
  };

  // Generate page link on click to next or prev button
  const changePage = (value) => {
    if (url.includes("page")) {
      const indexPage = url.indexOf("&page=") + 6;
      const newUrl = url.replace(
        "page=" + url[indexPage],
        `page=${s_Params.page + value}`
      );
      window.location = newUrl;
    } else window.location = url + "&page=1";
  };
  //----------------------------------------------------------------
  
  //link actiif
  const toggleOptin = (e) => e.target.classList.toggle("active");
  
const handleClickFilter = (e) => {
  const target = e.target;
  
  toggleOptin(e);
  
  if (target.dataset.type === "filter") {
    handleFilterChange(target.dataset.filter); // Mettre à jour le filtre de disponibilité
    setSelectedLangueFilter(null); // Désactiver le filtre de langue
  } else if (target.dataset.type === "langueFilter") {
    handleLangueFilter(target.dataset.langue); // Mettre à jour le filtre de langue
    setSelectedFilter(null); // Désactiver le filtre de disponibilité
  }
};
//----------------------------------------------------------------


  //console.log(result);
  
  const logintoggle =useSelector((state)=>state.global.logintoggle);
  const dispatch=useDispatch();
  const handleCloseModal=()=>{
    dispatch(setLoginToggle(!logintoggle));
  }
  useEffect(() => {
    //console.log("login ")
   // console.log('change logintoggle:', logintoggle)
  }, [logintoggle]);

  //FILTRE DISPONIBILITÉ----------------------------------------------------------------

  useEffect(() => {
  // Effet pour la gestion des filtres
  if ((!selectedFilter && !selectedLangueFilter) && filterApplied) {
    setResult(initialResult);
    //console.log("Initial",initialResult)
    setFilterApplied(false);
  }
}, [selectedFilter, selectedLangueFilter, initialResult, filterApplied]);

useEffect(() => {
  // Effet pour la récupération des créneaux filtrés
  if (!loading && initialResult.length > 0 && !filterApplied && selectedFilter) {
    
    const medecinIds = initialResult.map(item => item.id);

    axios.post(`${process.env.BASE_URL}med/medecins/schedules/filter`, {
      medecinIds: medecinIds,
      filter: selectedFilter
    })
    .then((response) => {
      setResult(response.data);
      //toast.success("Success");
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des créneaux filtrés :', error);
    });
  }
}, [loading, selectedFilter, initialResult, filterApplied]);

useEffect(() => {
  // Effet pour la récupération des médecins parlant la langue filtrée
  if (!loading && initialResult.length > 0 && !filterApplied && selectedLangueFilter) {
    
    const medecinIds = initialResult.map(item => item.id);

    axios.post(`${process.env.BASE_URL}med/byLangue`, {
      medecinIds: medecinIds,
      filter: selectedLangueFilter
    })
    .then((response) => {
      setResult(response.data);
      //toast.success("Success");
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des médecins parlant la langue filtrée :', error);
    });
  }
}, [loading, selectedLangueFilter, initialResult, filterApplied]);


//----------------------------------------------------------------

  return (
    <div className="result" >
      <Navbar /> 
      <div className="result-container" style={{ direction: localStorage.getItem("language") === "ar" ? "rtl" : "ltr" }}>
      {logintoggle && <Register isOpen={logintoggle} onClose={handleCloseModal} />}
    
        <div className="search" style={{paddingTop: "26px",paddingBottom:"13px"}}>
          <SearchBarDocresult setRandomX={setRandomX} />
        </div>
        <div className="container">
          <div className="filter-bar">
            <div className="bar-container" ref={filterBar}>
              <div className="filter-title">
                <img src="../../icons/filter.svg" alt="" />
                {t("Filterby")}
              </div>

              <details>
                <summary>
                 {t("Availability")}
                  <img src="../../icons/flech-black.svg" alt="" />
                </summary>
                <div className="detail">
                   <span
                      className={selectedFilter === 'nextTwoDays' ? 'active' : ''}
                      onClick={() => handleFilterChange('nextTwoDays')}
                    >
                     {t("Inthenexttwodays")}
                    </span>
                    <span
                      className={selectedFilter === 'weekend' ? 'active' : ''}
                      onClick={() => handleFilterChange('weekend')}
                    >
                      {t("Ontheweekend")}
                    </span>
                    <span
                      className={selectedFilter === 'weekday' ? 'active' : ''}
                      onClick={() => handleFilterChange('weekday')}
                    >
                      {t("Onweekdays")}
                    </span>
                      
                  </div>
              </details>

              

              <details>
                <summary>
                  {t("Reasonforconsultation")}
                  <img src="../../icons/flech-black.svg" alt="" />
                </summary>
                <div className="detail">
                  <span onClick={toggleOptin}>{t("Firstconsultation")}</span>
                  <span onClick={toggleOptin}>{t("Followupconsultation") }</span>
                  <span onClick={toggleOptin}>{t("Emergency")}</span>
                </div>
              </details>

              <details>
                <summary>
                 {t("Spokenlanguages")}
                  <img src="../../icons/flech-black.svg" alt="" />
                </summary>
                <div className="detail">
              
                  <span className={selectedLangueFilter === 'Arabe' ? 'active' : ''}
                    onClick={() => handleLangueFilter('Arabe')}>{t("Arabic")}</span>
                  <span className={selectedLangueFilter === 'Amazigh' ? 'active' : ''}
                    onClick={() => handleLangueFilter('Amazigh')}>{t("Amazigh")}</span>
                  <span className={selectedLangueFilter === 'Français' ? 'active' : ''}
                    onClick={() => handleLangueFilter('Français')}>{t("French")}</span>
                  <span className={selectedLangueFilter === 'Anglais' ? 'active' : ''}
                    onClick={() => handleLangueFilter('Anglais')}>{t("English")}</span>
                  <span className={selectedLangueFilter === 'Espagnol' ? 'active' : ''}
                    onClick={() => handleLangueFilter('Espagnol')}>{t("Spanish")}</span>
                  <span className={selectedLangueFilter === 'Italien' ? 'active' : ''}
                    onClick={() => handleLangueFilter('Italien')}>{t("Italian")}</span>
                  <span className={selectedLangueFilter === 'Allemand' ? 'active' : ''}
                    onClick={() => handleLangueFilter('Allemand')}>{t("German")}</span>
                  <span className={selectedLangueFilter === 'Turc' ? 'active' : ''}
                    onClick={() => handleLangueFilter('Turc')}>{t("Turkish")}</span>
                  <span className={selectedLangueFilter === 'Russe' ? 'active' : ''}
                    onClick={() => handleLangueFilter('Russe')}>{t("Russian")}</span>

                </div>
              </details>
            </div>
          </div>
          <div className="content">
            <div className="content-wrapper">
              <div className="rdvs-container" style={{
                      marginRight: localStorage.getItem("language") === "ar" ? "0px" : "40px",
                     
                    }}>
                {loading
                  ? t("loading")
                  : !result.length
                  ? t("Noresults")
                  : pageBar.items.map(
                      (x, index) =>
                        !loading && (
                          <div key={index}>
                            {result[x - 1] && (
                              <DoctorResult item={result[x - 1]} />
                            )}
                          </div>
                        )
                    )}
                {!loading && (
                  <>
                    <div>
                      {/*<DoctorResult type={1} />*/}
                    </div>
                    <div>
                      {/*<DoctorResult type={2} />*/}
                    </div>
                  </>
                )}
              </div>
              <div className="page-numbers">
                <div className="number-container">
                  {pageBar.pages.lenght < 0 && (
                    <img
                      className={s_Params.page <= 1 ? "disable" : ""}
                      src="../../icons/flech-white.svg"
                      alt=""
                      onClick={() => changePage(-1)}
                    />
                  )}
                  {pageBar.pages.map((x, index) => (
                    <a
                      key={index}
                      className=""
                      href={generatePageLink(index + 1)}
                    >
                      {index + 1}
                    </a>
                  ))}
                </div>
                {pageBar.pages.lenght < 0 && (
                  <div
                    onClick={() => changePage(+1)}
                    className={
                      s_Params.page === pageBar.pages.length
                        ? "disable next"
                        : "next"
                    }
                  >
                    <span>{t("Next Page")}</span>
                    <img src="../../icons/flech-white.svg" alt="" />
                  </div>
                )}
              </div>
            </div>
            <div className="map-container" style={{
                      marginRight: localStorage.getItem("language") === "ar" ? "50px" : "0px",
                      marginLeft: localStorage.getItem("language") === "ar" ? "30px" : "40px",
                    }}>
              <Map
                initialViewState={{
                  longitude: -7.4,
                  latitude: 33.6,
                  zoom: 10,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken="pk.eyJ1IjoibWFyd2FuZW5oIiwiYSI6ImNsNndwYjZjOTBhdXMzam8xc3psdzhvYTEifQ.BNnvlSlxD2Zo8X9i9FVdMw"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Routes>
        <Route exact path="/prise-rdv/" element={<PriseRdv />} />
      </Routes>
    </div>
  );
}

export default Result;
