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
      <h6>{title}</h6>
      <p className="date">{CURRENT_MESES || date}</p>
      <div className="abrev">{abrev}</div>
      <p className="content">{contentPrim}</p>
      <p className="frase">{phrasesPrim}</p>

      <ul>
        {sinonimos.map(sinom => (
          <li key={sinom}>{sinom}</li>
        ))}
      </ul>
    </div>
  </>
);

export default PalabraItem;
