import React from 'react';
import classes from './ContentDetails.scss';

const ContentDetails = ({ significados }) => (
  <div className={classes.ContentDetails}>
    <div className={classes.Wrapper}>
      <p className={classes.Definition}>
        <i className="bx bx-chevrons-right" />
        {significados.contentPrim}:
      </p>
      <p className={classes.Phrases}>{significados.phrasesPrim}</p>
    </div>
    <div className={classes.Wrapper}>
      <p className={classes.Definition}>
        <i className="bx bx-chevrons-right" />
        {significados.contentSecu}:
      </p>
      <p className={classes.Phrases}>{significados.phrasesSecu}</p>
    </div>
  </div>
);

export default ContentDetails;
