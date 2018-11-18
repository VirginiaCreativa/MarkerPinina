import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classes from './SignedInLinks.scss';

const SignedInLinks = () => (
  <>
    <div className={['nav', classes.SignedInLinks].join(' ')}>
      <div className={classes.Grid}>
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
      </div>
      <div className={classes.Grid}>
        <Link to="/" className={classes.User}>
          <div className={classes.Circle}>VS</div>
          <p>Virginia Velásquez</p>
          <i className="bx bx-chevron-down" />
        </Link>
      </div>
    </div>
  </>
);

export default withRouter(SignedInLinks);
