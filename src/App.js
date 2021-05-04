import React, { Component } from 'react';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ProducersList from './components/producers.list';
import ProducerAdd from './components/producer.add';
import ProducerDetails from './components/producer.details';
import ProducerDashBoard from './components/producer.dashboard';

class App extends Component {

  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/producers"} className="navbar-brand">
            Desafio - Renan Tavares
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/producers"} className="nav-link">
                Produtores
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Novo Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/producers"]} component={ProducersList} />
            <Route exact path="/add" component={ProducerAdd} />
            <Route path="/details/:id" component={ProducerDetails} />
            <Route exact path="/dashboard" component={ProducerDashBoard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
