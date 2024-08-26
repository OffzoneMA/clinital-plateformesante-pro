import React, { useEffect, useState } from "react";
import RdvItemAgenda from "./RdvItemAgenda";
import "./style/monthCalendar.scss";

function MonthCalendar({ rdvs, onChangeMonth, rdvType, currentDate }) {
  const [daysInMonth, setDaysInMonth] = useState([]);

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  useEffect(() => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const days = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    // Add leading days from the previous month
    for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
      days.unshift(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - i));
    }

    // Add trailing days from the next month
    const trailingDaysCount = 42 - days.length;
    for (let i = 1; i <= trailingDaysCount; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i));
    }

    setDaysInMonth(days);
  }, [currentDate]);


  const renderRdvsForDay = (day) => {
    const dayRdvs = rdvs.filter((rdv) => {
      const rdvDate = new Date(rdv.start);
      return rdvDate.getDate() === day.getDate() &&
          rdvDate.getMonth() === day.getMonth() &&
          rdvDate.getFullYear() === day.getFullYear();
    });

    return dayRdvs.map((rdv) => (
        <RdvItemAgenda key={rdv.id} rdv={rdv} rdvType={rdvType} />
    ));
  };

  return (
      <div className="monthCalendar">
        <div className="calendar-grid">
          <div className="calendar-day">Lun</div>
          <div className="calendar-day">Mar</div>
          <div className="calendar-day">Mer</div>
          <div className="calendar-day">Jeu</div>
          <div className="calendar-day">Ven</div>
          <div className="calendar-day">Sam</div>
          <div className="calendar-day">Dim</div>
          {daysInMonth.map((day, index) => (
              <div
                  key={index}
                  className={`calendar-date ${day.getMonth() !== currentDate.getMonth() ? "different-month" : ""}`}
              >
                <span>{day.getDate()}</span>
                {renderRdvsForDay(day)}
              </div>
          ))}
        </div>
      </div>
  );
}

export default MonthCalendar;
