import React from 'react';
import classes from './PalabraItem.scss';

import { CURRENT_MESES } from '../../../../config/date';

const PalabraItem = ({
  title,
  abrev,
  contentPrim,
  phrasesPrim,
  date,
  sinonimos,
}) => (
  <>
    <div className={classes.PalabraItem}>
      <div className={classes.Grid}>
        <i className="bx bx-font-color" />
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
        <p className={classes.DateStyle}>
          <i className="bx bx-calendar" />
          {CURRENT_MESES || date}
        </p>
      </div>
    </div>
  </>
);

export default PalabraItem;
