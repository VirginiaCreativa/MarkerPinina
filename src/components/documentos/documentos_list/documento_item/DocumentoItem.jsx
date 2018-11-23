import React from 'react';
import classes from './DocumentoItem.scss';
import { CURRENT_MESES } from '../../../../config/date';

const DocumentoItem = ({ title, etiqueta, date }) => (
  <>
    <div className={classes.DocumentoItem}>
      <div className={classes.Wrapper}>
        <h4>{title}</h4>
        <p className={classes.DateStyle}>
          <i className="bx bx-calendar" />
          {CURRENT_MESES || date}
        </p>
        <ul>
          {etiqueta.map(etq => (
            <li key={etq}>{etq}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default DocumentoItem;
