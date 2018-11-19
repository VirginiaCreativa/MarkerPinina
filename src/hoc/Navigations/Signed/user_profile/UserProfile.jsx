/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
    const elm = this.buttonAnim;
    elm.addEventListener('animationstart', this.handleShowMenu);

    // outMenu.addEventListener('click', (e) => {
    //   const yMove = e.offsetY;
    //   // console.log('SCREEN', yMove);
    //   if (yMove >= '60') {
    //     console.log('SALIR', yMove);
    //     return this.handleHideMenu;
    //   }
    // });
    document.addEventListener('click', this.handleHideMenu);
  }

  componentWillUnmount() {
    const elm = this.buttonAnim;
    elm.addEventListener('animationend', this.handleShowMenu);
    document.removeEventListener('click', this.handleHideMenu);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.isMenu && !prevState.isMenu) {
  //     document.addEventListener('mousemove', e => {
  //       if (e.clientX === '822' && e.clientX === '185') {
  //         console.log('SALIR');
  //       }
  //     });
  //   } else {
  //     document.removeEventListener('mousemove', e => {
  //       console.log('REMOVE DiDMount', e.clientX, e.clientY);
  //     });
  //   }
  // }

  handleShowMenu = () => {
    this.setState(prevState => ({
      isMenu: !prevState.isMenu,
      fade: true,
    }));
  };

  handleHideMenu = e => {
    const xClose = e.offsetX;
    const yClose = e.offsetY;
    if (xClose >= '60' || yClose <= '1200') {
      this.setState({ isMenu: false });
    }
  };

  render() {
    const { userSign } = this.props;
    const { isMenu, fade } = this.state;
    let showMenu = null;
    if (isMenu) {
      showMenu = (
        <div
          className={[classes.isMenuOpen, fade ? classes.Fade : ' '].join(' ')}
          onClick={this.handleHideMenu}
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
            ref={a => (this.buttonAnim = a)}
            type="button"
            className={[classes.btnMenuUser, fade ? classes.Fade : ' '].join(
              ' ',
            )}
            onMouseOver={this.handleShowMenu}
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
