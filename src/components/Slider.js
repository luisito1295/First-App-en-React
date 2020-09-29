import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Slider extends Component {
  render() {
    return (
      <div id="slider" className="slider-big">
        <h1>
          {this.props.titulo}
        </h1>
        {this.props.btn &&
          <Link className="btn-white">{this.props.btn}</Link>
        }
      </div>
    );
  }
}

export default Slider;
