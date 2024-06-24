
import React, { useState,useEffect,useRef } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { TOKEN } from "../../services/api";
import Axios from "axios"; 
import MedNetworksService from "./services/medNetworkService";
import { setSpecialite, setVilles } from "../../utils/redux/GlobalSlice";
import SearchServices from "../searchBarDoc/SearchServices/SearchServices";
import { useDispatch } from "react-redux";
import Mark from 'mark.js';

function medFollowerdelete() {

    return (

        <div style={{ width: '100%', height: '100%', paddingTop: 20, paddingBottom: 30, paddingLeft: 20, paddingRight: 20, background: 'white', boxShadow: '0px 2.767256498336792px 2.2138051986694336px rgba(0, 0, 0, 0.02)', borderRadius: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex' }}>
            <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 34, display: 'flex' }}>
                <div style={{ width: 496, textAlign: 'center', color: '#303030', fontSize: 21, fontFamily: 'Montserrat', fontWeight: '600', lineHeight: 27.30, wordWrap: 'break-word' }}>Souhaitez-vous réellement supprimer ce praticien de votre réseau ?</div>
                <div style={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'inline-flex' }}>
                    <div style={{ width: 239, height: 44, paddingLeft: 23, paddingRight: 23, paddingTop: 13, paddingBottom: 13, background: 'white', borderRadius: 8, border: '1px #AAAAAA solid', justifyContent: 'center', alignItems: 'center', gap: 5, display: 'flex' }}>
                        <div style={{ textAlign: 'center', color: '#AAAAAA', fontSize: 14, fontFamily: 'Avenir Next LT Pro', fontWeight: '600', wordWrap: 'break-word' }}>Fermer</div>
                    </div>
                    <div style={{ width: 239, height: 44, paddingLeft: 23, paddingRight: 23, paddingTop: 13, paddingBottom: 13, background: '#E85555', boxShadow: '0px 0px 14px rgba(232, 85, 85, 0.50)', borderRadius: 8, justifyContent: 'center', alignItems: 'center', gap: 5, display: 'flex' }}>
                        <div style={{ textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Avenir Next LT Pro', fontWeight: '600', wordWrap: 'break-word' }}>Supprimer</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default medFollowerdelete;