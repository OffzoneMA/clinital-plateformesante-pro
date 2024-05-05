import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { I18nextProvider } from "react-i18next";
import "./styles/style.scss";
import "./styles/variables.scss";
import "./assets/fonts/font.scss";
import { Provider } from "react-redux";
import i18n from "i18next";
import store from "./utils/redux/store";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import ar from "./locales/ar.json"; 
i18n.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem("language") || "fr", 
  resources: {
    fr: {
      translation: fr,
    },
    en: {
      translation: en,
    },
    ar: { // Add Arabic translation
      translation: ar,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>

  </Provider>
 
);
reportWebVitals();
