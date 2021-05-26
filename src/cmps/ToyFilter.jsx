import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

export default class ToyFilter extends Component {
  state = {
    name: "",
    type: "all",
    inStock: "all",
  };
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "radio" ? +target.value : target.value;
    this.setState(
      (prevState) => ({
        ...prevState,
        [field]: value,
      }),
      () => this.props.loadToys(this.state)
    );
  };

  render() {
    const { user } = this.props;
    return (
      <div className="toy-filter-main-container">
        <div className="toy-filter-container">
          <div className="toy-filter-controlles-container">
            <TextField
              label="Search"
              name="name"
              className="filter-name"
              style={{
                flexGrow: "2",
                marginInlineEnd: ".2rem",
                maxWidth: "100%",
              }}
              onChange={this.handleChange}
              color="primary"
            />
            <FormControl
              variant="outlined"
              style={{ flexGrow: "1", marginInlineEnd: ".2rem" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="type"
                className="filter-type"
                value={this.state.type}
                onChange={this.handleChange}
                label="Type"
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"programmer"}>programmer</MenuItem>
                <MenuItem value={"Educational"}>Educational</MenuItem>
                <MenuItem value={"Toddles"}>Toddles</MenuItem>
                <MenuItem value={"Adult"}>Adult</MenuItem>
                <MenuItem value={"funny"}>funny</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              style={{ flexGrow: "1", marginInlineEnd: ".2rem" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                In Stock
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="inStock"
                className="filter-type"
                value={this.state.inStock}
                onChange={this.handleChange}
                label="inStock"
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"true"}>In Stock</MenuItem>
                <MenuItem value={"false"}>Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </div>
          {user && user.isAdmin && (
            <div className="filter-btn flex">
              <Link className="btn btn-add decoration-none" to="/toy/add">
                Add Toy
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}
