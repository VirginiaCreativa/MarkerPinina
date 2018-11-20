/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './UserProfile.scss';

class UserProfile extends Component {
  state = {
    isMenu: false,
    fade: false,
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.handleHideMenu);
    this.fadeMenu.addEventListener('animationend', this.handleHideMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleHideMenu);
    this.fadeMenu.removeEventListener('animationstart', this.handleShowMenu);
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
    if (xClose >= '1200' || yClose >= '80') {
      this.setState({
        isMenu: false,
        fade: false,
      });
    }
  };

  render() {
    const { userSign } = this.props;
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
                <i className="bx bx-user-circle" />
                Perfíl
              </Link>
            </li>
            <li>
              <Link to="/notascornell">
                <i className="bx bx-cog" />
                Configaración
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bx bx-lock-open" />
                Salir
              </Link>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <>
        <div className={classes.UserProfile}>
          {userSign ? (
            <div className={classes.CircleImg} />
          ) : (
            <div className={classes.CircleAnomy}>VS</div>
          )}

          <p>Virginia Velásquez</p>
          <button
            type="button"
            className={classes.btnMenuUser}
            onMouseOver={this.handleShowMenu}
            ref={a => (this.fadeMenu = a)}
          >
            <i className="bx bx-chevron-down" />
          </button>
          <div>{showMenu}</div>
        </div>
      </>
    );
  }
}

export default UserProfile;
