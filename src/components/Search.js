import React, {Component} from 'react';
import Slider from '../components/Slider';
import Articles from './Articles';
import Sidebar from './Sidebar';

class Search extends Component{
    render(){
        
        var searched = this.props.match.params.search;
        return(
            <div id="blog">
                <Slider titulo={'Busqueda: '+searched} />
                <div className="center">
                    <div id="content">
                        {/* Listar articulos */}
                        <Articles 
                            search={searched}
                        />
                    </div>
                    <Sidebar blog="true" />
                </div>
            </div>
        )
    }
}

export default Search;
