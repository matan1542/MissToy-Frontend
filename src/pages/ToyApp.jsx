import { connect } from "react-redux";
import React from "react";
import { ToyList } from "../cmps/ToyList";

import {
  loadToys,
  saveToy,
  removeToy,
  setToys,
  updateToy,
  setSelectedToy,
  setFilterBy,
} from "../store/actions/toy.actions.js";
import { ToyModal } from "../cmps/ToyModal";
import { Route, Switch } from "react-router-dom";
import ToyFilter from "../cmps/ToyFilter";

class _ToyApp extends React.Component {
  componentDidMount() {
    this.props.loadToys();
  }

  render() {
    const { toys, saveToy, removeToy, updateToy, loadToys, setFilterBy, user } =
      this.props;
    if (!toys) return <div>Loading...</div>;
    return (
      <section>
        <Switch>
          <Route
            component={() => (
              <ToyModal
                saveToy={saveToy}
                updateToy={updateToy}
                loadToys={loadToys}
              />
            )}
            path={`/toy/:toyId/edit`}
          />
          <Route
            component={() => <ToyModal saveToy={saveToy} />}
            path={`/toy/add`}
          />
        </Switch>
        <ToyFilter
          saveToy={saveToy}
          loadToys={loadToys}
          setFilterBy={setFilterBy}
          user={user}
        />
        <ToyList toys={toys} user={user} removeToy={removeToy} />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    toys: state.toyModule.toys,
    selectedToy: state.toyModule.selectedToy,
    filterBy: state.toyModule.filterBy,
    user: state.userModule.loggedInUser,
    reviews: state.reviewModule.reviews,
  };
}
const mapDispatchToProps = {
  loadToys,
  saveToy,
  setToys,
  removeToy,
  updateToy,
  setSelectedToy,
  setFilterBy,
};

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp);
