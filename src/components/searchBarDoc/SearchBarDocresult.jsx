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
import { useTranslation } from "react-i18next";
function SearchBarDoc({ setRandomX, comp }) {

  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
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
       //console.log("villes:",res)
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
     // console.log("Les specialités: ", res)
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
    // Check if search is an array
    if (!Array.isArray(search)) {
      // If not an array, return an empty array
      return [];
    }

    const x = array && array.toLowerCase();
    const newArray = search
        .filter((item) =>
            item[param]
                ?.toLowerCase()
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "")
                .includes(x)
        );
    const y = !array ? [] : newArray;
    return y;
  };
  /*const filterSearch = (array, search, param) => {
    const x = array && array.toLowerCase();
    const newArray = search?.filter((item) =>
      item[param]
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .includes(x)
    );
    const y = !array ? [] : newArray;
    return y;
  };*/

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
    if (search.city && !search.spec && citySelected ) {
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
    <form className="search-section" >

      <div>
        <img 
          src="../../icons/search.svg" 
          alt="" 
          style={{
            position: 'absolute',
            right: localStorage.getItem("language") === "ar" ? "20px" : "460px",
          }}
        />
        <input
          type="text"
          name="spec"
          value={t(search.spec)}
          onChange={(e) => toggleSeach(e)}
          placeholder={t("searchbardoc")}
          style={{
            paddingRight: localStorage.getItem("language") === "ar" ? "55px" : "10px", 
            borderRadius: localStorage.getItem("language") === "ar" ? "0px 50px 50px 0px" : "50px 0px 0px 50px",
            border:"2px rgba(170, 170, 170, 0.20) solid"
          }}
        />
        <div className="result" ref={specSearchContainer}>
          {loading ? (
            <span className="loading">{t("Loading")}</span>
          ) : (
            filterSearch(search.spec, spec, "libelle")?.map((x, index) => (
              <span
                key={index}
                onClick={() => toggleSeachOnClick("spec", x.libelle)}
              >
                {t(x.libelle)}
              </span>
            ))
          )}
        </div>
      </div>

      <div>
        <img 
          src="../../icons/location-outline.svg"
          alt="" 
          style={{
            position: 'absolute',
            right: localStorage.getItem("language") === "ar" ? "10px" : "460px",
          }}
        />
        
        <input
          type="text"
          name="city"
          onChange={(e) => toggleSeach(e)}
          value={search.city}
          placeholder={t("where")}
          style={{
          paddingRight: localStorage.getItem("language") === "ar" ? "45px" : "10px",
          borderRadius: localStorage.getItem("language") === "ar" ?  "50px 0px 0px 50px":"0px 50px 50px 0px" ,
          border: "2px rgba(170, 170, 170, 0.20) solid"

          }}
        />
        <div className="result" ref={citySearchContainer}>
          {loading ? (
            <span className="loading">{t("Loading")}</span>
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

      <button onClick={(e) => showResult(e)}
      style={{
        //borderRadius: localStorage.getItem("language")  === "ar" ? "12px 0px 0px 12px" : "0px 12px 12px 0px",
        right: localStorage.getItem("language") === "ar" ? "735px" : "10px",

      }}
        
      >
        {comp === "hero" ? (
          <>
            {t("search")}
            
            {localStorage.getItem("language") === "ar" ? (
              
              <img src="../icons/flech-white-left.svg" alt="" />
            ) : (
              <img src="../icons/flech-white.svg" alt="" />
            )}
        
          </>

        ) : (
          <img src="/icons/search-outline.svg" alt="" />
        )}
        
      </button>
    </form>
  );
}

export default SearchBarDoc;
