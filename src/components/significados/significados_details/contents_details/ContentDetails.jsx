import React from 'react';
import classes from './ContentDetails.scss';

const ContentDetails = ({
  contentPrim,
  contentSecu,
  phrasesPrim,
  phrasesSecu,
}) => (
  <div className={classes.ContentDetails}>
    <div className={classes.Wrapper}>
      <p className={classes.Definition}>
        <i className="bx bx-chevrons-right" />
        {contentPrim}:
      </p>
      <p className={classes.Phrases}>{phrasesPrim}</p>
    </div>
    <div className={classes.Wrapper}>
      <p className={classes.Definition}>
        <i className="bx bx-chevrons-right" />
        {contentSecu}:
      </p>
      <p className={classes.Phrases}>{phrasesSecu}</p>
    </div>
  </div>
);

export default ContentDetails;
