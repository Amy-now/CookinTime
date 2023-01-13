import React from "react";

class Favorite extends React.Component {
  render() {
    const fav = this.props.booksfav.map((item) => (
      <div className="listbook" key={item.id}>
        <div className="descnya">
          <h3>{item.name}</h3>
          <p>
            <br />
            <span>{item.author}</span>
            <button onClick={() => this.props.delete(item.id)}>
              Delete from Favorite
            </button>
          </p>
        </div>
      </div>
    ));
    return (
      <div>
        <h2>Favorite</h2>
        {fav}
      </div>
    );
  }
}

export default Favorite;
