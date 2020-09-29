import React, {Component} from 'react';
import Slider from '../components/Slider';
import Articles from './Articles';
import Sidebar from './Sidebar';

class Blog extends Component{

    state={
        articles: {},
        status: null,
    }

    render(){
        return(
            <div id="blog">
                <Slider titulo='Blog' />
                <div className="center">
                    <div id="content">
                        {/* Listar articulos */}
                        <Articles />
                    </div>
                    <Sidebar blog="true" />
                </div>
            </div>
        )
    }
}

export default Blog;
