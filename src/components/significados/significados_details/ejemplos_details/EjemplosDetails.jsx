import React from 'react';
import classes from './EjemplosDetails.scss';

const GramaticaDetails = ({ ejemplos, suelenantes, suelendespues, title }) => (
  <div className={classes.EjemplosDetails}>
    <div className="row">
      <div className="col">
        <h6>Ejemplos</h6>
        <ul>
          {ejemplos.map(item => (
            <li key={item}>{item}</li>
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

export default GramaticaDetails;
