import React from 'react';
import classes from './HeadingQuantity.scss';

const HeadingQuantity = ({ quantited, title, colored }) => {
  const colorSelect = {
    backgroundColor: colored,
  };

  return (
    <>
      <div className={classes.HeadingQuantity}>
        <h6>
          {title}
          <span className={classes.cantCard} style={colorSelect}>
            {quantited}
          </span>
        </h6>
      </div>
    </>
  );
};

export default HeadingQuantity;
