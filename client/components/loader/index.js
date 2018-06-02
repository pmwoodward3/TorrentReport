import React, { Component } from 'react';
import Loading from 'react-loading-components';
import randomString from './random';

import './style.scss';

const Loader = (props) => {
  let {
    width, height, type, fill, message,
  } = props;
  if (!width) width = 110;
  if (!height) height = 110;
  if (!type) type = 'ball_triangle';
  fill = 'black';
  if (message === 'random') message = randomString();
  return (
    <div className="holder">
      <Loading type={type} width={width} height={height} fill={fill} />
      {message && <div className="loading_text">{message}</div>}
    </div>
  );
};

export default Loader;
