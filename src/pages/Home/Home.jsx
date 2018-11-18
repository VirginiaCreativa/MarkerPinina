import React, { Component } from 'react';
import classes from './Home.scss';
import HeadingQuantity from '../../components/common/heading_quantity/HeadingQuantity';
import PalabrasLists from '../../components/palabras/palabras_list/PalabrasList';
import PalabrasGrid from '../../components/palabras/palabras_grid/PalabrasGrid';
import NotebookGrid from '../../components/notebook/notebook_grid/NotebookGrid';

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
                  title="Significados"
                  quantited="8"
                  colored="#ff6b6b"
                />
              </div>
              <div className="col">
                <div className={classes.Switcher}>
                  <button onClick={this.handleSwitcherList} type="button">
                    <i className="bx bx-list-alt" />
                  </button>
                  <button onClick={this.handleSwitcherGrid} type="button">
                    <i className="bx bx-grid-alt" />
                  </button>
                </div>
              </div>
            </div>
            <div>{switcher ? <PalabrasLists /> : <PalabrasGrid />}</div>
          </div>
          <div className="col-5">
            <HeadingQuantity
              title="Método Cornell"
              quantited="6"
              colored="#1fd1a1"
            />
            <NotebookGrid />
          </div>
          <div className="col-2">
            <HeadingQuantity
              title="Traducción"
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
