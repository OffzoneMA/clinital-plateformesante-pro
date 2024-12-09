import React, { useReducer, useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Mark from "mark.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import './searchBarDoc.scss'
import SearchServices from "./SearchServices/SearchServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSpecialite, setVilles } from "../../utils/redux/GlobalSlice";

function SearchBarDoc({ setRandomX, comp }) {

  const [searchParams] = useSearchParams();
  const ville_params = searchParams.get("ville");
  const search_params = searchParams.get("search");
  const id_ville_params = searchParams.get("id_ville");
  const id_ville_name_params = searchParams.get("id_ville_name");
  const [search, setSearch] = useState({
    city: ville_params || id_ville_name_params || "",
    spec: search_params || "",
  });

  const citySearchContainer = useRef();
  const specSearchContainer = useRef();
  const navigate = useNavigate();
  const [city,setCity]=useState([{}])
  const [spec,setSpec]=useState([{}])
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch();
  // Fetch citys & speciality
  useEffect(() => {
    try {
      setLoading(true)
     SearchServices.getAllCities().then((res)=>{
      console.log(res.data)
        setCity(res.data)
        dispatch(setVilles(res.data))
      }).catch((error)=>{
        toast.error(error.message)
      }).finally(()=>{
        setLoading(false)
      });
      
    } catch (error) {
      toast.error(error.message)
    }
    try{

    SearchServices.getAllSpecialities().then((res)=>{
      console.log(res)
        setSpec(res.data)
        dispatch(setSpecialite(res.data))
      }).catch((error)=>{
        toast.error(error.message)
      }).finally(()=>{
        setLoading(false)
      });
    } catch (error) {
      toast.error(error.message)
    }
    window.scrollTo(0, 0);
  }, []);

  // Filter citys
  const filterSearch = (array, search, param) => {
    // Vérifie si search est un tableau
    if (!Array.isArray(search)) {
        return [];
    }

    // Normalise et met en minuscule l'array, s'il est défini
    const normalizedArray = array
        ?.toLowerCase()
        ?.normalize("NFD")
        ?.replace(/\p{Diacritic}/gu, "");

    const newArray = search.filter((item) => {
        // Vérifie si l'élément item[param] est une chaîne
        if (typeof item[param] !== 'string') {
            return false;
        }

        // Normalise et met en minuscule l'élément à comparer
        const normalizedItem = item[param]
            ?.toLowerCase()
            ?.normalize("NFD")
            ?.replace(/\p{Diacritic}/gu, "");
        
        // Vérifie si l'élément contient la chaîne de recherche normalisée
        return normalizedItem.includes(normalizedArray);
    });

    return !array ? [] : newArray;
};

  // Mark citys
  const handleSeach = (array, container) => {
    const context = container.current;
    const instance = new Mark(context);
    if (array && city) instance.unmark(array);
    if (array && city && !loading) instance.mark(array);
  };
  // Toggle search
  const toggleSeach = (e) => {
    const { name, value } = e.target;
    setSearch((x) => {
      return { ...x, [name]: value };
    });
  };
  const toggleSeachOnClick = (name, libelle) => {
    setSearch((y) => {
      return { ...y, [name]: libelle, villeName: '' };
    });
  };

  // Mark on typing
  useEffect(() => {
    handleSeach(search.city, citySearchContainer);
    handleSeach(search.spec, specSearchContainer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, city]);

  const showResult = async (e) => {
    e.preventDefault();
    var link;
    const citySelected = city?.filter(
      (element) => element.nom_ville === search.city
    )[0];
    if (search.city && !search.spec) {
      link = `/result?id_ville=${citySelected.id_ville}&id_ville_name=${search.city}&page=1`;
    }
    if (!search.city && search.spec) {
      link = `/result?search=${search.spec}&page=1`;
    }
    if (search.city && search.spec) {
      link = `/result?search=${search.spec.trim()}&ville=${search.city}&page=1`;
    }
    // Search
    comp !== "hero" && setRandomX(Math.random());
    // Toggle search Link
    link && navigate(link.trim());
  };
  return (
    <form className="search-section">
      <div>
        <img src="../../icons/search.svg" alt="" />
        <input
          type="text"
          name="spec"
          value={search.spec}
          onChange={(e) => toggleSeach(e)}
          placeholder="Médecin, établissement, spécialité"
        />
        <div className="result" ref={specSearchContainer}>
          
          {loading ? (
            <span className="loading">Loading...</span>
          ) : (
            filterSearch(search.spec, spec, "libelle")?.map((x, index) => (
              <span
                key={index}
                onClick={() => toggleSeachOnClick("spec", x.libelle)}
              >
                {x.libelle}
              </span>
            ))
          )}
        </div>
      </div>

      <div>
        <img src="../../icons/location-outline.svg" alt="" />
        <input
          type="text"
          name="city"
          onChange={(e) => toggleSeach(e)}
          value={search.city}
          placeholder="Où ?"
        />
        <div className="result" ref={citySearchContainer}>
          {loading ? (
            <span className="loading">Loading...</span>
          ) : (
            filterSearch(search.city, city, "nom_ville")?.map(
              (x, index) => (
                <span
                  key={index}
                  onClick={() => toggleSeachOnClick("city", x.nom_ville)}
                >
                  {x.nom_ville}
                </span>
              )
            )
          )}
        </div>
      </div>

      <button onClick={(e) => showResult(e)}>
        {comp === "hero" ? (
          <>
            Rechercher
            <img src="../../icons/flech-white.svg" alt="" />
          </>
        ) : (
          <img src="../../icons/search-outline.svg" alt="" />
        )}
      </button>
    </form>
  );
}

export default SearchBarDoc;
