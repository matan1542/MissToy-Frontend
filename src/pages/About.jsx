/* eslint-disable default-case */
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { Component } from "react";
import Button from "@material-ui/core/Button";
class _GoogleMap extends Component {
  state = {
    pos: {
      lat: 32.109333,
      lng: 34.855499,
    },
  };

  panMap = (locName) => {
    let pos = {};
    switch (locName) {
      case "TEL_AVIV":
        pos.lat = 32.109333;
        pos.lng = 34.855499;
        break;
      case "HAWAII":
        pos.lat = 20.798363;
        pos.lng = -156.331924;
        break;
      case "NEW_YORK":
        pos.lat = 40.73061;
        pos.lng = -73.935242;
        break;
      default:
        pos.lat = 32.109333;
        pos.lng = 34.855499;
    }
    this.setState({ pos });
  };

  render() {
    return (
      <div className="about-page">
        <div className="btn-location-container">
          <Button variant="outlined" onClick={() => this.panMap("TEL_AVIV")}>
            Tel Aviv
          </Button>
          <Button variant="outlined" onClick={() => this.panMap("HAWAII")}>
            Hawaii
          </Button>
          <Button variant="outlined" onClick={() => this.panMap("NEW_YORK")}>
            New York
          </Button>
        </div>
        <div className="map-about">
          <Map
            google={this.props.google}
            zoom={10}
            initialCenter={{
              lat: 32.109333,
              lng: 34.855499,
            }}
            center={this.state.pos}
            style={{
              maxWidth: "550px",
              height: "450px",
              margin: "0 auto",
            }}
            containerStyle={{
              maxWidth: "550px",
              height: "450px",
              margin: "0 auto",
            }}
          >
            <Marker position={this.state.pos} name={"branch location"} />
          </Map>
        </div>
      </div>
    );
  }
}

export const About = GoogleApiWrapper({
  apiKey: "AIzaSyDu60DBoSBmTbdyFbq4kBMadZFAhdfJJxs",
})(_GoogleMap);
