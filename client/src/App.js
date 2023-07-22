import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/views/landing/Landing.jsx";
import Cards from "./components/Cards/Cards.jsx";
import Detail from "./components/views/Detail/Detail.jsx";
import Form from "./components/Form/Form.jsx";
 function App() {
  // Configuración de las rutas de navegación
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/home" component={Cards}></Route>
            <Route exact path="/form" component={Form}></Route>
            <Route path="/detail/:id" component={Detail}></Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
 export default App;