import React from 'react';
import classes from './UserProfile.scss';

const UserProfile = ({ userSign }) => (
  <div className={classes.UserProfile}>
    {userSign ? (
      <div className={classes.CircleImg} />
    ) : (
      <div className={classes.CircleAnomy}>VS</div>
    )}

    <p>Virginia Velásquez</p>
    <button type="button">
      <i className="bx bx-chevron-down" />
    </button>
  </div>
);

export default UserProfile;
