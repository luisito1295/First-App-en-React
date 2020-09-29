import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Global from "../Global";
import Sidebar from "./Sidebar";
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import logo from '../assets/img/logo.svg';

//1. Recoger el id del articulo a editar
//2. Crear un metodo para sacar el objeto del backend
//3. Rellenar el formulario con esos datos
//4. Actualizar el objeto haciendo una peticion al backend
class EditArticle extends Component {
    url = Global.url;

    articleId = null;
    tituloRef = React.createRef();
    contenidoRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    componentWillMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido'
            }
        });
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.tituloRef.current.value,
                content: this.contenidoRef.current.value,
                image: this.state.article.image
            },
        });
        this.validator.showMessages();
        this.forceUpdate();
    };

    saveArticle = (e) => {
        e.preventDefault();

        //Rellenar State con formulario
        this.changeState();

        if (this.validator.allValid()) {

            //Hacer peticion para guardar el articulo
            axios.put(this.url + "article/" + this.articleId, this.state.article).then((res) => {
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: "waiting",
                    });
                    //Subir archivo
                    if (this.setState.selectedFile !== null) {
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
                        axios.put(this.url + 'upload-image/' + articleId, formData)
                            .then(res => {
                                if (res.data.article) {
                                    this.setState({
                                        article: res.data.article,
                                        status: "success",
                                    });
                                } else {
                                    this.setState({
                                        article: res.data.article,
                                        status: "failed",
                                    });
                                }
                            });
                    } else {
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
        } else {

            this.setState({
                status: "failed",
            });

            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    render() {
        var article = this.state.article;
        if (this.state.status === "success") {
            return <Redirect to={"/blog"} />;
        }
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar articulos</h1>
                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={article.title}
                                    ref={this.tituloRef}
                                    onChange={this.changeState}
                                />
                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" defaultValue={article.content} ref={this.contenidoRef}></textarea>
                                {this.validator.message('content', this.state.article.content, 'required|alpha_space')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <br />
                                <br />
                                <div className="image-wrap">
                                    {
                                        article.image !== null ? (
                                            <img className="img" src={this.url + 'get-image/' + article.image} alt={article.title} />
                                        ) : (
                                                <img src={logo} alt={article.title} />
                                            )
                                    }
                                </div>
                                <br/>
                                <input type="file" name="file0" onChange={this.fileChange} />
                            </div>

                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    }
                    {!this.state.article.title &&
                        <h2 className="subheader">Cargando...</h2>
                    }

                    <Sidebar />
                </section>
            </div>
        );
    }
}

export default EditArticle;
