import React from 'react';
import classes from './Buscador.scss';

const Buscador = () => (
  <div className={classes.Buscador}>
    <i className="bx bx-search" />
    <input type="text" placeholder="Buscador" />
  </div>
);

export default Buscador;
