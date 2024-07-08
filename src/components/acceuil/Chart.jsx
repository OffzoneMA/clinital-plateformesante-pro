import React, { useState } from 'react';
import { ChevronDown } from "../../icons/ChevronDown";
import "./styles/chart.scss";
// Import des autres composants et icônes...

function Chart() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
      <div className="overlap-wrapper">
        <div className="overlap-2">
          <div className="frame-25">
            <div className="text-wrapper-16">Statistiques</div>
            <div className="frame-11" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
              <div className="text-wrapper-17">Juillet 2024</div>
              <ChevronDown className="chevron-down-1" />
            </div>
          </div>
          <div className="line-chart">
            <div className="y-axis">
              <div className="y-axis-line">
                <div className="number">100</div>
                <img className="divider" alt="Divider" src="https://c.animaapp.com/NnydzBh0/img/divider-6.svg" />
              </div>
              <div className="y-axis-line">
                <div className="number">80</div>
                <img className="divider" alt="Divider" src="https://c.animaapp.com/NnydzBh0/img/divider-7.svg" />
              </div>
              <div className="y-axis-line">
                <div className="number">60</div>
                <img className="divider" alt="Divider" src="https://c.animaapp.com/NnydzBh0/img/divider-8.svg" />
              </div>
              <div className="y-axis-line-2">
                <div className="number-2">40</div>
                <img className="divider" alt="Divider" src="https://c.animaapp.com/NnydzBh0/img/divider-9.svg" />
              </div>
              <div className="y-axis-line-2">
                <div className="number-2">20</div>
                <img className="divider" alt="Divider" src="https://c.animaapp.com/NnydzBh0/img/divider-10.svg" />
              </div>
              <div className="y-axis-line-2">
                <div className="number-2">0</div>
                <img className="divider" alt="Divider" src="https://c.animaapp.com/NnydzBh0/img/divider-11.svg" />
              </div>
            </div>
            <div className="chart-data-wrapper">
              <div className="chart-data">
                <div className="frame-26">
                  <div className="rectangle-2" />
                  <div className="text-wrapper-18">Cabinet</div>
                </div>
                <div className="frame-26">
                  <div className="rectangle-3" />
                  <div className="text-wrapper-18">Vidéo</div>
                </div>
                <div className="frame-26">
                  <div className="rectangle-4" />
                  <div className="text-wrapper-18">Domicile</div>
                </div>
              </div>
            </div>
          </div>
          {isDropdownVisible && (
              <div className="dropdown-2">
                <div className="frame-27">
                  <div className="frame-28">
                    <div className="frame-19">
                      <div className="frame-29">
                        <div className="text-wrapper-19">Mois</div>
                      </div>
                      <div className="month-list">
                        {['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'].map((month, index) => (
                            <div key={index} className="frame-20">
                              <div className="text-wrapper-21">{month}</div>
                            </div>
                        ))}
                      </div>
                    </div>
                    <div className="frame-31">
                      <div className="rectangle" />
                    </div>
                  </div>
                  <div className="frame-32">
                    <div className="frame-19">
                      <div className="frame-29">
                        <div className="text-wrapper-19">Année</div>
                      </div>
                      {['2020', '2021', '2022', '2023', '2024'].map((year, index) => (
                          <div key={index} className="frame-20">
                            <div className="text-wrapper-21">{year}</div>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}

export default Chart;
