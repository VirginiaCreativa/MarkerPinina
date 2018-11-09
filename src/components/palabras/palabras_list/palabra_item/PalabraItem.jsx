import React from 'react';
import classes from './PalabraItem.scss';

const PalabraItem = () => (
  <>
    <div className={classes.PalabraItem}>
      <h4>Palabra Lista 1</h4>
      <ul>
        <li>
          <span className="abrev">tr</span>
          <p className="content">Envolver, enredar a alguien en algo:</p>
          <p className="frase">Esa prueba le implicaba en el crimen. </p>
        </li>
        <li>
          <span className="abrev">tr</span>
          <p className="content">Contener, llevar en sí, significar:</p>
          <p className="frase">Su respuesta implicaba reproche.</p>
        </li>
      </ul>
    </div>
  </>
);

export default PalabraItem;
