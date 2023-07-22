import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
 ReactDOM.render(
  // Inicia la aplicación de React
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
 // Si deseas medir el rendimiento de tu aplicación, puedes pasar una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o enviarlos a un punto de análisis. Aprende más en: https://bit.ly/CRA-vitals
reportWebVitals();