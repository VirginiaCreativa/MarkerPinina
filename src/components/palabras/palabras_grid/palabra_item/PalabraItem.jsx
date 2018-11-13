import React from 'react';
import classes from './PalabraItem.scss';

const PalabraItem = ({ title, contentPrim, lsc }) => (
  <>
    <div className={classes.PalabraItem}>
      <div className={classes.View}>
        <img src={lsc} alt="" className="img-fluid" />
      </div>
      <div className={classes.Grid}>
        <div>
          <i className="bx bx-pin" />
        </div>
        <div className={classes.Content}>
          <h4>{title}</h4>
          <p>{contentPrim}</p>
        </div>
      </div>
    </div>
  </>
);

export default PalabraItem;
