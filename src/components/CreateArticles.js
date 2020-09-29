import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Global from "../Global";
import Sidebar from "./Sidebar";
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

//Validacion de formulario y alertas
class CreateArticle extends Component {
    url = Global.url;

    tituloRef = React.createRef();
    contenidoRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    componentWillMount(){
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido'
            }
        });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.tituloRef.current.value,
                content: this.contenidoRef.current.value,
            },
        });
        this.validator.showMessages();
        this.forceUpdate();
    };

    saveArticle = (e) => {
        e.preventDefault();

        //Rellenar State con formulario
        this.changeState();

        if(this.validator.allValid()){

            //Hacer peticion para guardar el articulo
            axios.post(this.url + "save", this.state.article).then((res) => {
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: "waiting",
                    });
                    //Subir archivo
                    if(this.setState.selectedFile !== null){
                        //Sacar el id del articulo guardado
                        var articleId = this.state.article._id;
                        //Crear form data y añadir fichero
                        const formData = new FormData();
                        formData.append(
                            'file0',
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        )
                        
                        swal(
                            'Articulo creado',
                            'El articulo ha sido creado correctamente',
                            'success'
                        )

                        //Subir la imagen
                        axios.post(this.url+'upload-image/'+articleId,formData)
                        .then( res => {
                            if(res.data.article){
                                this.setState({
                                    article: res.data.article,
                                    status: "success",
                                });
                            }else{
                                this.setState({
                                    article: res.data.article,
                                    status: "failed",
                                });
                            }
                        });
                    }else{
                        this.setState({
                            status: "success",
                        });
                    }
                } else {
                    this.setState({
                        status: "failed",
                    });
                }
            });
        }else{
            
            this.setState({
                status: "failed",
            });

            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    fileChange = (event) =>{
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    render() {
        if (this.state.status === "success") {
            return <Redirect to={"/blog"} />;
        }
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear articulos</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                ref={this.tituloRef}
                                onChange={this.changeState}
                            />
                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contenidoRef}></textarea>
                            {this.validator.message('content', this.state.article.content, 'required|alpha_space')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>

                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>

                    <Sidebar />
                </section>
            </div>
        );
    }
}

export default CreateArticle;
