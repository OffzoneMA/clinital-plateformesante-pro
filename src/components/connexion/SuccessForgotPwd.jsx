import React from "react";
import success from './scss/successforgotpwd.scss';

function SucceReg() {
  return (
    <div className="forgotPwd">
      <div className="container">
        <div className="linear-border"></div>

          <div className="grouptext">
            <h1>Un message a été envoyé avec succès</h1>
            <p>Veuillez verfier votre boîte de reception pour reinitialisé <br></br> votre mot de passe  </p>
          </div>
          <div className="check">
            <img src="../icons/check.svg" alt="" />
          </div>

          <div className="imgsuc">
            <img src="../images/suc_mdp-img.png" alt="" />
          </div>
      </div>
      
        <div className="bg">
          <img src="../images/bg-fgp.png" alt="" />
        </div>
    </div>
  );
}

export default SucceReg;
