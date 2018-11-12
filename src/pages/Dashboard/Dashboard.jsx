import React, { Component } from 'react';
import classes from './Dashboard.scss';
import HeadingQuantity from '../../components/common/heading_quantity/HeadingQuantity';
import PalabrasLists from '../../components/palabras/palabras_list/PalabrasList';
import GramaticasGrid from '../../components/gramaticas/gramaticas_grid/GramaticasGrid';

class Dashboard extends Component {
  state = {
    switcher: true,
  };

  handleSwitcherList = () => {
    this.setState({ switcher: true });
  };

  handleSwitcherGrid = () => {
    this.setState({ switcher: false });
  };

  render() {
    const { switcher } = this.state;
    return (
      <>
        <div className="row">
          <div className="col-5">
            <div className="row">
              <div className="col">
                <HeadingQuantity
                  title="Palabras"
                  quantited="8"
                  colored="#ff6b6b"
                />
              </div>
              <div className="col">
                <div className={classes.Switcher}>
                  <button onClick={this.handleSwitcherGrid} type="button">
                    <i className="bx bx-grid-alt" />
                  </button>
                  <button onClick={this.handleSwitcherList} type="button">
                    <i className="bx bx-list-alt" />
                  </button>
                </div>
              </div>
            </div>
            {switcher ? <PalabrasLists /> : 'Grid'}
          </div>
          <div className="col-5">
            <HeadingQuantity title="Notebook" quantited="6" colored="#1fd1a1" />
            <GramaticasGrid />
          </div>
          <div className="col-2">
            <HeadingQuantity
              title="Proyectos"
              quantited="3"
              colored="#3a3b98"
            />
          </div>
        </div>
      </>
    );
  }
}
export default Dashboard;
