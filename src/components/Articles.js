import React, { Component } from 'react';
import axios from 'axios';
import 'moment/locale/es';
import {Link} from 'react-router-dom';
import logo from '../assets/img/logo.svg';
import Global from '../Global';
import Moment from 'react-moment';

class Articles extends Component {

    url = Global.url;

    state = {
        articles: {},
        status: ''
    }

    componentWillMount() {
        var home = this.props.home;
        var search = this.props.search;

        if(home==='true'){
            this.getLastArticles();
        }else if(search && search !== null && search !== undefined){
            this.getArticlesBySearch(search);
        }else{
            this.getArticles();
        }

    }

    getArticlesBySearch = (searched) => {
        console.log("Articles");
        axios.get(this.url+"search/"+searched)
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                })
            }).catch(e => {
                this.setState({
                    articles: {},
                    status: 'success'
                })
            });
    }

    getLastArticles = () => {
        console.log("Articles");
        axios.get(this.url+"articles/last")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                })
            });
    }

    getArticles = () => {
        console.log("Articles");
        axios.get(this.url+"articles")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                })
            });
    }

    render() {
        if (this.state.articles.length >= 1) {
            var listArticles = this.state.articles.map((article) => {
                return (
                    <article key={article._id} className="article-item" id="article-template">
                        <div className="image-wrap">
                            {
                                article.image !== null ? (
                                    <img src={this.url+'get-image/'+article.image} alt={article.title} /> 
                                ):(
                                    <img src={logo} alt={article.title} />
                                )
                            }
                            
                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment locale="es" fromNow> {article.date} </Moment>
                        </span>
                        <Link to={'/blog/articulo/'+article._id}>Leer más</Link>

                        <div className="clearfix"></div>
                    </article>
                )
            });

            return (
                <div id="articles">
                    <h1>{listArticles}</h1>
                </div>
            );
        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h1 className="subheader">No hay articulos</h1>
                    <p>No hay contendio en esta seccion</p>
                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h1 className="subheader">Cargando...</h1>
                    <p>Espere mientras carga el contenido</p>
                </div>
            );
        }

    }
}

export default Articles;
