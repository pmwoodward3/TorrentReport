import React, { Component } from 'react';
import SVGbase from './SVGbase';
import SVGhover from './SVGhover';

class BuiltBy extends Component {
  constructor(props) {
    super(props);

    this.element = React.createRef();
    this.state = {
      hover: false,
      height: '50px',
      width: '110px',
      style: { fill: 'black' },
      styleHover: { fill: '#26ade4' },
    };
  }

  onMouseEnterHandler = () => {
    this.setState({ hover: true });
  };
  onMouseLeaveHandler = () => {
    this.setState({ hover: false });
  };

  render() {
    const {
      height, width, style, styleHover,
    } = this.state;
    return (
      <div
        className="builtBox"
        ref={this.element}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        {!this.state.hover && <div className="builtby menu-fade-in">BUILT BY</div>}
        <div className="byme">
          <a href="http://estepanov.io">
            {this.state.hover ? (
              <SVGhover style={styleHover} height={height} width={width} />
            ) : (
                <SVGbase style={style} height={height} width={width} />
              )}
          </a>
        </div>
      </div>
    );
  }
}

export default BuiltBy;
