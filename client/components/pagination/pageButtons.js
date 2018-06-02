import React from 'react';

const pageButtonMaker = ({
  numberOfPages, currentPage, changePageFunc, funcToCall,
}) => {
  const pageButtons = [];
  for (let x = 0; x < numberOfPages; x += 1) {
    pageButtons.push(<div
        className={x === currentPage ? 'pagination-link-active' : 'pagination-link'}
        key={`pagination${x}`}
        onClick={() => {
          funcToCall();
          return changePageFunc(x);
        }}
      >
        {x + 1}
      </div>);
  }
  return pageButtons;
};

export default pageButtonMaker;
