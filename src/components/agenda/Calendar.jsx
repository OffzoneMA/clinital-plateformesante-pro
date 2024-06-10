import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MonthCalendar from "./MonthCalendar";
import RdvItemAgenda from "./RdvItemAgenda";
import CONSTANTS from "../../constant/constant";
import "../../pages/agenda/agenda.scss";

function Calendar({ rdvs, setAgendaIsChanging }) {
  const daysMain = useRef();
  const daysContainer = useRef();
  const [option, setOption] = useState("week");
  const [onChangeMonth, setOnChangeMonth] = useState();
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const toggleOption = (option) => () => setOption(option);

  // Time functions-----------
  const getMondayOfCurrentWeek = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;

    const monday = new Date(today.setDate(first));
    return monday;
  };
  const getAllDaysOfWeek = (current) => {
    var week = [];
    // Starting Monday not Sunday
    current.setDate(current.getDate() - current.getDay() + 1);
    for (var i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  };
  const getNextDay = (current, index) => {
    return new Date(current.setDate(current.getDate() + index));
  };
  // ----------------------

  // The monday of the week
  const thisMonday = getMondayOfCurrentWeek();

  // Generate week
  const [weekCont, setWeekCont] = useState(0);
  const weeks = [
    getAllDaysOfWeek(getNextDay(thisMonday, 7 * weekCont * -2)),
    getAllDaysOfWeek(getNextDay(thisMonday, 7 * weekCont * 1)),
  ];
  // -------------

  // Generate Days
  const [daysCont, setDaysCont] = useState(0);
  const days = [
    [getNextDay(new Date(), daysCont - 1)],
    [getNextDay(new Date(), daysCont)],
  ];
  // -------------

  // Toggle week & generate animation
  const nextOrPrev = (way) => () => {
    option === "week" && setWeekCont((x) => x - way);
    option === "day" && setDaysCont((x) => x + way);
    setAgendaIsChanging(Math.random());

    if (option === "month") {
      const prevBth = document.querySelector(
        ".react-calendar__navigation__prev-button"
      );
      const nextBth = document.querySelector(
        ".react-calendar__navigation__next-button"
      );
      way === -1 && prevBth.click();
      way === 1 && nextBth.click();
      // makeSomeChanges();
      setOnChangeMonth(Math.random());
    }

    // const scrollFun =
    //   option === "day"
    //     ? days
    //     : option === "week"
    //     ? weeks
    //     : option === "month"
    //     ? ""
    //     : "";
    if (option !== "month") {
      const prevWeek = daysContainer.current.querySelector(".prevWeek");
      const currentWeek = daysContainer.current.querySelector(".currentWeek");
      const prevWeekDay = daysMain.current.querySelector(".prevWeekDay");
      const currentWeekDay = daysMain.current.querySelector(".currentWeekDay");
      const rdvs = [...daysMain.current.querySelectorAll(".rdv-item")];

      prevWeek.style = `animation: ${
        way === -1 ? "hideLeft" : "hideRight"
      } 200ms forwards `;
      currentWeek.style = `animation: ${
        way === -1 ? "showWeekLeft" : "showWeekRight"
      } 200ms forwards `;
      prevWeekDay.style = `animation: ${
        way === -1 ? "hideLeft" : "hideRight"
      } 200ms forwards `;
      currentWeekDay.style = `animation: ${
        way === -1 ? "showWeekLeft" : "showWeekRight"
      } 200ms forwards `;
      rdvs.forEach(
        (rdv) => (rdv.style = `animation: rdvShow 400ms forwards ease`)
      );
    }
  };
  // Remove animation
  const removeAnimation = (e) => e.target.style = "animation: none;";

  const rdvType = (rdv) => {
    const today = new Date().getTime();
    const tomorrow_ = new Date(new Date());
    const rdvStart = new Date(rdv.start).getTime();
    const tomorrow = tomorrow_.setDate(tomorrow_.getDate() + 1);
    var isClass;
    rdvStart > tomorrow && (isClass = "normal-rdv");
    rdvStart < tomorrow && today < rdvStart && (isClass = "close-rdv");
    today > rdvStart && (isClass = "passed-rdv");
    today > rdvStart && rdv.statut === CONSTANTS.RDV_STATE.ANNULE && (isClass = "annule-passed-rdv");
    rdvStart > tomorrow && rdv.statut === CONSTANTS.RDV_STATE.ANNULE && (isClass = "annule-normal-rdv");
    rdvStart < tomorrow && today < rdvStart && rdv.statut === CONSTANTS.RDV_STATE.ANNULE && (isClass = "annule-close-rdv");
    // rdvStart > tomorrow && rdv.statut === "ANNULE" && (isClass = "annule-normal-rdv");
    return isClass;
  };

  // Render the RDV or not
  const isRdvInThisDay = (rdv, day, time) => {
    const start = rdv.start.slice(0, 10);
    const _year = day.toString().slice(11, 15);
    const _day = day.toString().slice(8, 10);
    const _month =
      (day.getMonth() + 1).toString().length === 1
        ? "0" + (day.getMonth() + 1)
        : day.getMonth() + 1;

    const __day = _year + "-" + _month + "-" + _day;
    const _hour = rdv.start.slice(11, 13);
    const _dayHour = time.slice(0, 2);

    return __day === start && _hour === _dayHour;
  };
  // Render calendar with the selected option
  const renderOption = () => {
    const array =
      option === "day"
        ? days
        : option === "week"
        ? weeks
        : option === "month"
        ? ""
        : "";
    return array;
  };

  useEffect(() => {
    localStorage.setItem("month", weeks[0][6].getMonth() + 1);
  });

  return (
    <div className="agenda-content">
      <div className="nav">
        <div className="left-btn">
          <button onClick={nextOrPrev(-1)}>
            <img src="../../icons/flech-black.svg" alt="" />
          </button>
        </div>
        Mai 2024
        <div className="right-btn">
          <button onClick={nextOrPrev(1)}>
            <img src="../../icons/flech-black.svg" alt="" />
          </button>
        </div>
        <div className="displayBy">
          Afficher par:
          <span
            onClick={toggleOption("day")}
            className={option === "day" ? "activeSpan" : ""}
          >
            Jour
          </span>
          <span
            onClick={toggleOption("week")}
            className={option === "week" ? "activeSpan" : ""}
          >
            Semaine
          </span>
          <span
            onClick={toggleOption("month")}
            className={option === "month" ? "activeSpan" : ""}
          >
            Mois
          </span>
        </div>

        <div className="filterByMedecin">
          <label htmlFor="medecinFilter">Filtrer par Médecin:</label>
          {/* New element to toggle dropdown visibility */}
          <div className="toggle-dropdown" onClick={toggleDropdown}>

            <button>Dr Safouan CLNT, Dr Louis...</button>
            {!showDropdown &&
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="#8A8F95" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            }

            {showDropdown &&
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 10L8 6L4 10" stroke="#8A8F95" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            }

          </div>
          {/* Dropdown */}
          <div className={`custom-select ${showDropdown ? "show" : ""}`} >
            <p style={{fontWeight: "600", fontSize: "14px"}}>Sélectionner un médecin</p>
            <div style={{ display: "flex", alignItems: "center", background: "#ffffff", border: "2px solid rgba(170, 170, 170, 0.2)",
              borderRadius: "8px", padding: "0 10px", width: "100%"}}>
              <input type="search" placeholder="Rechercher un médecin"/>
              <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{cursor: "pointer"}}
              >
                <path
                    d="M16.9477 15.6375L13.4561 12.1459C14.2967 11.0268 14.7505 9.66465 14.749 8.265C14.749 4.68988 11.8404 1.78125 8.26524 1.78125C4.69013 1.78125 1.78149 4.68988 1.78149 8.265C1.78149 11.8401 4.69013 14.7487 8.26524 14.7487C9.66489 14.7503 11.0271 14.2965 12.1461 13.4559L15.6378 16.9475C15.8145 17.1055 16.045 17.1898 16.282 17.1832C16.519 17.1765 16.7444 17.0794 16.9121 16.9118C17.0797 16.7442 17.1768 16.5187 17.1834 16.2818C17.1901 16.0448 17.1057 15.8143 16.9477 15.6375ZM3.63399 8.265C3.63399 7.34903 3.90561 6.45362 4.4145 5.69202C4.92339 4.93041 5.64669 4.33681 6.49294 3.98628C7.33919 3.63575 8.27038 3.54404 9.16876 3.72274C10.0671 3.90144 10.8923 4.34252 11.54 4.99021C12.1877 5.6379 12.6288 6.46311 12.8075 7.36149C12.9862 8.25986 12.8945 9.19105 12.544 10.0373C12.1934 10.8836 11.5998 11.6069 10.8382 12.1157C10.0766 12.6246 9.18122 12.8962 8.26524 12.8962C7.03741 12.8948 5.86029 12.4064 4.99208 11.5382C4.12387 10.67 3.63547 9.49283 3.63399 8.265Z"
                    fill="#AAAAAA"
                />
              </svg>
            </div>

            <div style={{ display: "flex", cursor: "pointer", marginTop: "10px" }}>
              <input className="form-check-input me-3" style={{ border: "1px solid black" }} type="checkbox" />
              <p style={{ fontSize: "14px" }}>Sélectionner tous</p>
            </div>

            <div style={{maxHeight: "350px", overflowY: "scroll"}}>
              <hr/>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}
                   onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#E8F7FE" }}
                   onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
              >
                <input className="form-check-input me-3" style={{ border: "1px solid black" }} type="checkbox" />
                {/* Profile Photo */}
                <img src="/images/ProfilePicture.png" alt="" style={{ width: "50px", height: "50px", borderRadius: "10px", marginRight: "10px" }} />

                {/* DoctorData Info */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>Dr Safouan CLNT</p>
                  <p style={{ marginBottom: "5px", fontSize: "12px", border: "none", color: "#1B84CD"}}>Médecin Généraliste</p>
                </div>

              </div>
              <hr/>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer", marginTop: "10px" }}
                   onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#E8F7FE" }}
                   onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
              >
                <input className="form-check-input me-3" style={{ border: "1px solid black" }} type="checkbox" checked/>
                {/* Profile Photo */}
                <img src="/images/ProfilePicture.png" alt="" style={{ width: "50px", height: "50px", borderRadius: "10px", marginRight: "10px" }} />

                {/* DoctorData Info */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>Dr Safouan CLNT</p>
                  <p style={{ marginBottom: "5px", fontSize: "12px", border: "none", color: "#1B84CD"}}>Médecin Généraliste</p>
                </div>

              </div>
              <hr/>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer", marginTop: "10px" }}
                   onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#E8F7FE" }}
                   onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
              >
                <input className="form-check-input me-3" style={{ border: "1px solid black" }} type="checkbox" checked/>
                {/* Profile Photo */}
                <img src="/images/ProfilePicture.png" alt="" style={{ width: "50px", height: "50px", borderRadius: "10px", marginRight: "10px" }} />

                {/* DoctorData Info */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>Dr Safouan CLNT</p>
                  <p style={{ marginBottom: "5px", fontSize: "12px", border: "none", color: "#1B84CD"}}>Médecin Généraliste</p>
                </div>

              </div>
              <hr/>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer", marginTop: "10px" }}
                   onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#E8F7FE" }}
                   onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
              >
                <input className="form-check-input me-3" style={{ border: "1px solid black" }} type="checkbox" checked/>
                {/* Profile Photo */}
                <img src="/images/ProfilePicture.png" alt="" style={{ width: "50px", height: "50px", borderRadius: "10px", marginRight: "10px" }} />

                {/* DoctorData Info */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>Dr Safouan CLNT</p>
                  <p style={{ marginBottom: "5px", fontSize: "12px", border: "none", color: "#1B84CD"}}>Médecin Généraliste</p>
                </div>

              </div>
              <hr/>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer", marginTop: "10px" }}
                   onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#E8F7FE" }}
                   onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
              >
                <input className="form-check-input me-3" style={{ border: "1px solid black" }} type="checkbox" />
                {/* Profile Photo */}
                <img src="/images/ProfilePicture.png" alt="" style={{ width: "50px", height: "50px", borderRadius: "10px", marginRight: "10px" }} />

                {/* DoctorData Info */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>Dr Safouan CLNT</p>
                  <p style={{ marginBottom: "5px", fontSize: "12px", border: "none", color: "#1B84CD"}}>Médecin Généraliste</p>
                </div>

              </div>
              <hr/>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer", marginTop: "10px" }}
                   onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#E8F7FE" }}
                   onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
              >
                <input className="form-check-input me-3" style={{ border: "1px solid black" }} type="checkbox" />
                {/* Profile Photo */}
                <img src="/images/ProfilePicture.png" alt="" style={{ width: "50px", height: "50px", borderRadius: "10px", marginRight: "10px" }} />

                {/* DoctorData Info */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>Dr Safouan CLNT</p>
                  <p style={{ marginBottom: "5px", fontSize: "12px", border: "none", color: "#1B84CD"}}>Médecin Généraliste</p>
                </div>

              </div>
              <hr/>
            </div>
            <div className="dropdown-content">
              <button>Appliquer le filtre</button>
            </div>
          </div>
        </div>
      </div>

      <div className="calendar">
        <div className="calendar-wrapper">
          <div
              className={`calendar-wrapper-header ${
                  option === "month" ? "calendar-wrapper-header-month" : ""
              }`}
          >
            <div className="row w-100">
              <div className="col-12 p-0 d-flex">
                {option !== "month" ? (
                    <div className="days-container" ref={daysContainer}>
                      <div className="container">
                        {renderOption().map((week, index) => (
                            <div
                                onAnimationEnd={removeAnimation}
                                className={`week ${index === 0 ? "prevWeek" : "currentWeek"}`}
                                key={index}
                            >
                              {week.map((day, index_) => (
                                  <div
                                      className={`day ${
                                          new Date().toString() === day.toString() ? "today" : ""
                                      }`}
                                      key={index_}
                                  >
                                    <span>{day.toString().slice(0, 3)}</span>
                                    <strong>
                                      {day.toString().slice(8, 10) + "/" + day.toString().slice(4, 7)}
                                    </strong>
                                  </div>
                              ))}
                            </div>
                        ))}
                      </div>
                    </div>
                ) : (
                    <MonthCalendar
                        setAgendaIsChanging={setAgendaIsChanging}
                        rdvType={rdvType}
                        rdvs={rdvs}
                        onChangeMonth={onChangeMonth}
                    />
                )}
              </div>
            </div>
          </div>

          {option !== "month" && (
              <div className="calendar-wrapper-content">
                <div className="row w-100 d-flex">
                  <div className="container p-0 d-flex">
                    <div className="col-1 p-0">
                      <div className="times-container">
                        {CONSTANTS.TIME.map((x, index) => (
                            <span className="time" key={index}>
                    {x}
                  </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-11 p-0">
                      <div className="calendar-wrapper-content-main" ref={daysMain}>
                        {renderOption().map((week, index) => (
                            <div
                                key={index}
                                onAnimationEnd={removeAnimation}
                                className={`weekDays ${index === 0 ? "prevWeekDay" : "currentWeekDay"}`}
                            >
                              {week.map((xx, index_) => (
                                  <div className="day-container" key={index_}>
                                    {CONSTANTS.TIME.map((x, index) => (
                                        <div className="day-box" key={index}>
                                          {rdvs.map(
                                              (rdv, _index) =>
                                                  isRdvInThisDay(rdv, xx, x) && (
                                                      <RdvItemAgenda
                                                          rdvType={rdvType}
                                                          key={_index}
                                                          rdv={rdv}
                                                      />
                                                  )
                                          )}
                                        </div>
                                    ))}
                                  </div>
                              ))}
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>


    </div>
  );
}

export default Calendar;
