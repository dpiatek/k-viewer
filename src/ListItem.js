import React, { Component } from 'react';
import './ListItem.css';

class ListItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <li className="ListItem">
        <div className="ListItem-ImageWrapper">
          <img src={item.cover_url} alt="" />
        </div>
        {/* Todo: don't have the correct font, so no point in setting font weights/padding/size */}
        <div className="ListItem-Title">{item.title}</div>
        <div className="ListItem-Author">by {item.user.username}</div>
        <div>
          <img className="ListItem-Likes" src="" alt="" />{item.likes.length} likes
        </div>
      </li>
    );
  }
}

export default ListItem;
