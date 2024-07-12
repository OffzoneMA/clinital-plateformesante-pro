import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown } from "../../icons/ChevronDown";
import "./styles/chart.scss";
import {ORIGIN, TOKEN} from "../../services/api";


/*function Chart() {
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

export default Chart;*/


/*function Chart() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([]);

  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const fetchData = async (year, month) => {
    try {
      console.log("Fetching data for year:", year, "and month:", month);
      const response = await fetch(`http://localhost:8080/api/rdv/count-by-mode`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Authorization': `Bearer ${TOKEN}`
        }
      });
      const result = await response.json();
      console.log("Received response:", result);
      const filteredData = result.filter(item => item.year === year && item.month === month);
      console.log("filtered response:", filteredData);
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data\'s chart:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedYear, 5);
  }, [selectedYear, selectedMonth]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsDropdownVisible(false);
  };

  const handleMonthSelect = (monthIndex) => {
    setSelectedMonth(monthIndex + 1);
    setIsDropdownVisible(false);
  };

  return (
      <div className="overlap-wrapper">
        <div className="overlap-2">
          <div className="frame-25">
            <div className="text-wrapper-16">Statistiques</div>
            <div className="frame-11" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
              <div className="text-wrapper-17">{months[selectedMonth - 1]} {selectedYear}</div>
              <ChevronDown className="chevron-down-1" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mode" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          {isDropdownVisible && (
              <div className="dropdown-2">
                <div className="frame-27">
                  <div className="frame-28">
                    <div className="frame-19">
                      <div className="frame-29">
                        <div className="text-wrapper-19">Mois</div>
                      </div>
                      <div className="month-list">
                        {months.map((month, index) => (
                            <div key={index} className="frame-20 month-item" onClick={() => handleMonthSelect(index)}>
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
                          <div key={index} className="frame-20 month-item" onClick={() => handleYearSelect(year)}>
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
}*/

/*function Chart() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([]);

  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const fetchData = async (year, month) => {
    try {
      console.log("Fetching data for year:", year, "and month:", month);
      if(year >= new Date().getFullYear() && month >= new Date().getMonth()){
        const response = await fetch(`${ORIGIN}/api/rdv/count-by-mode?year=${year}&month=${month}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Authorization': `Bearer ${TOKEN}`
          }
        });
        const result = await response.json();
        console.log("actual date: Received response:", result);
        setData([
          {
            "mode": "CABINET",
            "year": 2024,
            "month": 5,
            "count": 105
          },
          {
            "mode": "VIDEO",
            "year": 2024,
            "month": 5,
            "count": 102
          },
          {
            "mode": "DOMICILE",
            "year": 2024,
            "month": 5,
            "count": 100
          }
        ]);
      } else {
        const response = await fetch(`${ORIGIN}/api/rdv/count-by-mode`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Authorization': `Bearer ${TOKEN}`
          }
        });
        const result = await response.json();
        console.log("Received response:", result);
        const filteredData = result.filter(item => item.year == year && item.month == month);
        console.log("Filtered response:", filteredData);
        setData([
          {
            "mode": "CABINET",
            "year": 2024,
            "month": 5,
            "count": 105
          },
          {
            "mode": "VIDEO",
            "year": 2024,
            "month": 5,
            "count": 102
          },
          {
            "mode": "DOMICILE",
            "year": 2024,
            "month": 5,
            "count": 100
          }
        ]);
      }

    } catch (error) {
      console.error('Error fetching data\'s chart:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsDropdownVisible(false);
  };

  const handleMonthSelect = (monthIndex) => {
    setSelectedMonth(monthIndex + 1);
    setIsDropdownVisible(false);
  };

  return (
      <div className="overlap-wrapper">
        <div className="overlap-2">
          <div className="frame-25">
            <div className="text-wrapper-16">Statistiques</div>
            <div className="frame-11" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
              <div className="text-wrapper-17">{months[selectedMonth - 1]} {selectedYear}</div>
              <ChevronDown className="chevron-down-1" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mode" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>

          {isDropdownVisible && (
              <div className="dropdown-2">
                <div className="frame-27">
                  <div className="frame-28">
                    <div className="frame-19">
                      <div className="frame-29">
                        <div className="text-wrapper-19">Mois</div>
                      </div>
                      <div className="month-list">
                        {months.map((month, index) => (
                            <div key={index} className="frame-20 month-item" onClick={() => handleMonthSelect(index)}>
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
                          <div key={index} className="frame-20 month-item" onClick={() => handleYearSelect(year)}>
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
export default Chart;*/

/*function Chart() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([]);

  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const fetchData = async (year, month) => {
    try {
      console.log("Fetching data for year:", year, "and month:", month);
      if (year >= new Date().getFullYear() && month >= new Date().getMonth()) {
        const response = await fetch(`${ORIGIN}/api/rdv/count-by-mode?year=${year}&month=${month}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Authorization': `Bearer ${TOKEN}`
          }
        });
        const result = await response.json();
        console.log("actual date: Received response:", result);
        setData([
          {
            "mode": "CABINET",
            "year": 2024,
            "month": 5,
            "count": 1005
          },
          {
            "mode": "VIDEO",
            "year": 2024,
            "month": 5,
            "count": 102
          },
          {
            "mode": "DOMICILE",
            "year": 2024,
            "month": 5,
            "count": 100
          }
        ]);
      } else {
        const response = await fetch(`${ORIGIN}/api/rdv/count-by-mode`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Authorization': `Bearer ${TOKEN}`
          }
        });
        const result = await response.json();
        console.log("Received response:", result);
        const filteredData = result.filter(item => item.year == year && item.month == month);
        console.log("Filtered response:", filteredData);
        setData(filteredData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsDropdownVisible(false);
  };

  const handleMonthSelect = (monthIndex) => {
    setSelectedMonth(monthIndex + 1);
    setIsDropdownVisible(false);
  };

  return (
      <div className="overlap-wrapper">
        <div className="overlap-2">
          <div className="frame-25">
            <div className="text-wrapper-16">Statistiques</div>
            <div className="frame-11" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
              <div className="text-wrapper-17">{months[selectedMonth - 1]} {selectedYear}</div>
              <ChevronDown className="chevron-down-1" />
            </div>
          </div>
          <div className="column-chart">
            <div className="y-axis">
              <div className="y-axis-line">
                <div className="number">1000</div>
                <div className="divider" />
              </div>
              <div className="y-axis-line">
                <div className="number">800</div>
                <div className="divider" />
              </div>
              <div className="y-axis-line">
                <div className="number">600</div>
                <div className="divider" />
              </div>
              <div className="y-axis-line">
                <div className="number">400</div>
                <div className="divider" />
              </div>
              <div className="y-axis-line">
                <div className="number">200</div>
                <div className="divider" />
              </div>
              <div className="y-axis-line">
                <div className="number">0</div>
                <div className="divider" />
              </div>
            </div>
            <div className="chart-data-wrapper">
              <div className="chart-data">
                {data.map(item => (
                    <div key={item.mode} className="column" style={{backgroundColor: `#8884d8`, height: `${item.count / 10}px` }}>
                      <div className={`column-${item.mode}`} />
                      <div className="text-wrapper-18">{item.mode}</div>
                    </div>
                ))}
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
                        {months.map((month, index) => (
                            <div key={index} className="frame-20 month-item" onClick={() => handleMonthSelect(index)}>
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
                          <div key={index} className="frame-20 month-item" onClick={() => handleYearSelect(year)}>
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

export default Chart;*/

function Chart() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([]);

  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const fetchData = async (year, month) => {
    try {
      console.log("Fetching data for year:", year, "and month:", month);
      if (year >= new Date().getFullYear() && month >= new Date().getMonth()) {
        const response = await fetch(`${ORIGIN}/api/rdv/count-by-mode?year=${year}&month=${month}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Authorization': `Bearer ${TOKEN}`
          }
        });
        const result = await response.json();
        console.log("actual date: Received response:", result);
        setData(result);
      } else {
        const response = await fetch(`${ORIGIN}/api/rdv/count-by-mode`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Authorization': `Bearer ${TOKEN}`
          }
        });
        const result = await response.json();
        console.log("Received response:", result);
        const filteredData = result.filter(item => item.year == year && item.month == month);
        console.log("Filtered response:", filteredData);
        setData(filteredData);
      }
    } catch (error) {
      console.error('Error fetching data\'s chart:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsDropdownVisible(false);
  };

  const handleMonthSelect = (monthIndex) => {
    setSelectedMonth(monthIndex + 1);
    setIsDropdownVisible(false);
  };

  const getBarColor = (entry) => {
    switch (entry.mode) {
      case 'CABINET':
        return '#8884d8';
      case 'VIDEO':
        return '#82ca9d';
      case 'DOMICILE':
        return '#ffc658';
      default:
        return '#8884d8';
    }
  };

  return (
      <div className="overlap-wrapper">
        <div className="overlap-2">
          <div className="frame-25" style={{left: `74px`, top: `0px`}}>
            <div className="text-wrapper-16">Statistiques</div>
            <div className="frame-11" onClick={toggleDropdown} style={{ cursor: 'pointer', position: 'relative', zIndex: 2 }}>
              <div className="text-wrapper-17">{months[selectedMonth - 1]} {selectedYear}</div>
              <ChevronDown className="chevron-down-1" />
              {isDropdownVisible && (
                  <div className="dropdown-2" style={{ position: 'absolute', top: '40px', zIndex: 3 }}>
                    <div className="frame-27">
                      <div className="frame-28">
                        <div className="frame-19">
                          <div className="frame-29">
                            <div className="text-wrapper-19">Mois</div>
                          </div>
                          <div className="month-list">
                            {months.map((month, index) => (
                                <div key={index} className="frame-20 month-item" onClick={() => handleMonthSelect(index)}>
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
                              <div key={index} className="frame-20 month-item" onClick={() => handleYearSelect(year)}>
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
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}

            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mode" tick={{ fontSize: 13, fontFamily: `Avenir Next LT Pro-Demi` }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill={getBarColor} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
  );
}

export default Chart;

