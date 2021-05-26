import { connect } from "react-redux";
import React, { Component } from "react";
import { saveToy, loadToys } from "../store/actions/toy.actions.js";

class _ToyAdd extends Component {
  state = {
    toy: {
      type: "Funny",
      name: null,
      img: "https://robohash.org/Katan",
      createdAt: new Date(Date.now()),
      isStock: true,
      price: null,
    },
  };
  componentDidMount() {
    this.props.loadToys();
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "radio" ? +target.value : target.value;
    this.setState((prevState) => ({
      ...prevState,
      toy: {
        ...prevState.toy,
        [field]: value,
      },
    }));
  };
  onSaveToy = (ev) => {
    ev.preventDefault();
    this.props.saveToy(this.state.toy);
    this.props.loadToys();
    this.props.history.push("/toy");
  };
  render() {
    return (
      <section>
        <form onSubmit={this.onSaveToy}>
          <input
            type="text"
            name="name" //just some way to make the inputstate function be dynamic
            onChange={this.handleChange}
            className="toy-input"
            placeholder="name"
            required
          />
          <input
            type="text"
            name="price"
            className="toy-input"
            onChange={this.handleChange}
            placeholder="price"
            required
          />
          <button className="btn btn-save">Save</button>
        </form>
      </section>
    );
  }
}
function mapStateToProps(state) {
  return {
    toys: state.toyModule.toys,
  };
}

const mapDispatchToProps = {
  saveToy,
  loadToys,
};

export const ToyAdd = connect(mapStateToProps, mapDispatchToProps)(_ToyAdd);
