/* eslint-disable react/no-danger */
/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import classes from './EjemplosDetails.scss';

const EjemplosDetails = ({ ejemplos, suelenantes, suelendespues, title }) => {
  const replaceWord = (marker, items) => {
    let titleReg = marker;
    titleReg = titleReg.toLowerCase();
    const re = new RegExp(titleReg, 'g');
    const titleHTML = '<span class="bold">' + titleReg + '</span>';
    const words = items.replace(re, titleHTML);
    return { __html: words };
  };
  return (
    <div className={classes.EjemplosDetails}>
      <div className="row">
        <div className="col">
          <h6>Ejemplos</h6>
          <ul>
            {ejemplos.map(item => (
              <li key={item}>
                <div dangerouslySetInnerHTML={replaceWord(title, item)} />
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h6>Suelen venir antes</h6>
          <ul>
            {suelenantes.map(item => (
              <li key={item} className={classes.Minusculas}>
                <span>{item}</span> {title}
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h6>Suelen venir después</h6>
          <ul>
            {suelendespues.map(item => (
              <li key={item}>
                {title} <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EjemplosDetails;
