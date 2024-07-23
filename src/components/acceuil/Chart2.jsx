import React, {useEffect, useState} from "react";
import { DatingDayInMonth } from "../dashboard/DatingDayInMonth";
import { DatingDayOutOf } from "../dashboard/DatingDayOutOf";
import { DatingWeekLabel } from "../dashboard/DatingWeekLabel";
import { HeaderPro } from "../dashboard/HeaderPro";
import { ArrowCircleLeft1 } from "../../icons/ArrowCircleLeft1";
import { ArrowCircleRight1 } from "../../icons/ArrowCircleRight1";
import { ChevronDown } from "../../icons/ChevronDown";
import { PlusCircle2 } from "../../icons/PlusCircle2";
import Navbar from "../navbar/Navbar";
import maki_doctor from '../../assets/icons/maki_doctor-15.svg';
import fluent_patient from '../../assets/icons/fluent_patient-32-regular.svg';
import fluent_people from '../../assets/icons/fluent_people-community-20-regular.svg';
import calendar from '../../assets/icons/calendar-outline.svg';
//import "./style.css";
import Dashboard from "./Dashboard";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronDownIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import {ORIGIN, TOKEN} from "../../services/api";

/*function Chart2 () {
  return (

    <div className="group-4">
    <div className="frame-33">
      <div className="text-wrapper-16">Statistiques</div>
      <div className="frame-11">
        <div className="text-wrapper-17">Avril 2023</div>
        <ChevronDown className="chevron-down-1" />
      </div>
    </div>
    <div className="line-chart-2">
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
      <div className="group-5">
        <div className="chart-data">
          <div className="frame-26">

            <div className="text-wrapper-18">Femme</div>
          </div>
          <div className="frame-26">

            <div className="text-wrapper-18">Homme</div>
          </div>
          <div className="frame-26">

            <div className="text-wrapper-18">Enfant</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Chart2; */

/*const data = {
  Femme: 80,
  Homme: 60,
  Enfant: 40
};

const Chart2 = () => {
  return (
      <div className="group-4">
        <div className="frame-33">
          <div className="text-wrapper-16">Statistiques</div>
          <div className="frame-11">
            <div className="text-wrapper-17">Avril 2023</div>
            <ChevronDown className="chevron-down-1" />
          </div>
        </div>
        <div className="line-chart-2">
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
          <div className="group-5">
            <div className="chart-data">
              <div className="frame-26">

                <div className="text-wrapper-18">Femme</div>
              </div>
              <div className="frame-26">

                <div className="text-wrapper-18">Homme</div>
              </div>
              <div className="frame-26">

                <div className="text-wrapper-18">Enfant</div>
              </div>
            </div>
          </div>
          <div className="chart-bars">
            {Object.keys(data).map((category, index) => (
                <div key={index} className="chart-bar-container">
                  <div className="chart-bar" style={{ height: `${data[category]}%` }}>
                    <span>{data[category]}</span>
                  </div>

                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Chart2;*/

/*const data = [
  { name: 'Femme', count: 0 },
  { name: 'Homme', count: 80 },
  { name: 'Enfant', count: 60 },
];*/

/*function Chart2() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [data, setData] = useState([]);
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setIsDropdownVisible(false);
        fetchData(selectedMonth, year);
    };

    const handleMonthSelect = (monthIndex) => {
        setSelectedMonth(monthIndex + 1);
        setIsDropdownVisible(false);
        fetchData(monthIndex + 1, selectedYear);
    };

    const fetchData = async (month, year) => {
        try {
            const response = await axios.get(`${ORIGIN}/api/rdv/patientCounts`, {
                params: { month, year },
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Authorization': `Bearer ${TOKEN}`
                }
            });
            const patientCounts = response.data;
            setData([
                { name: 'Femmes', count: patientCounts.femmeCount },
                { name: 'Hommes', count: patientCounts.hommeCount },
                { name: 'Enfants', count: patientCounts.enfantCount }
            ]);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    };

    useEffect(() => {
        fetchData(selectedMonth, selectedYear);
    }, [selectedYear, selectedMonth]);

    return (
        <Box className="group-4" sx={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <Box className="frame-33" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <Typography variant="h6" className="text-wrapper-16">Statistiques</Typography>
                <Box className="frame-11" onClick={toggleDropdown} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative', zIndex: 2 }}>
                    <Typography variant="body1" className="text-wrapper-17">{months[selectedMonth - 1]} {selectedYear}</Typography>
                    <IconButton className="chevron-down-1" size="small">
                        <ChevronDownIcon />
                    </IconButton>
                    {isDropdownVisible && (
                        <Box className="dropdown-2" sx={{ position: 'absolute', top: '40px', left: 0, backgroundColor: 'white', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', zIndex: 3 }}>
                            <Box className="frame-27" sx={{ padding: '10px' }}>
                                <Box className="frame-28">
                                    <Box className="frame-19">
                                        <Box className="frame-29">
                                            <Typography className="text-wrapper-19">Mois</Typography>
                                        </Box>
                                        <Box className="month-list">
                                            {months.map((month, index) => (
                                                <Box key={index} className="frame-20 month-item" sx={{ padding: '5px 0' }} onClick={() => handleMonthSelect(index)}>
                                                    <Typography className="text-wrapper-21">{month}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                    <Box className="frame-31">
                                        <Box className="rectangle" />
                                    </Box>
                                </Box>
                                <Box className="frame-32">
                                    <Box className="frame-19">
                                        <Box className="frame-29">
                                            <Typography className="text-wrapper-19">Année</Typography>
                                        </Box>
                                        {['2020', '2021', '2022', '2023', '2024'].map((year, index) => (
                                            <Box key={index} className="frame-20 month-item" sx={{ padding: '5px 0' }} onClick={() => handleYearSelect(year)}>
                                                <Typography className="text-wrapper-21">{year}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box className="line-chart-2" sx={{ marginTop: '20px' }}>
                <BarChart
                    width={400}
                    height={250}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </Box>
        </Box>
    );
}

export default Chart2;*/

function Chart2() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [data, setData] = useState([]);
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setIsDropdownVisible(false);
        fetchData(selectedMonth, year);
    };

    const handleMonthSelect = (monthIndex) => {
        setSelectedMonth(monthIndex + 1);
        setIsDropdownVisible(false);
        fetchData(monthIndex + 1, selectedYear);
    };

    const fetchData = async (month, year) => {
        try {
            const response = await axios.get(`${ORIGIN}/api/rdv/patientCounts`, {
                params: { month, year },
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Authorization': `Bearer ${TOKEN}`
                }
            });
            const patientCounts = response.data;
            setData([
                { name: 'Femmes', femmeCount: patientCounts.femmeCount },
                { name: 'Hommes', hommeCount: patientCounts.hommeCount },
                { name: 'Enfants', enfantCount: patientCounts.enfantCount }
            ]);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    };

    useEffect(() => {
        fetchData(selectedMonth, selectedYear);
    }, [selectedYear, selectedMonth]);

    return (
        <Box className="group-4" sx={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <Box className="frame-33" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <Typography variant="h6" className="text-wrapper-16">Statistiques</Typography>
                <Box className="frame-11" onClick={toggleDropdown} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative', zIndex: 2 }}>
                    <Typography variant="body1" className="text-wrapper-17">{months[selectedMonth - 1]} {selectedYear}</Typography>
                    <IconButton className="chevron-down-1" size="small">
                        <ChevronDownIcon />
                    </IconButton>
                    {isDropdownVisible && (
                        <div className="dropdown-2" style={{ maxHeight: '300px', overflowY: 'auto', position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: '1px solid #ccc', zIndex: 3 }}>
                            <div className="frame-27">
                                <div className="frame-28">
                                    <div className="frame-19">
                                        <div className="frame-29">
                                            <div className="text-wrapper-19">Mois</div>
                                        </div>
                                        <div className="month-list">
                                            {['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'].map((month, index) => (
                                                <div key={index} className="frame-20" onClick={() => handleMonthSelect(index)}>
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
                                            <div key={index} className="frame-20" onClick={() => handleYearSelect(year)}>
                                                <div className="text-wrapper-21">{year}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/*isDropdownVisible && (
                        <Box className="dropdown-2" sx={{ position: 'absolute', top: '40px', left: 0, backgroundColor: 'white', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', zIndex: 3 }}>
                            <Box className="frame-27" sx={{ padding: '10px' }}>
                                <Box className="frame-28">
                                    <Box className="frame-19">
                                        <Box className="frame-29">
                                            <Typography className="text-wrapper-19">Mois</Typography>
                                        </Box>
                                        <Box className="month-list">
                                            {months.map((month, index) => (
                                                <Box key={index} className="frame-20 month-item" sx={{ padding: '5px 0' }} onClick={() => handleMonthSelect(index)}>
                                                    <Typography className="text-wrapper-21">{month}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                    <Box className="frame-31">
                                        <Box className="rectangle" />
                                    </Box>
                                </Box>
                                <Box className="frame-32">
                                    <Box className="frame-19">
                                        <Box className="frame-29">
                                            <Typography className="text-wrapper-19">Année</Typography>
                                        </Box>
                                        {['2020', '2021', '2022', '2023', '2024'].map((year, index) => (
                                            <Box key={index} className="frame-20 month-item" sx={{ padding: '5px 0' }} onClick={() => handleYearSelect(year)}>
                                                <Typography className="text-wrapper-21">{year}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )*/}
                </Box>
            </Box>
            <Box className="line-chart-2" sx={{ marginTop: '20px' }}>
                <BarChart
                    width={400}
                    height={250}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    barCategoryGap="30%"
                    barSize={50}
                    barGap={5}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="femmeCount" fill="#BB6BD9" />
                    <Bar dataKey="hommeCount" fill="#6DC0F9" name="Hommes" />
                    <Bar dataKey="enfantCount" fill="#FCB769" name="Enfants" />
                </BarChart>
            </Box>
        </Box>
    );
}

export default Chart2;
