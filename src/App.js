import React, { Component } from 'react';
import './App.css';

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
        <ol className="List">
          {items.map(item => <ListItem key={item.id} item={item} />)}
        </ol>
      </div>
    );
  }
}

export default App;
