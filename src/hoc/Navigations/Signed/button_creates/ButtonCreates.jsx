import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classes from './ButtonCreates.scss';

const Buscador = () => (
  <>
    <button className={classes.btnCreate} type="button">
      <i className="bx bx-plus-circle" />
      Crear nuevos
      <div className={classes.Menus}>
        <div className={classes.Triangule} />
        <ul>
          <li>
            <Link to="/significados">
              <i className="bx bx-pin" />
              Signficados
            </Link>
          </li>
          <li>
            <Link to="/notascornell">
              <i className="bx bx-book-bookmark" />
              Notas Cornell
            </Link>
          </li>
          <li>
            <Link to="/taduccion">
              <i className="bx bx-transfer" />
              Traduccion
            </Link>
          </li>
        </ul>
      </div>
    </button>
  </>
);

export default withRouter(Buscador);
