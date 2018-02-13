import React from 'react';
import Loader from '../loader';

/**
 * COMPONENT
 */
export default (props) => {
  const { name, value } = props;

  // if (!value) return <Loader />;
  return (
    <div className="group">
      <div className="value center">
        {value || <Loader type="three_dots" height={50} width={50} />}
      </div>
      <div className="name center">
        <div className="pos">{name}</div>
      </div>
    </div>
  );
};
