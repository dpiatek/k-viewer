import React, { Component } from 'react';
import './App.css';
import logo from './Logo.svg';

import ListItem from "./ListItem";

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    window
      .fetch("http://api.kano.me/share?limit=100")
      .then(res => res.json())
      .then(data => this.setState({ items: data.entries }))
      .catch(err => {
        console.error(err)
      });
  }

  render() {
    const { items } = this.state;

    return (
      <div className="App">
        <div className="Header">
          <img className="Logo" src={logo} />
          <h1>Latest 100 Shares</h1>
        </div>
        <ol className="List">
          {items.map(item => <ListItem key={item.id} item={item} />)}
        </ol>
      </div>
    );
  }
}

export default App;
