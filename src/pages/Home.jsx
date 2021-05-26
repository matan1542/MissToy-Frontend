import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

class _Home extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <section>
        <div className="home-page-container">
          <h1 className="home-page-title">Welcome To MissToy!</h1>
          <br />
          <h2 className="home-page-secondery-title">
            Your Shop for toys and games
          </h2>
          <Link className="home-btn decoration none" to={"/toy"}>
            <Button
              className="home-btn-controller"
              variant="outlined"
              color="secondary"
            >
              Shop Now
            </Button>
          </Link>
          <img
            className="home-page-image"
            src="homepage.jpg"
            alt="homepage img"
          />
        </div>
        {/* <h3>
                    <button onClick={this.props.dec}>-</button>
                    {this.props.val}
                    <button onClick={this.props.inc}>+</button>
                </h3>
                <pre>{this.props.carsToShow}</pre>
                <hr />
                <section>
                    <h4>Cart:</h4>
                    <pre>{this.props.cart}</pre>
                </section>
                <div>
                    <img src="assets/img/logo.png" alt="Our Logo" />
                </div> */}
      </section>
    );
  }
}

export const Home = connect()(_Home);
