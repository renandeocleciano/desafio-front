import React, { Component } from "react";
import { connect } from "react-redux";
import { createProducer } from "../actions";
import { cpf, cnpj } from "cpf-cnpj-validator";

class ProducerAdd extends Component {
  constructor(props) {
    super(props);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.saveProducer = this.saveProducer.bind(this);
    this.newProducer = this.newProducer.bind(this);
    this.onChangePlantedCrops = this.onChangePlantedCrops.bind(this);

    this.state = {
      id: null,
      producerName: "",
      farmName: "",
      doc: "",
      city: "",
      state: "",
      farmTotal: "",
      agriculturalArea: "",
      vegetationArea: "",
      plantedCrops: [],
      submitted: false,
      message: null,
    };
  }

  onHandleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  onChangePlantedCrops(e) {
    let newValue = e.target.value;
    let stateValue = this.state.plantedCrops;

    stateValue.indexOf(newValue) === -1
      ? stateValue.push(newValue)
      : stateValue.length === 1
      ? (stateValue = [])
      : stateValue.splice(stateValue.indexOf(newValue), 1);

    this.setState({
      plantedCrops: stateValue,
    });
  }

  newProducer() {
    this.setState({
      id: null,
      producerName: "",
      farmName: "",
      doc: "",
      city: "",
      state: "",
      farmTotal: "",
      agriculturalArea: "",
      vegetationArea: "",
      plantedCrops: [],
      submitted: false,
      message: null,
    });
  }

  checkDocIsValid() {
    const { doc } = this.state;
    return !(cpf.isValid(doc) || cnpj.isValid(doc));
  }

  saveProducer() {
    const producer = this.state;
    this.props
      .createProducer(producer)
      .then((data) => {
        this.setState({
          id: data.id,
          producerName: data.producerName,
          farmName: data.farmName,
          doc: data.doc,
          farmTotal: data.farmTotal,
          agriculturalArea: data.agriculturalArea,
          vegetationArea: data.vegetationArea,
          plantedCrops: data.plantedCrops,
          city: data.city,
          state: data.state,
          submitted: true,
          message: null,
        });
      })
      .catch((e) => {
        this.setState({
          message: e.response.data.message,
        });
        console.log(e);
      });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Produtor enviado com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newProducer}>
              Adicionar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="producerName">Produtor</label>
                <input
                  type="text"
                  className="form-control"
                  id="producerName"
                  required
                  name="producerName"
                  value={this.state.produceName}
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
                  value={this.state.farmName}
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
                  value={this.state.city}
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
                  value={this.state.state}
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
                value={this.state.doc}
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
                  value={this.state.farmTotal}
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
                  value={this.state.agriculturalArea}
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
                  value={this.state.vegetationArea}
                  onChange={this.onHandleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="plantedCrops">Culturas Plantadas</label>
              <select
                className="form-control"
                multiple
                value={this.state.plantedCrops}
                onChange={this.onChangePlantedCrops}
              >
                <option value="Soja">Soja</option>
                <option value="Café">Café</option>
                <option value="Milho">Milho</option>
                <option value="Algodão">Algodão</option>
              </select>
            </div>
            {this.state.message && (
              <div>
                <small className="badge badge-danger">
                  Erro: {this.state.message}{" "}
                </small>
              </div>
            )}

            <button
              className="btn btn-success"
              onClick={this.saveProducer}
              disabled={this.checkDocIsValid()}
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createProducer })(ProducerAdd);
