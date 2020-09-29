import React, {Component} from "react";

class Pelicula extends Component{
  marcar = () => {
    this.props.marcarFavorita(this.props.pelicula, this.props.indice);
  }
    render(){
        const {titulo} = this.props.pelicula
        return(
            <article class="article-item" id="article-template">
              <div class="image-wrap">
                <img
                  src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8"
                  alt="Paisaje"
                />
              </div>

              <h2>{titulo}</h2>
              <span class="date">Hace 5 minutos</span>
              <a href="#">Leer más</a>
              <button onClick={this.marcar}>Marcar como favorita</button>

              <div class="clearfix"></div>
            </article>
        )
    }
}

export default Pelicula