import React, { Component } from 'react';
import classes from './Pages.scss';
import PalabrasLists from '../components/palabras/palabras_list/PalabrasList';
import SignificadosLists from '../components/signficados/signficados_list/SignficadosList';

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <>
        <div className={classes.Dashboard}>
          <div className="row">
            <div className="col-5">
              <h6>
                Palabras <span className={classes.cantCard}>8</span>
              </h6>
              <PalabrasLists />
            </div>
            <div className="col-5">
              <h6>
                Siginificados <span className={classes.cantCard}>6</span>
              </h6>
              <SignificadosLists />
            </div>
            <div className="col-2">
              <h6>
                Notifications <span className={classes.cantCard}>14</span>
              </h6>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Dashboard;
