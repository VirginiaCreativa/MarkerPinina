import React, { Component } from 'react';
import classes from './UserProfile.scss';

class UserProfile extends Component {
  state = {
    isMenu: false,
  };

  handleShowMenu = () => {
    this.setState({ isMenu: true });
  };

  handleOnMouseMenu = e => {
    this.setState({ isMenu: true });
  };

  handleHideMenu = e => {
    // console.log(e.clientX);
    this.setState({ isMenu: false });
  };

  render() {
    const { userSign } = this.props;
    const { isMenu } = this.state;
    console.log(this.props);
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
            onClick={this.handleShowMenu}
          >
            <i className="bx bx-chevron-down" />
          </button>
          <div>
            {isMenu && (
              <div
                className={classes.isMenuOpen}
                onMouseLeave={this.handleHideMenu}
              >
                <ul>
                  <li>
                    <a href="">item</a>
                  </li>
                  <li>
                    <a href="">item</a>
                  </li>
                  <li>
                    <a href="">item</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default UserProfile;
