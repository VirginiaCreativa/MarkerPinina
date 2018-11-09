import React, { Component } from 'react';
import HeadingQuantity from '../components/common/heading_quantity/HeadingQuantity';
import PalabrasLists from '../components/palabras/palabras_list/PalabrasList';
import SignificadosLists from '../components/signficados/signficados_list/SignficadosList';

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <>
        <div className="row">
          <div className="col-5">
            <HeadingQuantity title="Palabra" quantited="8" />
            <PalabrasLists />
          </div>
          <div className="col-5">
            <HeadingQuantity title="Siginificados" quantited="6" />
            <SignificadosLists />
          </div>
          <div className="col-2">
            <HeadingQuantity title="Notificado" quantited="14" />
          </div>
        </div>
      </>
    );
  }
}
export default Dashboard;
