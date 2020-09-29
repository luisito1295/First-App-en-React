import axios from 'axios';
import React, { Component } from 'react';
import Global from '../Global';
import Sidebar from './Sidebar';
import logo from '../assets/img/logo.svg';
import Moment from 'react-moment';
import { Redirect, Link } from "react-router-dom";
import swal from 'sweetalert';

class Article extends Component {

    url = Global.url;

    state = {
        article: {},
        status: null
    }

    componentWillMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
                console.log(res.data);
            }).catch(e => {
                this.setState({
                    articles: false,
                    status: 'fail'
                })
            });
    }

    deleteArticle = (id) => {
        var id = this.props.match.params.id;

        swal({
            title: "Estas seguro de borrar el registro?",
            text: "Una vez borrandolo no puede recuperarlo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(this.url + 'article/' + id)
                    .then(res => {
                        this.setState({
                            article: res.data.article,
                            status: 'delete'
                        })
                    });
                    swal(
                        'Articulo borrado',
                        'El articulo ha sido borrado correctamente',
                        'success'
                    )
            } else {
                swal(
                    'Articulo no se ha borrado',
                )
            }
        });

    }

    render() {
        if (this.state.status === 'delete') {
            return <Redirect to='/blog' />
        }
        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    {this.state.article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {
                                    article.image !== null ? (
                                        <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                    ) : (
                                            <img src={logo} alt={article.title} />
                                        )
                                }
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow> {article.date} </Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>

                            <button className="btn btn-danger" onClick={() => { this.deleteArticle(article._id) }}>Eliminar</button>
                            <Link to={'/blog/editar/'+article._id} className="btn btn-warning">Editar</Link>

                            <div className="clearfix"></div>
                        </article>
                    }
                    {!this.state.article && this.state.status === 'success' &&
                        <div id="article">
                            <h2 className="subheader">El articulo no existe</h2>
                            <p>Intentalo mas tarde</p>
                        </div>
                    }
                    {!this.state.status == null &&
                        <div id="article">
                            <h2 className="subheader">Cargando...</h2>
                            <p>Por favor espere</p>
                        </div>
                    }
                    <Sidebar />
                </section>
            </div>
        )
    }
}

export default Article;
