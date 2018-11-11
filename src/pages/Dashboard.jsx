import React, { Component } from 'react';
import HeadingQuantity from '../components/common/heading_quantity/HeadingQuantity';
import PalabrasLists from '../components/palabras/palabras_list/PalabrasList';
import GramaticasGrid from '../components/gramaticas/gramaticas_grid/GramaticasGrid';

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <>
        <div className="row">
          <div className="col-5">
            <HeadingQuantity title="Palabras" quantited="8" colored="#ff6b6b" />
            <PalabrasLists />
          </div>
          <div className="col-5">
            <HeadingQuantity
              title="Grámaticas"
              quantited="6"
              colored="#1fd1a1"
            />
            <GramaticasGrid />
          </div>
          <div className="col-2">
            <HeadingQuantity
              title="Notificado"
              quantited="14"
              colored="#3a3b98"
            />
          </div>
        </div>
      </>
    );
  }
}
export default Dashboard;
