import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveGroupedProducer } from "../actions";
import ProducerService from "../services/producer.service";
import { Pie } from "react-chartjs-2";

class ProducerDashboard extends Component {
  constructor(props) {
    super(props);
    this.getDashboard = this.getDashboard.bind(this);

    this.state = {
      labels: ["Rio de Janeiro", "São Paulo", "Minas Gerais", "Bahia", "Mato Grosso"],
      datasets: [
        {
          label: "Estados",
          backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4", "#6800B4"],
          hoverBackgroundColor: [
            "#501800",
            "#4B5000",
            "#175000",
            "#003350",
            "#35014F",
          ],
          data: [65, 59, 80, 81, 56],
        },
      ],
    };
  }

  componentDidMount() {
    this.getDashboard('farmName');
  }

  getDashboard(column) {
    ProducerService.getGroupedBy(column)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-4">
            <Pie
              data={this.state}
              options={{
                title: {
                  display: true,
                  text: "Gráfico de pizza por estado.",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { retrieveGroupedProducer })(ProducerDashboard);
