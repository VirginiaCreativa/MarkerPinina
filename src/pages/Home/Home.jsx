import React, { Component } from 'react';
import classes from './Home.scss';
import HeadingQuantity from '../../components/common/heading_quantity/HeadingQuantity';
import SignificadosList from '../../components/significados/significados_list/SignificadosList';
import SignificadosGrid from '../../components/significados/significados_grid/SignificadosGrid';
import NotasCornellGrid from '../../components/notascornell/notascornella_grid/NotascornellaGrid';

class Home extends Component {
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
            <div>{switcher ? <SignificadosList /> : <SignificadosGrid />}</div>
          </div>
          <div className="col-5">
            <HeadingQuantity
              title="Notas Cornell"
              quantited="6"
              colored="#1fd1a1"
            />
            <NotasCornellGrid />
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
export default Home;
