import React from "react";
import RdvLeftBar from "./RdvLeftBar";
import { useState, useEffect, useRef } from "react";
import { getAllProche } from "../../action/Patient";
import { USER_ID } from "../../services/api";
import CONSTANTS from "../../constant/constant";

function MyRdvs({ rdvs, setFilter, filter }) {


  return (
    <div className="left-bar">
      <div className="titre">
        <h2>Mon agenda</h2>
      </div>
      <div className="item-container">


        {/*here calendar*/}

      </div>
    </div>
  );
}

export default MyRdvs;
