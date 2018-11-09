import React, { Component } from 'react';

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <>
        <div className="row">
          <div className="col-4">
            <h2>Palabras</h2>
          </div>
          <div className="col-4">
            <h2>Significados</h2>
          </div>
          <div className="col-4">
            <h2>Notificiación</h2>
          </div>
        </div>
      </>
    );
  }
}
export default Dashboard;
