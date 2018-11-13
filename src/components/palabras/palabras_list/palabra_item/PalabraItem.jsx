import React from 'react';
import classes from './PalabraItem.scss';

const PalabraItem = ({ title, abrev, contentPrim, phrasesPrim, sinonimos }) => (
  <>
    <div className={classes.PalabraItem}>
      <div className={classes.Grid}>
        <i className="bx bx-pin" />
      </div>
      <div className={classes.Grid}>
        <h4>
          {title}
          <span className={classes.Abrev}>{abrev}</span>
        </h4>
        <p className={classes.Content}>{contentPrim}</p>
        <p className={classes.Phrases}>
          &ldquo;
          {phrasesPrim}
          &rdquo;
        </p>
        <ul className={classes.Sinonimos}>
          {sinonimos.map(sinom => (
            <li key={sinom}>{sinom}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default PalabraItem;
