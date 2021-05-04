import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveProducers } from '../actions';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

class ProducersList extends Component {

  componentDidMount() { this.props.retrieveProducers(); }

  render() {
    const { producers } = this.props;

    return (
      <div>
        <Table size="sm" striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Doc</th>
              <th>Produtor</th>
              <th>Fazenda</th>
              <th>Culturas Plantadas</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {producers && producers.map((row) => (
              <tr key={row.id}>
                <th>{row.id}</th>
                <th>{row.doc}</th>
                <th>{row.producerName}</th>
                <th>{row.farmName}</th>
                <th>{
                  row.plantedCrops && 
                  row.plantedCrops.map((pc, i) =>
                    <span key={i}>
                      { i > 0 && ", "}
                      <span>{pc}</span>
                  </span>
                )}</th>
                <th>
                  <Link 
                    to={"/details/"+row.id} 
                    className="badge badge-warning">
                      Detalhes
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { producers: state.producers }
}

export default connect(mapStateToProps, {
  retrieveProducers
})(ProducersList);
