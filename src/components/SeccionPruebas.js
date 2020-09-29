import React, { Component } from "react";
import MiComponente from "./MiComponent";

class SeccionPruebas extends Component {
  //contador = 0;

  constructor(props) {
    super(props);
    this.state = {
      contador: 0
    };

    this.sumar = this.sumar.bind(this);
    this.restar = this.restar.bind(this);
  }

  /*state = {
    contador: 0,
  };*/

  HolaMundo(nombre, edad) {
    var presentacion = (
      <div>
        <h2>Hola soy, {nombre}</h2>
        <h3>Tengo, {edad} años</h3>
      </div>
    );
    return presentacion;
  }

  sumar(e) {
    //this.contador += 1;
    this.setState({
      contador: (this.state.contador + 1),
    });
  }

  restar(e) {
    //this.contador -= 1;
    this.setState({
      contador: (this.state.contador - 1)
    });
  }

  render() {
    var nombre = "luis";
    return (
      <section id="content">
        <h2 className="subheader">Últimos artículos</h2>
        <p>{this.props.titulo}</p>
        <h2 className="subheader">Funciones y JSX Basico</h2>
        {this.HolaMundo(nombre, 25)}
        <h2 className="subheader">Componentes</h2>
        <section className="componentes">
          <MiComponente />
        </section>
        <h2 className="subheader">Estado</h2>
        <p>Contador: {this.state.contador}</p>
        <p>
          <input type="button" value="Sumar" onClick={this.sumar} />

          <input
            type="button"
            value="Restar"
            onClick={this.restar}
          />
        </p>
      </section>
    );
  }
}

export default SeccionPruebas;
