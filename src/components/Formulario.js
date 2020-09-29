import React, { Component } from "react";
import Slider from "../components/Slider";
import Sidebar from "./Sidebar";

class Formulario extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: {}
        }

        this.recibirFormulario = this.recibirFormulario.bind(this);
    }

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    generoHRef = React.createRef();
    generoMRef = React.createRef();
    generoORef = React.createRef();    

    recibirFormulario (e) {
        e.preventDefault();

        var genero = 'hombre';
        if(this.generoHRef.current.cheked){
            genero = this.generoHRef.current.value;
        }else if(this.generoMRef.current.cheked){
            genero = this.generoMRef.current.value;
        }else{
            genero = this.generoORef.current.value;
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero
        }

        this.setState ({
            user: user
        });
        
        console.log("Enviado...");
        console.log(this.nombreRef.current.value);
    }

    render() {
        if(this.state.user.nombre){
            var user= this.state.user;
        }
        return (
            <div id="formulario">
                <Slider titulo="Formulario" />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Formulario</h1>
                        {/* Mostrar el formulario */}
                        {this.state.user.nombre && 
                            <div id="userData">
                                <p>Nombre: {user.nombre}</p>
                                <p>Apellidos: {user.apellidos}</p>
                                <p>Biografia: {user.bio}</p>
                                <p>Genero: {user.genero}</p>
                            </div>
                        }

                        {/* Crear formulario */}
                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.bioRef}></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHRef}/> Hombre
                                <input type="radio" name="genero" value="mujer" ref={this.generoMRef}/> Mujer
                                <input type="radio" name="genero" value="otro" ref={this.generoORef}/> Otro
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />
                        </form>
                    </div>
                    <Sidebar blog="false" />
                </div>
            </div>
        );
    }
}

export default Formulario;
