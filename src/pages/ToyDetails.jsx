import { connect } from "react-redux";
import { Component } from "react";
import { Reviews } from "../cmps/Reviews";
import { toyService } from "../services/toy.service.js";
import {
  loadReviews,
  addReview,
  removeReview,
} from "../store/actions/review.actions.js";
import { Route, Switch } from "react-router";
import { ReviewModal } from "../cmps/ReviewModal";
import { Chat } from "../cmps/Chat";
import { socketService } from "../services/socket.service";

class _ToyDetails extends Component {
  state = {
    toy: null,
  };

  async componentDidMount() {
    const id = this.props.match.params.toyId;
    await this.props.loadReviews(id);
    const toyRes = await toyService.getById(id);
    this.setState({ toy: toyRes }, async () => {
      await socketService.setup();
      socketService.emit("details-page", this.state.toy._id);
      socketService.on("chat addMsg", this.addMsg);
    });
  }
  render() {
    // eslint-disable-next-line no-unused-vars
    if (!this.state.toy) return <div>Loading...</div>;
    const { img, inStock, name, price, type, _id } = this.state.toy;
    const { reviews, loadReviews, addReview } = this.props;

    return (
      <div className="toy-details-main-container">
        <button
          className="btn btn-go-back"
          onClick={() => {
            this.props.history.push("/toy");
          }}
        >
          <i class="fas fa-arrow-left"></i>
        </button>
        <Switch>
          <Route
            component={() => (
              <ReviewModal addReview={addReview} loadReviews={loadReviews} />
            )}
            path={`/toy/:toyId/read/review/:reviewId/edit`}
          />
          <Route
            component={() => <ReviewModal addReview={addReview} id={_id} />}
            path={`/toy/:toyId/read/review/add`}
          />
        </Switch>
        <div className="toy-details-container">
          <div className="toy-details-img-container">
            <img className="toy-details-img" src={img} alt="toy img" />
          </div>

          <div className="toy-details-data">
            <h2>Title:{name}</h2>
            <h5>Price:${price}</h5>
            <h5>Type:{type}</h5>
            <h6>
              In Stock:
              <span
                className={`in-stock ${inStock ? "stock" : "out-of-stock"}`}
              >
                {inStock ? `In stock` : "Out of Stock"}
              </span>
            </h6>
          </div>
        </div>
        <Reviews reviews={reviews} {...this.props} />
        <Chat
          addMsg={this.addMsg}
          sendMsg={this.sendMsg}
          toyId={this.state.toy.toyId}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reviews: state.reviewModule.reviews,
    loggedInUser: state.userModule.loggedInUser,
  };
}
const mapDispatchToProps = {
  loadReviews,
  addReview,
  removeReview,
};
export const ToyDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ToyDetails);
