import React from 'react';
import classes from './SignificadoItem.scss';

const SignificadoItem = ({ title, abrev, contentPrim, sinonimos, images }) => (
  <>
    <div className={classes.SignificadoItem}>
      <div className={classes.Grid}>
        <div className={classes.Img}>
          <img src={images} alt={title} />
        </div>
      </div>
      <div className={classes.Grid}>
        <h5>
          {title}
          <span className={[classes.Abrev, 'tag'].join(' ')}>{abrev}</span>
        </h5>
        <p className={classes.Content}>{contentPrim}</p>
        <ul className={classes.Sinonimos}>
          {sinonimos.map(sinom => (
            <li key={sinom}>{sinom}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default SignificadoItem;
