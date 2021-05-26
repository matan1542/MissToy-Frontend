import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withRouter } from "react-router-dom";
import { reviewService } from "../services/review.service.js";

function _ReviewModal({ ...props }) {
  let review = {
    toyId: props.id,
    content: "",
    createdAt: new Date(Date.now()),
  };
  const [reviewState, setreview] = useState(review);

  // optional-chaining would take care of the undefined check
  const setProps = async () => {
    if (props.match.params.reviewId) {
      const id = props.match.params.reviewId;
      const res = await reviewService.getById(id);
      setreview({ ...res });
    }
  };

  const handleClose = () => {
    props.history.push(`/toy/${reviewState.toyId}/read`);
  };

  const onSaveReview = async (ev) => {
    ev.preventDefault();
    if (reviewState._id) {
      await props.updatereview(reviewState);
      await props.loadReviews();
    } else await props.addReview(reviewState);
    handleClose();
  };

  const handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "radio" ? +target.value : target.value;
    setreview((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  if (props.updatereview && !reviewState._id) setProps();
  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {reviewState._id ? " Edit" : "Add"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Review"
            name="content"
            value={reviewState.content ? reviewState.content : ""}
            type="content"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSaveReview} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export const ReviewModal = withRouter(_ReviewModal);
