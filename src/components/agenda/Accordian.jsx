import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import "./style/accordian.scss";

function Accordian({setFilter}) {
    return (
<Accordion defaultActiveKey={['0']}>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Motif de Consultation</Accordion.Header>
        <Accordion.Body>
            <div className="form-check mb-3">
                <input className="form-check-input me-3" type="checkbox"

                />
                <label className="form-check-label">Tout</label>
            </div>
            <div className="form-check mb-3">
                <input className="form-check-input me-3" type="checkbox"
                       onChange={(e) => setFilter(e.target.checked ? "Premiere consultation" : "")}
                />
                <label className="form-check-label">Première consultation</label>
            </div>
            <div className="form-check mb-3">
                <input className="form-check-input me-3" type="checkbox"
                       onChange={(e) => setFilter(e.target.checked ? "Consultation de suivi" : "")}
                />
                <label className="form-check-label">Consultation de suivi</label>
            </div>
            <div className="form-check mb-3">
                <input className="form-check-input me-3" type="checkbox"
                       onChange={(e) => setFilter(e.target.checked ? "Urgence" : "")}
                />
                <label className="form-check-label">Urgence</label>
            </div>
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
        <Accordion.Header >Type de Consultation</Accordion.Header>
        <Accordion.Body>
            <div className="form-check mb-3">
                <input className="form-check-input me-3" type="checkbox"
                       onChange={(e) => setFilter(e.target.checked ? "Tout Type" : "")}
                />
                <label className="form-check-label">Tout</label>
            </div>
            <div className="form-check mb-3">
                <input className="form-check-input me-3" type="checkbox"
                       onChange={(e) => setFilter(e.target.checked ? "Cabinet" : "")}
                />
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.514648" width="24" height="24" rx="12" fill="#C989DD" fill-opacity="0.18"/>
                    <path d="M9.91239 11.9829C9.2974 11.9829 8.70759 11.7128 8.27272 11.2319C7.83786 10.7511 7.59355 10.0989 7.59355 9.41884V7.36756C7.59355 7.23155 7.64241 7.10112 7.72939 7.00494C7.81636 6.90877 7.93432 6.85474 8.05732 6.85474H8.52109C8.64409 6.85474 8.76205 6.80071 8.84902 6.70454C8.93599 6.60837 8.98486 6.47793 8.98486 6.34192C8.98486 6.20591 8.93599 6.07548 8.84902 5.9793C8.76205 5.88313 8.64409 5.8291 8.52109 5.8291H8.05732C7.68832 5.8291 7.33444 5.99119 7.07352 6.27971C6.8126 6.56822 6.66602 6.95954 6.66602 7.36756V9.41884C6.66661 9.9982 6.79437 10.5687 7.03833 11.0815C7.28228 11.5942 7.63514 12.0337 8.06659 12.3624C8.48112 12.7666 8.8173 13.2594 9.05483 13.8111C9.29236 14.3629 9.42632 14.9621 9.44862 15.5727C9.44862 16.5247 9.79065 17.4378 10.3995 18.111C11.0083 18.7842 11.834 19.1624 12.695 19.1624C13.556 19.1624 14.3817 18.7842 14.9905 18.111C15.5993 17.4378 15.9414 16.5247 15.9414 15.5727V14.9881C16.3785 14.8633 16.7596 14.5664 17.013 14.1532C17.2664 13.74 17.3748 13.2387 17.3179 12.7435C17.261 12.2482 17.0427 11.7928 16.7039 11.4628C16.3651 11.1327 15.9291 10.9506 15.4776 10.9506C15.0261 10.9506 14.5901 11.1327 14.2513 11.4628C13.9125 11.7928 13.6942 12.2482 13.6373 12.7435C13.5804 13.2387 13.6888 13.74 13.9423 14.1532C14.1957 14.5664 14.5767 14.8633 15.0138 14.9881V15.5727C15.0138 16.2527 14.7695 16.9049 14.3347 17.3858C13.8998 17.8666 13.31 18.1368 12.695 18.1368C12.08 18.1368 11.4902 17.8666 11.0553 17.3858C10.6205 16.9049 10.3762 16.2527 10.3762 15.5727C10.3996 14.9614 10.535 14.3616 10.7742 13.8098C11.0133 13.258 11.3512 12.7656 11.7675 12.3624C12.1972 12.0326 12.5483 11.5925 12.7906 11.0799C13.0329 10.5672 13.1592 9.99729 13.1588 9.41884V7.36756C13.1588 6.95954 13.0122 6.56822 12.7513 6.27971C12.4903 5.99119 12.1365 5.8291 11.7675 5.8291H11.3037C11.1807 5.8291 11.0627 5.88313 10.9758 5.9793C10.8888 6.07548 10.8399 6.20591 10.8399 6.34192C10.8399 6.47793 10.8888 6.60837 10.9758 6.70454C11.0627 6.80071 11.1807 6.85474 11.3037 6.85474H11.7675C11.8905 6.85474 12.0084 6.90877 12.0954 7.00494C12.1824 7.10112 12.2312 7.23155 12.2312 7.36756V9.41884C12.2312 9.75557 12.1713 10.089 12.0547 10.4001C11.9382 10.7112 11.7674 10.9938 11.5521 11.2319C11.3367 11.47 11.0811 11.6589 10.7998 11.7878C10.5184 11.9166 10.2169 11.9829 9.91239 11.9829ZM15.4776 14.0342C15.2316 14.0342 14.9957 13.9262 14.8217 13.7338C14.6478 13.5415 14.5501 13.2806 14.5501 13.0086C14.5501 12.7366 14.6478 12.4757 14.8217 12.2834C14.9957 12.091 15.2316 11.9829 15.4776 11.9829C15.7236 11.9829 15.9595 12.091 16.1335 12.2834C16.3074 12.4757 16.4051 12.7366 16.4051 13.0086C16.4051 13.2806 16.3074 13.5415 16.1335 13.7338C15.9595 13.9262 15.7236 14.0342 15.4776 14.0342Z" fill="#C989DD"/>
                </svg>
                <label className="form-check-label">Cabinet</label>
            </div>
            <div className="form-check mb-3">
                <input className="form-check-input me-3" type="checkbox"
                       onChange={(e) => setFilter(e.target.checked ? "Video" : "")}
                />
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.514648" width="24" height="24" rx="12" fill="#FCB769" fill-opacity="0.2"/>
                    <path d="M15.0338 13.7378L14.8611 13.9831L14.8611 13.9831L15.0338 13.7378ZM16.9723 15.1023L16.7997 15.3476C16.8156 15.3589 16.8326 15.3685 16.8505 15.3765L16.9723 15.1023ZM17.4997 14.7597L17.7997 14.7597V14.7597H17.4997ZM17.4997 10.2419H17.7997V10.2419L17.4997 10.2419ZM16.9723 9.8992L16.8505 9.62507C16.8326 9.633 16.8156 9.64265 16.7997 9.65388L16.9723 9.8992ZM15.0338 11.2637L14.8611 11.0184L14.8611 11.0184L15.0338 11.2637ZM14.8747 11.5703L14.5747 11.5702V11.5703H14.8747ZM14.8747 13.4312H14.5747V13.4313L14.8747 13.4312ZM12.5313 15.501V15.801L12.5321 15.801L12.5313 15.501ZM8.21875 15.501L8.21789 15.801H8.21875V15.501ZM7 14.2822H6.7L6.7 14.2831L7 14.2822ZM7 10.7197L6.7 10.7189V10.7197H7ZM8.21875 9.50098V9.20098L8.21789 9.20098L8.21875 9.50098ZM12.5425 9.50098L12.5434 9.20098H12.5425V9.50098ZM13.75 10.7085H14.05L14.05 10.7075L13.75 10.7085ZM13.75 14.2822L14.05 14.2831V14.2822H13.75ZM14.8611 13.9831L16.7997 15.3476L17.145 14.857L15.2065 13.4925L14.8611 13.9831ZM16.8505 15.3765C16.9532 15.4221 17.0658 15.4414 17.1779 15.4326L17.1306 14.8344C17.1181 14.8354 17.1056 14.8333 17.0942 14.8282L16.8505 15.3765ZM17.1779 15.4326C17.29 15.4237 17.3981 15.387 17.4925 15.3257L17.1655 14.8226C17.1551 14.8294 17.143 14.8334 17.1306 14.8344L17.1779 15.4326ZM17.4925 15.3257C17.5868 15.2644 17.6643 15.1805 17.7179 15.0817L17.1906 14.7954C17.1846 14.8064 17.176 14.8157 17.1655 14.8226L17.4925 15.3257ZM17.7179 15.0817C17.7716 14.9828 17.7997 14.8721 17.7997 14.7597L17.1997 14.7597C17.1997 14.7722 17.1966 14.7845 17.1906 14.7954L17.7179 15.0817ZM17.7997 14.7597V10.2419H17.1997V14.7597H17.7997ZM17.7997 10.2419C17.7997 10.1294 17.7716 10.0187 17.7179 9.91985L17.1906 10.2061C17.1966 10.2171 17.1997 10.2294 17.1997 10.2419L17.7997 10.2419ZM17.7179 9.91985C17.6643 9.82101 17.5868 9.73713 17.4925 9.67586L17.1655 10.179C17.176 10.1858 17.1846 10.1951 17.1906 10.2061L17.7179 9.91985ZM17.4925 9.67586C17.3981 9.61458 17.29 9.57783 17.1779 9.56896L17.1306 10.1671C17.143 10.1681 17.1551 10.1722 17.1655 10.179L17.4925 9.67586ZM17.1779 9.56896C17.0658 9.5601 16.9532 9.57938 16.8505 9.62507L17.0942 10.1733C17.1056 10.1683 17.1181 10.1661 17.1306 10.1671L17.1779 9.56896ZM16.7997 9.65388L14.8611 11.0184L15.2065 11.5091L17.145 10.1445L16.7997 9.65388ZM14.8611 11.0184C14.7726 11.0807 14.7004 11.1633 14.6506 11.2594L15.1831 11.5358C15.1886 11.5252 15.1967 11.516 15.2065 11.509L14.8611 11.0184ZM14.6506 11.2594C14.6007 11.3554 14.5747 11.462 14.5747 11.5702L15.1747 11.5704C15.1747 11.5583 15.1776 11.5465 15.1831 11.5358L14.6506 11.2594ZM14.5747 11.5703V13.4312H15.1747V11.5703H14.5747ZM14.5747 13.4313C14.5747 13.5395 14.6007 13.6461 14.6506 13.7421L15.1831 13.4657C15.1776 13.455 15.1747 13.4432 15.1747 13.4312L14.5747 13.4313ZM14.6506 13.7421C14.7004 13.8382 14.7726 13.9208 14.8611 13.9831L15.2065 13.4925C15.1967 13.4856 15.1886 13.4764 15.1831 13.4657L14.6506 13.7421ZM12.5313 15.201H8.21875V15.801H12.5313V15.201ZM8.21961 15.201C7.97593 15.2003 7.74243 15.1032 7.57012 14.9309L7.14586 15.3551C7.43027 15.6395 7.81568 15.7998 8.21789 15.801L8.21961 15.201ZM7.57012 14.9309C7.39781 14.7585 7.3007 14.525 7.3 14.2814L6.7 14.2831C6.70116 14.6853 6.86145 15.0707 7.14586 15.3551L7.57012 14.9309ZM7.3 14.2822V10.7197H6.7V14.2822H7.3ZM7.3 10.7206C7.3007 10.4769 7.39781 10.2434 7.57012 10.0711L7.14586 9.64683C6.86145 9.93124 6.70116 10.3167 6.7 10.7189L7.3 10.7206ZM7.57012 10.0711C7.74243 9.89879 7.97593 9.80168 8.21961 9.80098L8.21789 9.20098C7.81568 9.20213 7.43027 9.36242 7.14586 9.64683L7.57012 10.0711ZM8.21875 9.80098H12.5425V9.20098H8.21875V9.80098ZM12.5416 9.80098C12.7823 9.80172 13.0129 9.89767 13.1831 10.0679L13.6074 9.64361C13.3251 9.36134 12.9426 9.20221 12.5434 9.20098L12.5416 9.80098ZM13.1831 10.0679C13.3533 10.2381 13.4493 10.4687 13.45 10.7094L14.05 10.7075C14.0488 10.3084 13.8896 9.92588 13.6074 9.64361L13.1831 10.0679ZM13.45 10.7085V14.2822H14.05V10.7085H13.45ZM13.45 14.2814C13.4493 14.525 13.3522 14.7585 13.1799 14.9309L13.6041 15.3551C13.8886 15.0707 14.0488 14.6853 14.05 14.2831L13.45 14.2814ZM13.1799 14.9309C13.0076 15.1032 12.7741 15.2003 12.5304 15.201L12.5321 15.801C12.9343 15.7998 13.3197 15.6395 13.6041 15.3551L13.1799 14.9309Z" fill="#FCB769"/>
                </svg>
                <label className="form-check-label">Vidéo</label>
            </div>
            <div className="form-check mb-3">
                <input className="form-check-input me-3" type="checkbox"
                       onChange={(e) => setFilter(e.target.checked ? "Domicile" : "")}
                />
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.514648" width="24" height="24" rx="12" fill="#6DC0F9" fill-opacity="0.18"/>
                    <path d="M8.12473 12.4449V16.8746C8.12473 16.974 8.16424 17.0694 8.23456 17.1397C8.30489 17.2101 8.40027 17.2496 8.49973 17.2496H10.7497V14.0621C10.7497 13.9129 10.809 13.7698 10.9145 13.6643C11.02 13.5588 11.163 13.4996 11.3122 13.4996H13.1872C13.3364 13.4996 13.4795 13.5588 13.585 13.6643C13.6905 13.7698 13.7497 13.9129 13.7497 14.0621V17.2496H15.9997C16.0992 17.2496 16.1946 17.2101 16.2649 17.1397C16.3352 17.0694 16.3747 16.974 16.3747 16.8746V12.4449M15.625 10.5699V7.87459H14.5V9.49178M17.5 12.3746L12.5052 7.59334C12.388 7.46959 12.1141 7.46818 11.9948 7.59334L7 12.3746H17.5Z" stroke="#6DC0F9" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <label className="form-check-label">Domicile</label>
            </div>
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="3">
        <Accordion.Header >Autres rendez-vous</Accordion.Header>
        <Accordion.Body>
            <div className={`RDVAnnul`}
                 onClick={(e) => setFilter("RdvAnnulee")}
            >
                <div className={`rectangleAnnul`} />
                RDVs Annulés
            </div>
        </Accordion.Body>
    </Accordion.Item>
</Accordion>
/*<Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="0">
        <Accordion.Header>Motif de Consultation</Accordion.Header>
        <Accordion.Body>
            <div className="form-check mb-3">
                <label>Motif:</label>
                <select onChange={(e) => handleFilterChange('motif', e.target.value)}>
                    <option value="">Tout Motif</option>
                    <option value="Premiere consultation">Premiere consultation</option>
                    <option value="Consultation de suivi">Consultation de suivi</option>
                    <option value="Urgence">Urgence</option>
                </select>
            </div>
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
        <Accordion.Header>Type de Consultation</Accordion.Header>
        <Accordion.Body>
            <div className="form-check mb-3">
                <label>Type:</label>
                <select onChange={(e) => handleFilterChange('type', e.target.value)}>
                    <option value="">Tout Type</option>
                    <option value="Cabinet">Cabinet</option>
                    <option value="Video">Video</option>
                    <option value="Domicile">Domicile</option>
                </select>
            </div>
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2">
        <Accordion.Header>Statut de Consultation</Accordion.Header>
        <Accordion.Body>
            <div className="form-check mb-3">
                <label>Statut:</label>
                <select onChange={(e) => handleFilterChange('statut', e.target.value)}>
                    <option value="">Tout Statut</option>
                    <option value="Active">Active</option>
                    <option value="RdvAnnulee">Annule</option>
                </select>
            </div>
        </Accordion.Body>
    </Accordion.Item>
</Accordion>*/
);
}
/*function Accordian({ handleFilterChange }) {
    const [selectedMotifs, setSelectedMotifs] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedStatuts, setSelectedStatuts] = useState([]);

    const handleCheckboxChange = (category, value) => {
        let newSelections;
        switch (category) {
            case 'motif':
                newSelections = toggleSelection(selectedMotifs, value);
                setSelectedMotifs(newSelections);
                handleFilterChange(category, newSelections);
                break;
            case 'type':
                newSelections = toggleSelection(selectedTypes, value);
                setSelectedTypes(newSelections);
                handleFilterChange(category, newSelections);
                break;
            case 'statut':
                newSelections = toggleSelection(selectedStatuts, value);
                setSelectedStatuts(newSelections);
                handleFilterChange(category, newSelections);
                break;
            default:
                break;
        }
    };

    const toggleSelection = (selections, value) => {
        if (selections.includes(value)) {
            return selections.filter(item => item !== value);
        } else {
            return [...selections, value];
        }
    };

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Motif de Consultation</Accordion.Header>
                <Accordion.Body>
                    <div className="form-check mb-3">
                        <label>Motif:</label>
                        <div>
                            <input type="checkbox" id="motif1" value="Premiere consultation" onChange={(e) => handleCheckboxChange('motif', e.target.value)} />
                            <label htmlFor="motif1">Premiere consultation</label>
                        </div>
                        <div>
                            <input type="checkbox" id="motif2" value="Consultation de suivi" onChange={(e) => handleCheckboxChange('motif', e.target.value)} />
                            <label htmlFor="motif2">Consultation de suivi</label>
                        </div>
                        <div>
                            <input type="checkbox" id="motif3" value="Urgence" onChange={(e) => handleCheckboxChange('motif', e.target.value)} />
                            <label htmlFor="motif3">Urgence</label>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Type de Consultation</Accordion.Header>
                <Accordion.Body>
                    <div className="form-check mb-3">
                        <label>Type:</label>
                        <div>
                            <input type="checkbox" id="type1" value="Cabinet" onChange={(e) => handleCheckboxChange('type', e.target.value)} />
                            <label htmlFor="type1">Cabinet</label>
                        </div>
                        <div>
                            <input type="checkbox" id="type2" value="Video" onChange={(e) => handleCheckboxChange('type', e.target.value)} />
                            <label htmlFor="type2">Video</label>
                        </div>
                        <div>
                            <input type="checkbox" id="type3" value="Domicile" onChange={(e) => handleCheckboxChange('type', e.target.value)} />
                            <label htmlFor="type3">Domicile</label>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Statut de Consultation</Accordion.Header>
                <Accordion.Body>
                    <div className="form-check mb-3">
                        <label>Statut:</label>
                        <div>
                            <input type="checkbox" id="statut1" value="Active" onChange={(e) => handleCheckboxChange('statut', e.target.value)} />
                            <label htmlFor="statut1">Active</label>
                        </div>
                        <div>
                            <input type="checkbox" id="statut2" value="RdvAnnulee" onChange={(e) => handleCheckboxChange('statut', e.target.value)} />
                            <label htmlFor="statut2">Annule</label>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}*/

export default Accordian;