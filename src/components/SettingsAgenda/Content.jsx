import React, { useEffect, useState } from "react";
import "./Content.scss";
import { Group } from "./components/Group";
import Model from "../Models/Model";
import { useTranslation } from "react-i18next";

export const Content = () => {
  const { t, i18n } = useTranslation();
  const [showCreneau, setShowCreneau] = useState(false);
  const [ind, setInd] = useState(0);
  const [showDropdown, setShowDropdown] = useState({ show: false, index: 0 });
  const [showDropdown2, setShowDropdown2] = useState({ show: false, index: 0 });
  const [showDropdown3, setShowDropdown3] = useState({ show: false, index: 0 });
  const [showDropdown4, setShowDropdown4] = useState(false);
  const [timeSlots, setTimeSlots] = useState([
    { startTime: "", endTime: "", duration: "" },
  ]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [checkbox3Checked, setCheckbox3Checked] = useState(false);
  const [checkbox4Checked, setCheckbox4Checked] = useState(false);
  const [checkbox5Checked, setCheckbox5Checked] = useState(false);
  const [checkbox6Checked, setCheckbox6Checked] = useState(false);
  const [checkbox7Checked, setCheckbox7Checked] = useState(false);
  const [checkbox8Checked, setCheckbox8Checked] = useState(false);
  const [select, setSelect] = useState(false);

  const handleDayClick = (index) => {
    setSelectedDay(index);
  };
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime: "", endTime: "", duration: "" }]);
  };

   const calculateTop = (index) => (select ? 514 :448) + index * 55;

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDropdown4(false);
    setSelect(true);
  };
  const handleStartTimeSelect = (time, index) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].startTime = time;
    setTimeSlots(newTimeSlots);
    setShowDropdown({ show: false, index: 0 });
  };
  const handleEndTimeSelect = (time, index) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].endTime = time;
    setTimeSlots(newTimeSlots);
    setShowDropdown2({ show: false, index: 0 });
  };
  const handleDurationSelect = (duration, index) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].duration = duration;
    setTimeSlots(newTimeSlots);
    setShowDropdown3({ show: false, index: 0 });
  };

  useEffect(() => {
    if (!showCreneau) {
      setShowDropdown({ show: false, index: 0 });
      setShowDropdown2({ show: false, index: 0 });
      setShowDropdown3({ show: false, index: 0 });
      setShowDropdown4(false);
    }
  }, [showCreneau]);

  return (
    <div
      className="contentc"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      style={{
        [i18n.language === "ar" ? "right" : "left"]: "322px",
      }}
    >
      <Group onClick={() => setShowCreneau(true)} />
      <div className="frame-3l">
        <table className="agenda-tablel">
          <thead>
            <tr
              style={{
                textAlign: i18n.language === "ar" ? "right" : "left",
              }}
            >
              <th>{t("DAY")}</th>
              <th>{t("START")}</th>
              <th>{t("END")}</th>
              <th>{t("DURATION")}</th>
              <th>{t("CATEGORY")}</th>
              <th>{t("REASON")}</th>
              <th>{t("MODE_PLACE")}</th>
            </tr>
          </thead>
          <tbody>{/* Rows would be dynamically generated here */}</tbody>
        </table>
      </div>
      <div className="framel">
        <img
          className="imgl"
          alt="Frame"
          src="https://c.animaapp.com/BGaboWTw/img/frame.svg"
        />
        <div className="frame-2l">
          <p className="vous-n-avez-aucunel">{t("NO_SLOTS_AVAILABLE")}</p>
          <div className="button-wrapperl">
            <div className="button-2l" onClick={() => setShowCreneau(true)}>
              <img src="../../icons/circleplus.svg" className="plus-circlel" />
              <div className="titre-2l">{t("ADD_SLOT")}</div>
            </div>
          </div>
        </div>
      </div>
      <Model show={showCreneau} setShow={setShowCreneau}>
        <div className="framee">
          <div className="frame-2e">
            <img
              className="icon-instance-node x-close-1 "
              src="/icons/closes.svg"
              alt=""
              onClick={() => setShowCreneau(false)}
            />
          </div>
          <div className="text-wrappere">{t("APPOINTMENT_SLOT")}</div>
          <div className="frame-3e">
            <div className="frame-4e">
              <div className="frame-5e">
                <div className="forme">
                  <div className="labele">{t("PRACTITIONERS")}</div>
                  <div
                    className="frame-6e"
                    onClick={() => setShowDropdown4(!showDropdown4)}
                  >
                    <div className="inputw input-instancee">
                      <input
                        className="placeholderr"
                        placeholder={t("CHOOSE_DOCTOR")}
                        type="text"
                        value={selectedDoctor}
                      />
                         <img
                  src="../icons/select.svg" // Remplacez cette source par celle de votre icône de recherche
                  alt="Search Icon"
                  style={{
              
                    cursor: "pointer",
                  }}
                />
                    </div>
                  </div>
                </div>
                <div className="groupq">
                  <div className="labele">{t("CATEGORY_PATIENT")}</div>
                  <div
                    className={
                      checkbox1Checked ? "overlap-2 checked" : "overlap-2"
                    }
                  >
                    <div
                      className="titre-6c"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "51px",
                      }}
                    >
                      {t("NEW_PATIENT")}
                    </div>
                    <input
                      type="checkbox"
                      className="rectangle-4e"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "17px",
                      }}
                      checked={checkbox1Checked}
                      onChange={(e) => setCheckbox1Checked(e.target.checked)}
                    />
                  </div>
                  <div
                    className={
                      checkbox2Checked ? "overlap-3 checked" : "overlap-3"
                    }
                  >
                    <div
                      className="titre-6c"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "51px",
                      }}
                    >
                      {t("FOLLOW_UP_PATIENT")}
                    </div>
                    <input
                      type="checkbox"
                      className="rectangle-4e"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "17px",
                      }}
                      checked={checkbox2Checked}
                      onChange={(e) => setCheckbox2Checked(e.target.checked)}
                    />
                  </div>
                </div>
                <div className="group-2a">
                  <div className="labele">{t("REASON_APPOINTMENT")}</div>
                  <div
                    className={
                      checkbox3Checked ? "overlap-2 checked" : "overlap-2"
                    }
                  >
                    <div
                      className="titre-6c"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "51px",
                      }}
                    >
                      {t("FIRST_CONSULTATION")}
                    </div>
                    <input
                      type="checkbox"
                      className="rectangle-4e"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "17px",
                      }}
                      checked={checkbox3Checked}
                      onChange={(e) => setCheckbox3Checked(e.target.checked)}
                    />
                  </div>
                  <div
                    className={
                      checkbox4Checked ? "overlap-3 checked" : "overlap-3"
                    }
                  >
                    <div
                      className="titre-7c"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "51px",
                      }}
                    >
                      {t("FOLLOW_UP_CONSULTATION")}
                    </div>
                    <input
                      type="checkbox"
                      className="rectangle-4e"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "17px",
                      }}
                      checked={checkbox4Checked}
                      onChange={(e) => setCheckbox4Checked(e.target.checked)}
                    />
                  </div>
                  <div
                    className={
                      checkbox5Checked ? "overlap-4 checked" : "overlap-4"
                    }
                  >
                    <div
                      className="titre-8c"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "51px",
                      }}
                    >
                      {t("EMERGENCY")}
                    </div>
                    <input
                      type="checkbox"
                      className="rectangle-4e"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "17px",
                      }}
                      checked={checkbox5Checked}
                      onChange={(e) => setCheckbox5Checked(e.target.checked)}
                    />
                  </div>
                </div>
                <div className="group-2a">
                  <div className="labele">{t("CONSULTATION_MODE")}</div>
                  <div
                    className={
                      checkbox6Checked ? "overlap-2 checked" : "overlap-2"
                    }
                  >
                    <div
                      className="titre-10c"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "51px",
                      }}
                    >
                      {t("OFFICE")}
                    </div>
                    <img
                      className="img-2x"
                      alt="Maki doctor"
                      src="https://c.animaapp.com/nRbSI0ip/img/maki-doctor-15.svg"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "282px",
                      }}
                    />
                    <input
                      type="checkbox"
                      className="rectangle-4e"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "17px",
                      }}
                      checked={checkbox6Checked}
                      onChange={(e) => setCheckbox6Checked(e.target.checked)}
                    />
                  </div>
                  <div
                    className={
                      checkbox7Checked ? "overlap-3 checked" : "overlap-3"
                    }
                  >
                    <div
                      className="titre-11c"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "51px",
                      }}
                    >
                      {t("VIDEO")}
                    </div>
                    <img
                      className="img-2x"
                      alt="Videocam outline"
                      src="https://c.animaapp.com/nRbSI0ip/img/videocam-outline.svg"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "282px",
                      }}
                    />
                    <input
                      type="checkbox"
                      className="rectangle-4e"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "17px",
                      }}
                      checked={checkbox7Checked}
                      onChange={(e) => setCheckbox7Checked(e.target.checked)}
                    />
                  </div>
                  <div
                    className={
                      checkbox8Checked ? "overlap-4 checked" : "overlap-4"
                    }
                  >
                    <div
                      className="titre-12c"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "51px",
                      }}
                    >
                      {t("HOME")}
                    </div>
                    <img
                      className="img-2x"
                      alt="Home outline"
                      src="https://c.animaapp.com/nRbSI0ip/img/home-outline.svg"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "282px",
                      }}
                    />
                    <input
                      type="checkbox"
                      className="rectangle-4e"
                      style={{
                        [i18n.language === "ar" ? "right" : "left"]: "17px",
                      }}
                      checked={checkbox8Checked}
                      onChange={(e) => setCheckbox8Checked(e.target.checked)}
                    />
                  </div>
                </div>
              </div>
              <div className="frame-5e">
                {select && (
                  <div className="frame-7e">
                    <div className="divd">
                      <div className="groupd">
                        <img
                          className="cardiologued"
                          alt="Cardiologue"
                          src="../../images/group.png"
                        />
                      </div>
                      <div className="descd">
                        <div className="naamed">
                          <div className="text-wrapperd">Dr Mohamed Bouy</div>
                          <div className="text-wrapper-2d">
                            Médecin généraliste
                          </div>
                        </div>
                        <div className="div-2d">
                          <div className="addressd">
                            <img
                              className="icon-instance-noded"
                              alt="Ellipse"
                              src="../../icons/location.svg"
                            />
                            <p className="pd">
                              33 Rue Najib Mahfoud, Casablanca 20000
                            </p>
                          </div>
                          <div className="div-3d">
                            <div className="address-2d">
                              <img
                                className="icon-instance-nodedd"
                                alt="Ellipse"
                                src="../../icons/phone.svg"
                              />
                              <div className="text-wrapper-3d">0547829111</div>
                            </div>
                            <div className="address-2d">
                              <img
                                className="icon-instance-nodedd"
                                alt="Ellipse"
                                src="../../icons/mail.svg"
                              />
                              <div className="text-wrapper-3d">
                                Démos@clinital.io
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!select && (
                  <div className="frame-7e">
                    <img
                      className="ellipsee"
                      alt="Ellipse"
                      src="https://c.animaapp.com/nRbSI0ip/img/ellipse-7.svg"
                    />
                    <div className="text-wrapper-2e">{t("DOCTOR")}</div>
                  </div>
                )}
                <div className="frame-8e">
                  <div className="titre-13c">{t("SCHEDULE")}</div>
                  <div className="frame-9e">
                    <div className="dayy">
                      {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                        <div
                          key={day}
                          className={`titre-wrapperc ${
                            selectedDay === day ? "selectedd" : ""
                          }`}
                          onClick={() => handleDayClick(day)}
                        >
                          <div
                            className={`titre-14c ${
                              selectedDay === day ? "selectedd" : ""
                            }`}
                          >
                            {["L", "M", "M", "J", "V", "S", "D"][day]}
                          </div>
                        </div>
                      ))}
                    </div>
                    {timeSlots.map((slot, index) => (
                      <div key={index} className="frame-10e">
                        <div className="frame-11e">
                          <div
                            className="div-wrappere"
                            onClick={() => {
                              setInd(index);
                              setShowDropdown({
                                show: !showDropdown.show,
                                index,
                              });
                            }}
                          >
                            <div className="titre-15c"> {slot?.startTime  || t("STA")}</div>
                          </div>
                          <div className="titre-16c">{t("TO")}</div>
                          <div
                            className="frame-12e"
                            onClick={() => {
                              setInd(index);
                              setShowDropdown2({
                                show: !showDropdown2.show,
                                index,
                              });
                            }}
                          >
                            <div className="titre-15c">   {slot?.endTime || t("EN")}</div>
                          </div>
                        </div>
                        <div className="titre-17c">{t("DURATION1")}</div>
                        <div
                          className="frame-13e"
                          onClick={() => {
                            setInd(index);
                            setShowDropdown3({
                              show: !showDropdown3.show,
                              index,
                            });
                          }}
                        >
                          <div className="titre-15c">
                       
                          {slot?.duration   || t("DURATION1")}   
                             
                      </div>
                        </div>
                      </div>
                    ))}
                    <div className="frame-14e" onClick={addTimeSlot}>
                      <div className="titre-18c">{t("ADD_SCHEDULE")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: 660,
                height: 0,
                border: "1px rgba(170, 170, 170, 0.20) solid",
              }}
            ></div>
            <div className="frame-2e">
              <div className="buttonnn inverted default  shadow-false button-instances" onClick={()=>setShowCreneau(false)}>
                <div className="divn design-component-instance-node">
                  <div className="titrec button-2s">{t("CANCEL")}</div>
                </div>
              </div>
              <div className="buttonnn default  blue shadow-false button-3s">
                <div className="divn button-4s">
                {i18n.language === "ar" ? (
            <>
              <div className="titrec ">{t("VALIDATE")}</div>
              <img
                src="../../icons/flech-white-left.svg"
                alt="send"
                  className="arrow-rightr"
                  style={{
                    height: "14px",
                    width: "14px",
                  }}
              />
            
            </>
          ) : (
            <>
              <div className="titrec ">{t("VALIDATE")}</div>
              <img
                src="../../icons/flech-white.svg"
                alt="send"
                className="arrow-rightr"
              />
            </>
          )}
                 
                </div>
              </div>
            </div>
          </div>
          {showDropdown.show && showDropdown.index === ind && (
            <div className="dropdown" style={{ top: `${calculateTop(ind)}px`,
            [i18n.language === "ar" ? "right" : "left"]: "375px",
             }}>
              {[
                "08:45",
                "09:00",
                "09:45",
                "10:00",
                "10:15",
                "10:30",
                "10:45",
              ].map((time, index) => (
                <div key={index} className="div-wrapper-2drop" onClick={() => handleStartTimeSelect(time, ind)}>
                  <div className="text-wrapper-5drop">{time}</div>
                </div>
              ))}
            </div>
          )}
          {showDropdown2.show && showDropdown2.index === ind && (
            <div
              className="dropdown2"
              style={{ top: `${calculateTop(ind)}px`
              ,
              [i18n.language === "ar" ? "right" : "left"]: "473px", }}
            >
              {[
                "08:45",
                "09:00",
                "09:15",
                "09:30",
                "09:45",
                "10:00",
                "10:15",
                "10:30",
              ].map((time, index) => (
                <div key={index} className="div-wrapper-2drop"onClick={() => handleEndTimeSelect(time, ind)} >
                  <div className="text-wrapper-5drop">{time}</div>
                </div>
              ))}
            </div>
          )}
          {showDropdown3.show && showDropdown3.index === ind && (
            <div
              className="dropdown3"
              style={{ top: `${calculateTop(ind)}px`   ,
              [i18n.language === "ar" ? "right" : "left"]: "600px", }}
            >
              {[
             
                `15 ${t("MINUTES")}`,
                `30 ${t("MINUTES")}`,
                `45 ${t("MINUTES")}`,
                `${t("60_MINUTES")}`,
                `${t("1H15_MINUTES")}`,
                `${t("1H30_MINUTES")}`,
                `${t("1H45_MINUTES")}`
              ].map((duration, index) => (
                <div key={index} className="div-wrapper-2drop" onClick={() => handleDurationSelect(duration, ind)}>
                  <div className="text-wrapper-5drop">{duration}</div>
                </div>
              ))}
            </div>
          )}
          {showDropdown4 && (
            <div
              className="dropdown4"
              style={{
                [i18n.language === "ar" ? "right" : "left"]: "30px",
              }}
            >
              <div className="framem">
                <div className="inputd">
                  <div className="placeholderd">{t("SEARCH_DOCTOR")}</div>
                  <svg
                    className="search-mdd"
                    fill="none"
                    height="21"
                    viewBox="0 0 21 21"
                    width="21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="path"
                      d="M18.375 18.375L14.5687 14.5687M16.625 9.625C16.625 13.491 13.491 16.625 9.625 16.625C5.75901 16.625 2.625 13.491 2.625 9.625C2.625 5.75901 5.75901 2.625 9.625 2.625C13.491 2.625 16.625 5.75901 16.625 9.625Z"
                      stroke="#A9ACB0"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <div className="div-wrapperd">
                <div
                  className="text-wrapperd"
                  onClick={() => handleDoctorSelect("Dr Mohamed Bouy")}
                >
                  Dr. Mohamed Bouy
                </div>
              </div>
            </div>
          )}
        </div>
      </Model>
    </div>
  );
};
