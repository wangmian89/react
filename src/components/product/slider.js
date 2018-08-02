import React, { Component } from 'react';

class Slider extends Component {
  render() {
    const { msg } = this.props;
    return(
      <div><img src={msg} alt="产品图" width="100%" height="auto" /></div>
    )
  };
};

export default Slider;