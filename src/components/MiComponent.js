import React, { Component } from "react";

class MiComponente extends Component{
    
    render(){
        let receta = {
            nombre: 'pizza',
            ingre: ['tomate', 'queso', 'masa'],
            calorias: 150
        }
        return(
            <div className="micomponente">
                <h1>{'Nombre: ' + receta.nombre}</h1>
                <h2>{'Calorias: ' + receta.calorias}</h2>
                {
                    receta.ingre.map((ingre, i) => {
                        return (
                            <li key={i}>
                                {ingre}
                            </li>
                        )
                    })
                }
                <hr/>
                {this.props.saludo &&
                    <>
                        <h2>Desde un MiComponente</h2>
                        <h3>{this.props.saludo}</h3>
                    </>
                }
            </div>
        )
    }
}

export default MiComponente;
