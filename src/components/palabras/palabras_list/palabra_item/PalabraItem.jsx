import React from 'react';
import classes from './PalabraItem.scss';

const PalabraItem = ({
  title,
  abrev,
  contentPrim,
  contentSecu,
  phrasesPrim,
  phrasesSecu,
  date,
}) => (
  <>
    <div className={classes.PalabraItem}>
      <h6>{title}</h6>
      <p className="date">{date}</p>
      <div className="abrev">{abrev}</div>
      <p className="content">{contentPrim}</p>
      <p className="frase">{phrasesPrim}</p>
      <p className="content">{contentSecu}</p>
      <p className="frase">{phrasesSecu}</p>
    </div>
  </>
);

export default PalabraItem;
