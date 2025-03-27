import React, { useState } from "react";
import "./AddDocuments.scss";
import MenuCabinet from "../../components/menuCabinet/MenuCabinet";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AddDocuments() {
  const [fileNames, setFileNames] = useState({
    patente: [],
    ice: [],
    rc: [],
    inpe: [],
    cin: [],
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleFileChange = (e) => {
    const { id, files } = e.target;
    const selectedFiles = Array.from(files).map((file) => file.name);
    setFileNames((prevNames) => ({
      ...prevNames,
      [id]: [...prevNames[id], ...selectedFiles],
    }));
  };
  const getFileLabelClass = (fileCount) => {
    if (fileCount === 1) return "file-label1";
    if (fileCount === 2) return "file-label1 two-files";
    return "file-label1"; // Default case
  };
  const handleFileDelete = (id, index) => {
    setFileNames((prevNames) => ({
      ...prevNames,
      [id]: prevNames[id]?.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = () => {
    navigate("/cabinet/documentprocessing", { state: { fileNames } });
  };
  return (
    <div className="mydocuments">
      <div
        className="result-container"
        style={{
          direction: localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
        }}
      >
        <MenuCabinet state="1" />
      </div>
      <div
        className="container"
        style={{
          direction: localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
        }}
      >
        <h1> {t("addCabinetDocuments")}</h1>
        <p  style={{
            textAlign:
              localStorage.getItem("language") === "ar" ? "right" : "left",
          }}>
          {t("addDocumentsInstruction")}
          <br />
          {t("cooperationAppreciated")}
          <br />
          <br />
          <ul>
            <li>{t("acceptedFileFormats")}</li>
            <li>{t("maxFileSize")}</li>
          </ul>
        </p>
        <h2>{t("documents")}</h2>
        <form className="form">
          {[
            { label: t("attestationPatente"), id: "patente" },
            { label: t("attestationICE"), id: "ice" },
            { label: t("attestationRC"), id: "rc" },
            { label: t("attestationINPE"), id: "inpe" },
            { label: t("copyCIN"), id: "cin" },
          ].map(({ label, id }) => (
            <div className="form-group-container" key={id}>
              <div className="form-group" key={id}>
                <label className="form-label" htmlFor={id}>
                  {label}
                </label>
                <label className="file-label" htmlFor={id}>
                  <span className="file-span1">{t("browse")}</span>
                  <input
                    type="file"
                    id={id}
                    name={id}
                    onChange={handleFileChange}
                    multiple
                  />
                  <span
                    className="file-span2"
                    style={{
                      [localStorage.getItem("language") === "ar"
                        ? "marginRight"
                        : "marginLeft"]: "10px",
                    }}
                  >
                    {t("chooseFile")}
                  </span>
                </label>
              </div>
              {fileNames[id] && fileNames[id]?.length > 0 && (
                <div className="form-group">
                  <label className="form-label" htmlFor={id}></label>
                  <div className="file">
                    {fileNames[id] &&
                      fileNames[id].map((fileName, index) => (
                        <label
                          className={getFileLabelClass(fileNames[id].length)}
                          key={index}
                        >
                          <img
                            src="../../icons/Icon.svg"
                            alt="se connecter"
                          />{" "}
                          <span className="file-name">{fileName}</span>
                          <img
                            src="../../icons/Del.svg"
                            alt="delete file"
                            className="delete-icon"
                            onClick={() => handleFileDelete(id, index)}
                            
                          />
                        </label>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </form>
      </div>
      <div className="butt">
        <button
          className="button"
          onClick={handleSubmit}
          style={{
            marginLeft:
              localStorage.getItem("language") === "ar" ? "325px" : "810px",
          }}
        >
          {localStorage.getItem("language") === "ar" ? (
            <>
              <img
                src="../../icons/flech-white-left.svg"
                alt="send"
                style={{
                  marginRight: "10px",
                  marginTop: "3px",
                  width: "14px",
                  height: "14px",
                }}
              />
              {t("send")}
            </>
          ) : (
            <>
              {t("send")}
              <img
                src="../../icons/flech-white.svg"
                alt="send"
                style={{
                  marginLeft: "10px",
                  marginTop: "3px",
                  width: "14px",
                  height: "14px",
                }}
              />
            </>
          )}
        </button>
      </div>
      <div className="bg">
        <img src="../images/bg-insc.png" alt="" />
      </div>
    </div>
  );
}

export default AddDocuments;
