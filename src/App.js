import React from "react";
import "./assets/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Componentes
// import MiComponente from "./components/MiComponent";
// import Peliculas from "./components/Peliculas";
import Router from './Router';

function App() {
  return (
    <div className="App">
      <Router />
      {/*<SeccionPruebas />*/}
      {/*<Peliculas />*/}
    </div>
  );
}

export default App;
