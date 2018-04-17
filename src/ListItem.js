import React, { Component } from 'react';
import './App.css';

class ListItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <li className="ListItem">
        {item.title}
      </li>
    );
  }
}

export default ListItem;
