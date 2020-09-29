import React, { Component } from "react";
import Pelicula from "./Pelicula";
import Slider from "./Slider";

class Peliculas extends Component {
  
  constructor(props) {
    super(props);
    
    this.cambiarTitulo = this.cambiarTitulo.bind(this);
    this.favorita = this.favorita.bind(this);
  };

  cambiarTitulo(e){
    var {peliculas}=this.state;
    var random = Math.floor(Math.random()*3);
    console.log(random);
    //peliculas[random].titulo = "Halo ODST";
    peliculas[0].titulo = "Halo ODST";
    this.setState({
      peliculas: peliculas
    })
  }

  favorita(pelicula, indice){
    console.log("Favorita marcada");
    console.log(pelicula, indice);
    this.setState({
      favorita: pelicula
    })
  }

  componentWillMount(){
    console.log("Se ha montar el componente");
    this.state = {
      peliculas: [
        { titulo: "Halo 1" },
        { titulo: "Halo 2" },
        { titulo: "Halo 3" },
        { titulo: "Halo 4" },
      ],
      nombre: "Luis",
      favorita: ''
    }
  }

  /*
    Did: despues de la salida del elemento
    Will: Antes de la salida del elemento
  */

  componentDidMount(){
    console.log("Ya se monto el componente");
  }
  
  componentWillUnmount(){
    //alert("Final");
  }

  render() {
    var pStyle = {
      background: 'green',
      color: 'white',
      padding: '10px'      
    };

    var favorita;
    if(this.state.favorita.titulo){
      favorita = (
        <p className="favorita" style={pStyle}>
          <strong>La pelicula favorita es:</strong>
          <strong>{this.state.favorita.titulo}</strong>
        </p>
      );
    }else{
      favorita = (
        <p>No hay pelicula favorita</p>
      )
    }

    return (
      
      <div id="content" className="peliculas">
        <Slider titulo="Peliculas" />
        <h4 className="subheader">Peliculas</h4>
        <p>Selccion de peliculas favoritas de {this.state.nombre} </p>
        
        <p><button onClick={this.cambiarTitulo}>Cambiar titulo</button></p>

        {/* Datos del Hijo al padre usando condicional ternario*/}
        {/*this.state.favorita.titulo ? (
            <p className="favorita" style={pStyle}>
              <strong>La pelicula favorita es:</strong>
              <strong>{this.state.favorita.titulo}</strong>
            </p>
          ) : (
            <p>No hay pelicula favorita</p>
          )*/
        }
        {favorita}
            
        {/* Datos del padre al hijo */}
        <div id="articles" className="peliculas">
        {this.state.peliculas.map((pelicula, i) => {
          return (
            <Pelicula
            key={i}
            pelicula={pelicula}
            indice={i}
            marcarFavorita={this.favorita}/>
          );
        })}
        </div>
      </div>
    );
  }
}

export default Peliculas;
