import React, { useState, useEffect } from 'react';
import './calendar.css'; // Assurez-vous d'avoir les styles appropriés dans votre fichier CSS
import { ArrowCircleLeft1 } from "../../icons/ArrowCircleLeft1";
import { ArrowCircleRight1 } from "../../icons/ArrowCircleRight1";
import chevrondown from '../../assets/icons/chevron_down.svg';
const Calendar = ({prochRdv}) => {
  const [dropdown, setDropdown]= useState(false);
  console.log(prochRdv);
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  const [highlightedDays, setHighlightedDays] = useState([]); // Jours à mettre en surbrillance

  useEffect(() => {
    // Extraire les jours des rendez-vous pour le mois actuellement affiché
    const filteredRdv = prochRdv?.filter(rdv => {
      const rdvDate = new Date(rdv.start);
      return rdvDate.getMonth() === currentDate.getMonth() && rdvDate.getFullYear() === currentDate.getFullYear();
    });
    const days = filteredRdv.map(rdv => new Date(rdv.start).getDate());
    setHighlightedDays(days);

  }, [prochRdv, currentDate]);
  
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return newDate;
    });
  };
 
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return newDate;
    });
  };
  const handleMonthSelect = (monthIndex) => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), monthIndex, 1));
    setDropdown(false); // Fermer le dropdown après la sélection
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    const startDay = (startOfMonth.getDay() + 6) % 7; // Convertir dimanche à 0 et samedi à 6
    const daysInMonth = getDaysInMonth(year, month);

    const previousMonthEnd = new Date(year, month, 0);
    const daysInPreviousMonth = previousMonthEnd.getDate();

    const calendarDays = [];
    let dayCount = 1;

    // Ajouter les jours du mois précédent
    for (let i = startDay - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPreviousMonth - i,
        currentMonth: false
      });
    }

    // Ajouter les jours du mois courant
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();
      calendarDays.push({
        day: i,
        currentMonth: true,
        isToday: isToday,
        isHighlighted: highlightedDays.includes(i)
      });
    }

    // Ajouter les jours du mois suivant pour compléter les 6 semaines
    while (calendarDays.length < 42) {
      calendarDays.push({
        day: dayCount,
        currentMonth: false
      });
      dayCount++;
    }

    return calendarDays;
  };

  const calendarDays = generateCalendar();

  return (
    <>
    <div className="frame-10">
          <div className="frame-11">
            <div className="text-wrapper-9">{capitalizeFirstLetter(currentDate.toLocaleString('default', { month: 'long' }))} {currentDate.getFullYear()}</div>

            {/* <ChevronDown className="chevron-down" onClick={() => setDropdown((x) => !x)}/> */}
            <img className="img chevron-down" alt="Frame" src={chevrondown} onClick={() => setDropdown((x) => !x)}/> 
          </div>
          <div className="frame-12">
            <ArrowCircleLeft1 className="icon-instance-node" onClick={handlePreviousMonth}/>
            <ArrowCircleRight1 className="icon-instance-node" onClick={handleNextMonth}/>
          </div>
        </div>
        <div className="calendar">
      
      <div className="weekdays">
        {daysOfWeek.map((day, index) => (
          <div className="weekday" key={index}>{day}</div>
        ))}
      </div>
      <div className="days">
        {calendarDays.map((dayInfo, index) => (
          <div
            key={index}
            className={`day ${dayInfo.currentMonth ? 'in-month' : 'out-of-month'} ${dayInfo.isToday ? 'today' : ''}`}
          >
            {dayInfo.day}
            {dayInfo.isHighlighted && <div className="highlight-circle"></div>}
          </div>
        ))}
      </div>
    </div>
    {dropdown && (
      <div className="dropdown">
        <div className="frame-18">
          <div className="frame-19">
          <div className="scroll-container" style={{ height: '200px' }}>
            {months.map((month, index) => (
              <div className={`frame-20`} key={index} onClick={() => handleMonthSelect(index)}>
                <div className={`text-wrapper-10`}>{month}</div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
)}
    </>
    
  );
};

export default Calendar;
