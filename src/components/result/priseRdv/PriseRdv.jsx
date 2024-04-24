import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Log } from "../../../App";
import AgendaWorkDays_ from "../AgendaWorkDays_";
import Register from "../../connexion/Register";
import { addRdv } from "../../../action/Rdv";
import { useDispatch } from "react-redux";
import { setRdv, setUser } from "../../../utils/redux/GlobalSlice";
import RdvService from "../services/RdvService";
import PatientService from "../../../services/PatientService";


function PriseRdv() {
  const user = useContext(Log);
  const [isConnected, setIsConnected] = useState(user || false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
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

  const [rdvData, setRdvData] = useState({
    id: 0,
    canceledat: "", // Ensure this matches the format expected for LocalDateTime
    day: dayName || "", // Make sure dayName is compatible with DayOfWeek
    start: (start_params && start_params) || "", // Format as LocalDateTime
    end: (end_params && end_params) || "", // Format as LocalDateTime
    medecinid: id * 1,
    patientid: 0,
    statut: "CONJE", // Ensure this is a valid value for RdvStatutEnum
    modeconsultation: 0,
    isnewpatient: false, // Boolean value
    commantaire: "",
    motif: 0, // Ensure this is a valid value for MotifConsultationEnum
    LinkVideoCall: "",
    cabinet: 1
  });

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

  useEffect(() => {
    // Check validity
    const allInputs = [...inputs.current?.querySelectorAll("input")];
    const isAllValid = allInputs.some((input) => !input.checkValidity());

    // allInputs.forEach(input =>  !input.checkValidity() && console.log(input));

    // console.log(Boolean(isConnected));
    // console.log(Boolean(!isAllValid));
    // console.log(Boolean(isConnected));

    !isAllValid && rdvData.start && isConnected
      ? setConfirme(true)
      : setConfirme(false);

    // Next step on add info
    switch (step) {
      case 1:
        if (
          autoNext &&
          rdvData.motif &&
          rdvData.modeconsultation &&
          !start_params
        )
          setStep(2);
        if (
          autoNext &&
          rdvData.motif &&
          rdvData.modeconsultation &&
          start_params &&
          isConnected
        )
          setStep(3);
        if (
          autoNext &&
          rdvData.motif &&
          rdvData.modeconsultation &&
          start_params &&
          !isConnected
        )
          setStep(0);
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
          setStep(0);
        break;
      case 3:
        if (autoNext && rdvData.patientid && rdvData.isnewpatient) setStep(4);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rdvData]);

  // ---------------------

  // Get Patient proche
  useEffect(() => {
    const fetchProche = async () => {
      if (!isConnected) {
        console.log("Not connected");
        return false;
      } else {
        try {
 
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
  }, [isConnected]);
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
          toast.error(response.data?.body?.message);
        } else {
          // Show success toast and perform further actions if success is not false
          toast.success("Rendez-vous bien ajouté avec succès");
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
    setShowModal(false);
    // You might want to redirect to a login page or remove the invalid token.
  };
  return (

    <div className="prise-rdv">
      <div className="bg-close" onClick={() => navigate(-1)}></div>
      <div className="prise-rdv-wrapper">
        <>
          {step !== 0 && (
            <div className="title">
              {step > 1 && (
                <svg
                  onClick={() => step > 1 && toggleStep(-1)}
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
              {step < 4 && (
                <svg
                  onClick={() => toggleStep(+1)}
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
              <h4>Prenez votre rendez-vous en ligne</h4>
              <p>Renseignez les informations suivantes</p>
            </div>
          )}
          <div className="prise-rdv-step" ref={inputs}>
            <div className={step === 1 ? "grp-step" : "grp-step hide-step"}>
              <div className="content">
                <div className="step">
                  <div className="step-title">
                    <div className="step-number">1</div>
                    <h5>Type de consultation</h5>
                  </div>
                  <form>
                    <label htmlFor="CABINET" className="input-check-box">
                      <input
                        required
                        type="radio"
                        name="modeconsultation"
                        id="CABINET"
                        value={toggleRdv.modeconsultation}
                        onChange={toggleRdv}
                      />
                      <div className="input-doth"></div>
                      <span>Au cabinet</span>
                      <img src="../icons/cabinet.svg" alt="" />
                    </label>
                    <label htmlFor="VIDEO" className="input-check-box">
                      <input
                        required
                        type="radio"
                        name="modeconsultation"
                        id="VIDEO"
                        value={rdvData.modeconsultation}
                        onChange={toggleRdv}
                      />
                      <div className="input-doth"></div>
                      <span>En Vidéo</span>
                      <img src="../icons/video.svg" alt="" />
                    </label>
                    <label
                      htmlFor="DOMICILE"
                      className="input-check-box"
                    // className="input-check-box disable"
                    >
                      <input
                        required
                        type="radio"
                        name="modeconsultation"
                        id="DOMICILE"
                        value={rdvData.modeconsultation}
                        onChange={toggleRdv}
                      />
                      <div className="input-doth"></div>
                      <span>À Domicile</span>
                      <img src="../icons/domicile-purple.svg" alt="" />
                    </label>
                  </form>
                </div>
              </div>
              <div className="content">
                <div className="step">
                  <div className="step-title">
                    <div className="step-number">2</div>
                    <h5>Motif de consultation</h5>
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
                          {rdvData.motif === 'CONSULTATION' && '1ère Consultation'}
                          {rdvData.motif === 'CONSULTATIONSUIVIE' && 'Consultation de suivi'}
                          {rdvData.motif === 'URGENCE' && 'Urgence'}
                          {!rdvData.motif && "Choisissez un motif"}
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
                        <span onClick={toggleType} label-value='1'>1ère Consultation</span>
                        <span onClick={toggleType} label-value='2'>Consultation de suivi</span>
                        <span onClick={toggleType} label-value='3'>Urgence</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className={step === 2 ? "grp-step" : "grp-step hide-step"}>
              <div className="content">
                <div className="step">
                  <div className="step-title">
                    <div className="step-number">3</div>
                    <h5>Sélectionnez votre rendez-vous</h5>
                  </div>
                  <div className="step-agenda">
                    <AgendaWorkDays_
                      consId={1}
                      docId={id}
                      component="priseRdv"
                      state={setRdvData}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={step === 3 ? "grp-step" : "grp-step hide-step"}>
              <div className="content">
                <div className="step">
                  <div className="step-title">
                    <div className="step-number">4</div>
                    <h5>Pour qui prenez-vous ce rendez-vous ?</h5>
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
                      Ajouter un Proche
                    </button>
                  </form>
                </div>
              </div>
              <div className="content">
                <div className="step">
                  <div className="step-title">
                    <div className="step-number">5</div>
                    <h5>Avez-vous déjà consulté ce praticien ?</h5>
                  </div>
                  <form>
                    <p>
                      Si vous prenez rendez-vous pour quelqu'un d'autre, cette
                      question le concerne
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
                        <span>Oui</span>
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
                        <span>Non</span>
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
                    <h5>Informations complémentaires</h5>
                  </div>
                  <form>
                    <p>
                      Avez-vous des difficultés de santé que vous souhaitez
                      partager avec votre praticien ? (douleur thoracique,
                      difficultés respiratoires, chute de tension, stress ou
                      manque de sommeil, etc.) ?
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
                        <span>Oui</span>
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
                        <span>Non</span>
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
                        <span>Je ne sais pas</span>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
              <div className="content">
                <div className="step">
                  {!rdvData.modeconsultation === "VIDEO" && (
                    <div className="step-title">
                      <div className="step-number">7</div>
                      <h5>Mode de paiement</h5>
                    </div>
                  )}
                  <form>
                    {rdvData.modeconsultation === "VIDEO" && (
                      <div className="btns-check-payment">
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
                            <span>Carte Bancaire</span>
                          </div>
                        </label>

                        <small>Ou</small>

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
                              <span>Virement Bancaire</span>
                            </div>
                            <div className="payment-details">
                              <p>
                                <span>Nom et Prenom:</span> Mohamed Bouy
                              </p>
                              <p>
                                <span>RIB:</span> 5000 3088 9891 0930 0183 8458
                              </p>
                              <p>
                                <span>Code Swift:</span> 5000 3088
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        submit(e, isConnected, "priseRdv");
                        console.log("gfd");
                      }}
                      ref={confirmeRdvBtn}
                      className={`btn-confirm ${!confirme ? "btn-confirm-disable" : ""
                        }`}
                    >
                      {loading ? "Loading..." : "Confirmez le rendez-vous"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className={step === 0 ? `grp-step` : "grp-step hide-step"}>
              {!isConnected && <Register
                comp={"priseRdv"}
                setStep={setStep}
                setIsConnected={setIsConnected}
              />}
            </div>
          </div>
        </>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PriseRdv;
