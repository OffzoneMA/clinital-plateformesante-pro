import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";


import "./AddDocuments.scss";
import MenuCabinet from "../../components/menuCabinet/MenuCabinet";


function AddDocuments (){
  return (
    <div className="mydocuments">
    <div className="result-container">
      <MenuCabinet state="1" />
    </div>
    <div className="bg">
        <img src="../images/bg-insc.png" alt="" />
      </div>
    </div>
  )
}
export default AddDocuments;