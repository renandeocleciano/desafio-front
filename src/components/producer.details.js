import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProducer, deleteProducer } from "../actions";
import ProducerService from "../services/producer.service";
import { cpf, cnpj } from "cpf-cnpj-validator";

class ProducerDetails extends Component {
  constructor(props) {
    super(props);
    this.getProducer = this.getProducer.bind(this);
    this.removeProducer = this.removeProducer.bind(this);
    this.updateProducer = this.updateProducer.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);

    this.state = {
      currentProducer: {
        id: null,
        doc: "",
        producerName: "",
        farmName: "",
        city: "",
        state: "",
        farmTotal: 0,
        agriculturalArea: 0,
        vegetationArea: 0,
        plantedCrops: [],
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProducer(this.props.match.params.id);
  }

  onHandleChange(e) {
    const { name, value } = e.target;
    this.setState(function (prevState) {
      return {
        currentProducer: {
          ...prevState.currentProducer,
          [name]: value,
        },
      };
    });
  }

  getProducer(id) {
    ProducerService.get(id)
      .then((response) => {
        this.setState({
          currentProducer: response.data && response.data[0],
        });
      })
      .catch((err) => console.log(err));
  }

  removeProducer() {
    ProducerService.delete(this.state.currentProducer.id)
      .then(() => {
        this.props.history.push("/producers");
      })
      .catch((err) => console.log(err));
  }

  updateProducer() {
    this.props
      .updateProducer(this.state.currentProducer.id, this.state.currentProducer)
      .then(() => {
        this.setState({ message: "Produtor atualizado com sucesso!" });
      })
      .catch((e) => {
        this.setState({ message: "Erro ao atualizar o produtor!" });
        console.log(e);
      });
  }

  checkDocIsValid() {
    const { doc } = this.state.currentProducer;
    return !(cpf.isValid(doc) || cnpj.isValid(doc));
  }

  render() {
    const { currentProducer } = this.state;
    return (
      <div>
        {currentProducer ? (
          <div className="edit-form">
            <h3>Details - Producer</h3>
            <form className="submit-form">
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="producerName">Produtor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="producerName"
                    required
                    name="producerName"
                    value={currentProducer.producerName}
                    onChange={this.onHandleChange}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="farmName">Fazenda</label>
                  <input
                    type="text"
                    className="form-control"
                    id="farmName"
                    required
                    name="farmName"
                    value={currentProducer.farmName}
                    onChange={this.onHandleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="city">Cidade</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    required
                    name="city"
                    value={currentProducer.city}
                    onChange={this.onHandleChange}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="state">Estado</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    required
                    name="state"
                    value={currentProducer.state}
                    onChange={this.onHandleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="doc">CPF/CNPJ</label>
                <input
                  type="text"
                  className={
                    "form-control " +
                    (this.checkDocIsValid() ? "is-invalid" : null)
                  }
                  id="doc"
                  name="doc"
                  required
                  value={currentProducer.doc}
                  onChange={this.onHandleChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="farmTotal">
                    Área total em hectares da fazenda
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="farmTotal"
                    required
                    name="farmTotal"
                    value={currentProducer.farmTotal}
                    onChange={this.onHandleChange}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="agriculturalArea">
                    Área agricultável em hectares
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="agriculturalArea"
                    required
                    name="agriculturalArea"
                    value={currentProducer.agriculturalArea}
                    onChange={this.onHandleChange}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="vegetationArea">
                    Área de vegetação em hectares
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="vegetationArea"
                    required
                    name="vegetationArea"
                    value={currentProducer.vegetationArea}
                    onChange={this.onHandleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="plantedCrops">Culturas Plantadas</label>
                <select
                  className="form-control"
                  multiple
                  value={currentProducer.plantedCrops}
                  onChange={this.onHandleChange}
                  name="plantedCrops"
                  id="plantedCrops"
                >
                  <option value="Soja">Soja</option>
                  <option value="Café">Café</option>
                  <option value="Milho">Milho</option>
                  <option value="Algodão">Algodão</option>
                </select>
              </div>
            </form>
            <button
              className="btn btn-danger mr-2"
              onClick={this.removeProducer}
            >
              Remover Produtor
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateProducer}
              disabled={this.checkDocIsValid()}
            >
              Atualizar Produtor
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Produtor não selecionado</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateProducer, deleteProducer })(
  ProducerDetails
);
