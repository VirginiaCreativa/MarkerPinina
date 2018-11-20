/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classes from './ButtonCreates.scss';

class ButtonCreates extends Component {
  state = {
    isMenu: false,
    fade: false,
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.handleHideMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleHideMenu);
  }

  handleShowMenu = () => {
    this.setState(prevState => ({
      isMenu: !prevState.isMenu,
      fade: true,
    }));
  };

  handleHideMenu = e => {
    const xClose = e.offsetX;
    const yClose = e.offsetY;
    if (xClose >= '800' || yClose >= '80') {
      this.setState({
        isMenu: false,
        fade: false,
      });
    }
  };

  render() {
    const { isMenu, fade } = this.state;

    let showMenu = null;
    if (isMenu) {
      showMenu = (
        <div
          className={[
            classes.isMenuOpen,
            fade ? classes.FadeOn : classes.FadeOff,
          ].join(' ')}
        >
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
      );
    }

    return (
      <>
        <div className={classes.ButtonCreates}>
          <button
            className={classes.btnCreate}
            type="button"
            onMouseOver={this.handleShowMenu}
            ref={a => (this.fadeMenu = a)}
          >
            <i className="bx bx-plus-circle" />
            Crear nuevos
          </button>
          <div>{showMenu}</div>
        </div>
      </>
    );
  }
}

export default withRouter(ButtonCreates);
