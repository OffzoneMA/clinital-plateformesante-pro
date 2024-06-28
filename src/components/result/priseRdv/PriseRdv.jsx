import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Log } from "../../../App";
import AgendaWorkDays_ from "../AgendaWorkDays_";
import Register from "../../connexion/Register";
import Login from "../../connexion/Login";
import { addRdv } from "../../../action/Rdv";
import { getScheduleByCreno } from "../../../action/Rdv";
import { useDispatch, useSelector } from "react-redux";
import { setRdv, setLoginToggle, setPriseRdvToggle} from "../../../utils/redux/GlobalSlice";
import RdvService from "../services/RdvService";
import PatientService from "../../../services/PatientService";
import { useTranslation } from "react-i18next";
function PriseRdv() {
  //const user = useContext(Log);
  const { t } = useTranslation();
  const language = localStorage.getItem("language");
  const user=useSelector((state)=>state.global.user);
  console.log("USER : "+user?.token);
  const priserdvtoggle =useSelector((state)=>state.global.priserdvtoggle);
  const [isConnected, setIsConnected] = useState(user || false);
  console.log("isConnected : "+isConnected);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const end_params = searchParams.get("end");
  // const availableSlot_params = searchParams.get("availableSlot");
  const start_params = searchParams.get("start");
  const id = searchParams.get("id");
  const dayName = searchParams.get("day");
  const select_container = useRef();
  const inputs = useRef();
  const confirmeRdvBtn = useRef();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [autoNext, setAutoNext] = useState(true);
  const [confirme, setConfirme] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allProche, setAllProche] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [cabinetinfo, setCabinetinfo] = useState([]);
  const [medmoyenpaiement, setMedmoyenpaiement] = useState([]);

  const [rdvData, setRdvData] = useState({
    id: 0,
    canceledat: "", // Ensure this matches the format expected for LocalDateTime
    day: dayName || "", // Make sure dayName is compatible with DayOfWeek
    // start: (start_params && start_params) || "", // Format as LocalDateTime
    // end: (end_params && end_params) || "", // Format as LocalDateTime
    start: start_params ? start_params : "", // Format as LocalDateTime new Date(start_params)
    end: end_params ? end_params : "", // Format as LocalDateTime

    medecinid: id * 1,
    patientid: 0,
    statut: "ENATTENTE", // Ensure this is a valid value for RdvStatutEnum
    modeconsultation: searchParams.get("modeconsultation") || 0,
    isnewpatient: false, // Boolean value
    commantaire: "",
    motif: searchParams.get("motif") || 0, // Ensure this is a valid value for MotifConsultationEnum
    LinkVideoCall: "",
    cabinet: 1
  });

    // Fonction pour récupérer l'agenda lors du clic sur un créneau
    useEffect(() => {
      const handleSlotSelection = async () => {
        try {
          await getScheduleByCreno(rdvData.start, id, rdvData.day, setSchedule);
        } catch (error) {
          toast.error(error.message);
        }
      };
    
      if (rdvData.start && id && rdvData.day) {
        handleSlotSelection();
      }
    }, [rdvData.start, id, rdvData.day]);
  
 
  //----------------------------------------------------------------
 
  /*useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await RdvService.getMedecinById(rdvData.medecinid);
        if (response.status === 200) {
          setMedmoyenpaiement(response.data.moyenPaiement);
        } else {
          setMedmoyenpaiement([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données du médecin :", error);
      }
    };

    if (isConnected && rdvData.medecinid) {
      fetchPaymentMethods(); // Récupérer les méthodes de paiement après la connexion
    }
  }, [isConnected, rdvData.medecinid]);

  console.log(medmoyenpaiement)*/
useEffect(() => {
  
    if (isConnected && id) {
      try {

        RdvService.getMedecinById(id)
          .then((responsem) => {
            if (responsem.status === 200) {
              console.log(responsem.data.moyenPaiement);
              setMedmoyenpaiement(responsem.data.moyenPaiement);
            }
            else {
                setMedmoyenpaiement(null); 
              }
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des données du med :", error);
          });
      } catch (error) {
        console.error("Une exception s'est produite lors de la récupération des données du med :", error);
      }
    }
}, [id,isConnected]);
  //----------------------------------------------------------------
   
  // Set next step
  const toggleStep = (y) => {
    setStep((x) => x + y);
    y === -1 && setAutoNext(false);
  };
  // Set motif Consultation value
  const toggleType = (e) => {
    const atr = e.target.getAttribute('label-value')
    setRdvData((x) => {
      return { ...x, motif: atr === "1" ? 1 : atr === "2" ? 2 : atr === "3" ? 3 : "" };
    });
  }

  const toggleMode = (e) => {
    const atr = e.target.getAttribute('label-value')
    setRdvData((x) => {
      return { ...x, modeconsultation: atr === "CABINET" ? 1 : atr === "VIDEO" ? 2 : atr === "DOMICILE" ? 3 : "" };
    });
  }
  // Get data from inputs
  const toggleRdv = (e) => {
    const { name, value, type, id } = e.target;
    
    setRdvData((x) => {
      return {
        ...x,
        [name]:
          id === "CABINET"
            ? 1
            : id === "VIDEO"
              ? 2
              : id === "DOMICILE"
                ? 3
                : name === "patientid"
                  ? Number(id)
                  : type === "radio"
                    ? id
                    : value,
      };
    });
  };

  // useEffect(()=>{
  //   if(priserdvtoggle === 3){
  //     window.location.reload();
  //     dispatch(setPriseRdvToggle(1));
  //   }
      
  // },[priserdvtoggle]);
useEffect(()=>{
  if(!isConnected && step===3){
    dispatch(setLoginToggle(true));
    handleCloseModal();
   }
  //  if(isConnected && step===3){
  //   window.location.reload();
  //  }
    
},[isConnected, step]);

  useEffect(() => {
    // Check validity
    const allInputs = [...inputs.current?.querySelectorAll("input")];
    const isAllValid = allInputs.some((input) => !input.checkValidity());
   
    // allInputs.forEach(input =>  !input.checkValidity() && console.log(input));
   //console.log(Boolean(isConnected));
    // console.log(Boolean(!isAllValid));

    !isAllValid && rdvData.start && isConnected && rdvData.modeconsultation && rdvData.motif
      ? setConfirme(true)
      : setConfirme(false);

    // Next step on add info
    switch (step) {
      case 1:
        // if (
        //   autoNext &&
        //   rdvData.motif &&
        //   rdvData.modeconsultation &&
        //   start_params &&
        //   !isConnected
        // )
        //   console.log("case 1, to step 0");

        // //setStep(0);
        if (
          autoNext &&
          !rdvData.motif &&
          !rdvData.modeconsultation &&
          start_params &&
          isConnected
        )
          console.log("case 1, to step 2");
          setStep(2);

        if(autoNext &&
          !rdvData.motif &&
          !rdvData.modeconsultation &&
          !start_params)
          setStep(1);
        if (
          autoNext &&
          rdvData.motif &&
          rdvData.modeconsultation &&
          start_params &&
          isConnected
        )
          setStep(3);
        
        break;
      case 2:
        if (
          autoNext &&
          rdvData.start &&
          rdvData.end &&
          rdvData.canceledat &&
          isConnected
        )
          setStep(3);
        if (
          autoNext &&
          rdvData.start &&
          rdvData.end &&
          rdvData.canceledat &&
          !isConnected
        )
          //setLoginToggle(true);
          setStep(0);
        break;
      case 3:
        if (isConnected && autoNext && rdvData.patientid && rdvData.isnewpatient) setStep(4);
        break;
      default:
        break;
    }
    // Update URL with motif and modeconsultation if they are filled
    if (rdvData.motif && rdvData.modeconsultation) {
      searchParams.set('motif', rdvData.motif);
      searchParams.set('modeconsultation', rdvData.modeconsultation);
      setSearchParams(searchParams);
    }
    //condition si availity 
    if(rdvData.start && rdvData.end && !searchParams.get("start") && !searchParams.get("start") ){
      searchParams.set('start', rdvData.start);
      searchParams.set('end', rdvData.end);
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rdvData]);

  // ---------------------

  // Get Patient proche
  useEffect(() => {
    //window.location.reload();
    const fetchProche = async () => {
      //window.location.reload();
      if (user===null) {
        console.log("Not connected");
        return false;
      } else {
        //window.location.reload();
        try {

          console.log(user?.token)
          PatientService.getAllProche()
          .then((response)=>{
            if(response.status===200){
              setAllProche(response.data);
            }
          }).catch((error)=>{
            toast.error(error.message)
          })
          .finally(()=>{

          })
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchProche();
  }, [user]);
  // Add rdv
  const submit = async (e, user, comp) => {
    e.preventDefault();
    if (!confirme) {
      toast.error("Data not confirmed");
      setStep(1);
      return false;
    }
    const payload = {
      ...rdvData,
      commantaire: rdvData.commantaire === "false" ? "false" : "rdvData.commantaire" === "true" ? "true" : "test",
      isnewpatient: rdvData.isnewpatient === "non-consulte" ? false : rdvData.isnewpatient === "oui-consulte" ? true : rdvData.isnewpatient
    }
    console.log(rdvData);
    RdvService.addRdv(payload)
      .then((response) => {
        if (response.data?.body?.success === false) {
          // Show error toast if success is false
          if(response.data?.body?.message=="You have already an other RDV "){
            const rdvDataString = JSON.stringify(payload);
            const responseBodyString = JSON.stringify(response.data?.body?.obj);
            //dispatch(setRdv(rdvData));
            navigate(`/rdvdejapris?rdv1=${rdvDataString}&rdv2=${responseBodyString}`);
            //navigate(`/rdvdejapris?rdv1=${rdvData}&rdv2=${response.data?.body?.obj}`);
          }else{
            toast.error(response.data?.body?.message);
          }
          
        } else {
          // Show success toast and perform further actions if success is not false
          toast.success(t("rdvAddSuccess"));  
          dispatch(setRdv(response.data?.body));
          navigate(`/rdv/${response.data?.body.id}`);
        }

      }).catch((error) => {
        console.log("error");
        toast.error(error)
      }).finally(() => {

      })


  };

  // ---------------------
  const [showModal, setShowModal] = useState(true);
  const handleCloseModal = () => {
    console.log("prise rdv toggle");
    dispatch(setPriseRdvToggle(false));
    //setShowModal(false);
    // You might want to redirect to a login page or remove the invalid token.
  };
  return (
    priserdvtoggle && (
    <div className="prise-rdv" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
      <div className="bg-close" onClick={() => navigate(-1)}></div>
          <div className="prise-rdv-wrapper">
          <>
            {step !== 0 && (
              <div className="title">
                {(step > 1 || (language === "ar" && step < 4)) && (
                  <svg
                    onClick={() => {
                      if (language === "ar") {
                        step < 4 && toggleStep(+1);
                      } else {
                        step > 1 && toggleStep(-1);
                      }
                    }}
                    //step > 1 && toggleStep(-1)}
                    className="left"
                    width="11"
                    height="18"
                    viewBox="0 0 11 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 1.6875L9.3125 9L2 16.3125"
                      stroke="white"
                      strokeWidth="2.4375"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {(step < 4 || (language === "ar" && step > 1)) && (
                  <svg
                    onClick={() => {
                      if (language === "ar") {
                        step > 1 && toggleStep(-1);
                      } else {
                        step < 4 && toggleStep(+1);
                      }
                    }}
                    //toggleStep(+1)}
                    className="right"
                    width="11"
                    height="18"
                    viewBox="0 0 11 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 1.6875L9.3125 9L2 16.3125"
                      stroke="white"
                      strokeWidth="2.4375"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <h4>{t("getRdvRemote")}</h4>
                <p>{t("remplirInfos")}</p>
              </div>
            )}
            <div className="prise-rdv-step" ref={inputs}>
            <div className={step === 0 ? `grp-step` : "grp-step hide-step"}>
                {!isConnected && 
                //setLoginToggle(true)
                //navigate('loginRdv')
                <Login />
                // <Register
                //   comp={"priseRdv"}
                //   setStep={setStep}
                //   setIsConnected={setIsConnected}
                // />
                }
              </div>
              {!start_params && (
                <div className={step === 1 ? "grp-step" : "grp-step hide-step"}>
                <div className="content">
                  <div className="step">
                    <div className="step-title">
                      <div className="step-number">1</div>
                      <h5>{t("selectRdv")}</h5>
                    </div>
                    <div className="step-agenda">
                      <AgendaWorkDays_
                        consId={1}
                        docId={id}
                        component={"priseRdv"}
                        state={setRdvData}
                        //onSlotSelection={handleSlotSelection()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              )}
              
              <div className={step === 2 ? "grp-step" : "grp-step hide-step"}>
                <div className="content">
                  <div className="step">
                    <div className="step-title">
                      <div className="step-number">2</div>
                      <h5>{t("typeConsultation")}</h5>
                    </div>
                    <form>
                      {schedule.modeconsultation && schedule.modeconsultation.map(mode => (
                        <label key={mode.id_mode} htmlFor={mode.mode} className="input-check-box">
                        <input
                          //required
                          type="radio"
                          name="modeconsultation"
                          id={mode.mode}
                          value={rdvData.modeconsultation || mode.id}
                          //checked={rdvData.modeconsultation === mode.id}
                          label-value={mode.mode}
                          onChange={toggleMode}
                        />
                        <div className="input-doth"></div>
                        <span>
                          {mode.mode === "CABINET" && t("auCabinet")}
                          {mode.mode === "VIDEO" && t("enVideo")}
                          {mode.mode === "DOMICILE" && t("aDomicile")}
                        </span>
                        {mode.mode === "CABINET" && <img src="../../../icons/cabinet.svg" alt="" />}
                        {mode.mode === "VIDEO" && <img src="../../../icons/video.svg" alt="" />}
                        {mode.mode === "DOMICILE" && <img src="../../../icons/domicile-purple.svg" alt="" />}
                      </label>
                      ))}
                     
                    </form>
                  </div>
                </div>
                <div className="content">
                  <div className="step">
                    <div className="step-title">
                      <div className="step-number">3</div>
                      <h5>{t("motifConsultation")}</h5>
                    </div>
                    <form>
                      <div
                        ref={select_container}
                        className="select-consultation"
                        onClick={() =>
                          select_container.current.classList.toggle("open-select")
                        }
                      >
                        <div className="value">
                          <p
                            style={
                              rdvData.motif
                                ? { opacity: 1 }
                                : { opacity: 0.5 }
                            }
                          >
                            {rdvData.motif ===1 && t('1consult')}
                            {rdvData.motif ===2 && t('suiviConsult')}
                            {rdvData.motif ===3 && t('suiviConsult')}
                            {!rdvData.motif && t("choisirMotif")}
                          </p>
                          <svg
                            width="11"
                            height="7"
                            viewBox="0 0 11 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.79444 5.79444L0.868869 1.86887C0.17921 1.17921 0.667657 0 1.64298 0H9.49412C10.4694 0 10.9579 1.17921 10.2682 1.86887L6.34266 5.79444C5.91513 6.22197 5.22197 6.22197 4.79444 5.79444Z"
                              fill="#AAAAAA"
                            />
                          </svg>
                        </div>
                        <div className="options">
                        {schedule.motifConsultation && schedule.motifConsultation.map(motif => (
                          <span onClick={toggleType} label-value={motif.id_motif}>
                            {motif.motif === "CONSULTATION" && t('1consult')}
                            {motif.motif === "CONSULTATIONSUIVIE" && t('suiviConsult')}
                            {motif.motif === "URGENCE" && t('suiviConsult')}
                            </span>
                        ))}
                          {/* <span onClick={toggleType} label-value='1'>1ère Consultation</span>
                          <span onClick={toggleType} label-value='2'>Consultation de suivi</span>
                          <span onClick={toggleType} label-value='3'>Urgence</span> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
             
              <div className={step === 3 ? "grp-step" : "grp-step hide-step"}>
                <div className="content">
                  <div className="step">
                    <div className="step-title">
                      <div className="step-number">4</div>
                      <h5>{t("quiRdv")}</h5>
                    </div>
  
                    <form>
                      {allProche.map((proche, index) => (
                        <label
                          key={index}
                          htmlFor={proche.id}
                          className="input-check"
                        >
                          <input
                            required
                            onChange={toggleRdv}
                            value={rdvData.patient}
                            type="radio"
                            name="patientid"
                            id={proche.id}
                          />
                          <div className="input-doth"></div>
                          <span>{`${proche.nom_pat} ${proche.prenom_pat}`}</span>
                        </label>
                      ))} 
                      {/* <label htmlFor="fatima" className="input-check">
                        <input
                          required
                          onChange={toggleRdv}
                          value={rdvData.patient}
                          type="radio"
                          name="patient"
                          id="fatima"
                        />
                        <div className="input-doth"></div>
                        <span>Fatima Zahra ARES</span>
                      </label>
                      <label htmlFor="mohamed" className="input-check">
                        <input
                          required
                          onChange={toggleRdv}
                          value={rdvData.patient}
                          type="radio"
                          name="patient"
                          id="mohamed"
                        />
                        <div className="input-doth"></div>
                        <span>Mohamed ARES</span>
                      </label> */}
                      <button
                        className="btn-blue"
                        onClick={(e) => e.preventDefault()}
                      >
                        {t("addProche")}
                      </button>
                    </form>
                  </div>
                </div>
                <div className="content">
                  <div className="step">
                    <div className="step-title">
                      <div className="step-number">5</div>
                      <h5>{t("dejaConsultMed")}</h5>
                    </div>
                    <form>
                      <p>
                        {t("siOuiQuestion")}
                      </p>
                      <div className="btns-check">
                        <label htmlFor="oui-consulte">
                          <input
                            required
                            onChange={toggleRdv}
                            value={rdvData.isnewpatient}
                            type="radio"
                            name="isnewpatient"
                            id="oui-consulte"
                          />
                          <span>{t("oui")}</span>
                        </label>
                        <label htmlFor="non-consulte">
                          <input
                            required
                            onChange={toggleRdv}
                            value={rdvData.isnewpatient}
                            type="radio"
                            name="isnewpatient"
                            id="non-consulte"
                          />
                          <span>{t("non")}</span>
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className={step === 4 ? `grp-step` : "grp-step hide-step"}>
                {/* Step 3 */}
                <div className="content">
                  <div className="step">
                    <div className="step-title">
                      <div className="step-number">6</div>
                      <h5>{t("suppInfos")}</h5>
                    </div>
                    <form>
                      <p>
                       {t("difficulteSante")}
                      </p>
                      <div className="input-alinged-input">
                        <label htmlFor='true' className="input-check">
                          <input
                            required
                            onChange={toggleRdv}
                            value={rdvData.commantaire}
                            type="radio"
                            name="commantaire"
                            id='true'
                          />
                          <div className="input-doth"></div>
                          <span>{t("oui")}</span>
                        </label>
                        <label htmlFor='false' className="input-check">
                          <input
                            required
                            onChange={toggleRdv}
                            value={rdvData.commantaire}
                            type="radio"
                            name="commantaire"
                            id='false'
                          />
                          <div className="input-doth"></div>
                          <span>{t("non")}</span>
                        </label>
                        <label htmlFor="non-info" className="input-check">
                          <input
                            required
                            onChange={toggleRdv}
                            value={rdvData.commantaire}
                            type="radio"
                            name="commantaire"
                            id="non-info"
                          />
                          <div className="input-doth"></div>
                          <span>{t("neSaisPas")}</span>
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="content">
                  <div className="step">
                    {rdvData.modeconsultation === 2 && (
                      <div className="step-title">
                        <div className="step-number">7</div>
                        <h5>{t("modePaiement")}</h5>
                      </div>
                    )}
                    <form>
                      {rdvData.modeconsultation ===2 && (
                      <div className="btns-check-payment">
                         
                        {medmoyenpaiement.map((moyen, index) => (
                          <React.Fragment key={index}>
                            {moyen.type.includes('Credit') && (
                              <label htmlFor="carte-bancaire">
                                <input
                                  required
                                  onChange={toggleRdv}
                                  value={rdvData.methodPayment}
                                  type="radio"
                                  id="carte-bancaire"
                                  name="methodPayment"
                                />
                                <div>
                                  <img src="../../icons/bank-card.svg" alt="" />
                                  <span>{t("carteBank")}</span>
                                </div>
                              </label>
                            )}

                            
                            {moyen.type.includes('Virement bancaire') && (
                            <>
                              {medmoyenpaiement.some(m => m.type.includes('Credit')) && <small>Ou</small>}

                              <label htmlFor="virement">
                                <input
                                  required
                                  onChange={toggleRdv}
                                  value={rdvData.methodPayment}
                                  type="radio"
                                  id="virement"
                                  name="methodPayment"
                                />
                                <div>
                                  <div>
                                    <img src="../../icons/virement.svg" alt="" />
                                      <span>{t("banktransfer") }</span>
                                  </div>
                              
                                  {schedule.cabinet && schedule.cabinet.paymentInfo && (
                                    <div className="payment-details">
                                      <p>
                                        <span>{t("AccountHolderName")} : </span> {schedule.cabinet.paymentInfo.intituleCompte}
                                      </p>
                                      <p>
                                          <span>{t("BankAccountDetails")}: </span> {schedule.cabinet.paymentInfo.rib}
                                      </p>
                                      <p>
                                          <span>{t("SWIFTCode")} :</span> {schedule.cabinet.paymentInfo.codeSwift}
                                      </p>
                                    </div>
                                  )}

                                </div>
                              </label>
                              </>
                            )}
                          </React.Fragment>
                        ))}
                          
                        {medmoyenpaiement.length === 0 && (
                          <p>Aucun moyen de paiement disponible.</p>
                        )}
                      </div>
                    )}

                      <button
                        onClick={(e) => {
                          submit(e, isConnected, "priseRdv");
                          //console.log("gfd");
                        }}
                        ref={confirmeRdvBtn}
                        className={`btn-confirm ${!confirme ? "btn-confirm-disable" : ""
                          }`}
                      >
                        {loading ? "Loading..." : t("confirmRdv")}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
             
            </div>
          </>
        </div>
    
      <ToastContainer />
       {/* <Routes>
        <Route path="loginRdv" element={ 
          <Register
                comp={"priseRdv"}
                setStep={setStep}
                setIsConnected={setIsConnected}
              />} />
      </Routes>  */}
    </div>
   )
    

    
  );
}

export default PriseRdv;