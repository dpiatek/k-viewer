import React, { Component } from 'react';
import './App.css';
import logo from './Logo.svg';

import ListItem from "./ListItem";

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      predicate: ""
    }

    this.handleTitleFilter = this.handleTitleFilter.bind(this);
    this.handleSortLikes = this.handleSortLikes.bind(this);
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

  handleTitleFilter(event) {
    const { value } = event.target;
    this.setState({ predicate: value.trim() });
  }

  filterValues(predicate, items) {
    return items.filter(item => {
      // Todo: String.includes will need a polyfill in IE11 & friends
      return item.title.includes(predicate);
    })
  }

  handleSortTime() {}

  handleSortLikes() {
    const items = this.state.items.sort((a, b) => b.likes.length - a.likes.length);
    this.setState({ items });
  }

  handleSortTitle() {}

  render() {
    const { items, predicate } = this.state;
    // This is unoptimized but will still work relatively well due to React render algo
    const filteredValues = predicate !== "" ? this.filterValues(predicate, items) : items;
    const showNoItemsFound = predicate !== "" && filteredValues.length === 0;

    return (
      <div className="App">
        <div className="Header">
          <img className="Logo" src={logo} />
          <h1>Latest 100 Shares</h1>
        </div>

        <div className="Controls">
          <input type="text" placeholder="Share title" onChange={this.handleTitleFilter} />

          <div className="Controls-Sort">
            <button type="button" onClick={this.handleSortTime}>Time</button>
            <button type="button" onClick={this.handleSortLikes}>Likes</button>
            <button type="button" onClick={this.handleSortTitle}>Title</button>
          </div>
        </div>

        {showNoItemsFound
          ? <div className="NoResults">No results found. Please try another search</div>
          : <ol className="List">
              {filteredValues.map(item => <ListItem key={item.id} item={item} />)}
            </ol>}
      </div>
    );
  }
}

export default App;
