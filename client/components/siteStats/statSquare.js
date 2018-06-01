import React from 'react';
import Loader from '../loader';

/**
 * COMPONENT
 */
const StatSquare = (props) => {
  const { name, shorten } = props;
  let { value } = props;
  const showLoad = !value;
  if (shorten) {
    const divThousand = value / 1000;
    if (divThousand >= 1) value = `${Math.round(divThousand * 100) / 100}k`;
  }

  return (
    <div className="group">
      <div className="value center">
        {showLoad ? <Loader type="three_dots" height={50} width={50} /> : value}
      </div>
      <div className="name center">
        <div className="pos">{name}</div>
      </div>
    </div>
  );
};

export default StatSquare;
