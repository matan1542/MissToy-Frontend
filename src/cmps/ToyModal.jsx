import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MenuItem, Select } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { toyService } from "../services/toy.service.js";
import { uploadImg } from "../services/cloudinery.service.js";

function _ToyModal({ ...props }) {
  // if (props.match.params.toyId) {
  //   const id = props.match.params.toyId;
  //   toyService.getById(id).then((res) => {
  //     setToy({...res})
  //   });
  // }
  let toy = {
    type: "",
    name: "",
    createdAt: new Date(Date.now()),
    price: "",
  };
  let file = {
    file: null,
  };
  const [toyState, setToy] = useState(toy);
  const [fileState, setFile] = useState(file);

  // optional-chaining would take care of the undefined check
  const setProps = async () => {
    if (props.match.params.toyId) {
      const id = props.match.params.toyId;
      const res = await toyService.getById(id);
      setToy({ ...res });
    }
  };

  const handleClose = () => {
    // setOpen(false);
    props.history.push("/toy");
  };
  const onUploadImg = async (fileState) => {
    await uploadImg(fileState);
  };

  const onSaveToy = async (ev) => {
    ev.preventDefault();
    const toy = toyState;
    console.log("toy", toy);
    if (fileState.file) {
      const url = await onUploadImg(fileState.file);
      toy.img = url;
    }
    console.log("toy", toy);
    if (toy._id) {
      await props.updateToy(toy);
      await props.loadToys();
    } else await props.saveToy(toy);
    handleClose();
  };

  const handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "radio" ? +target.value : target.value;
    setToy((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  if (props.updateToy && !toyState._id) setProps();
  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {toyState._id ? " Edit" : "Add"}
        </DialogTitle>
        <DialogContent>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            name="type"
            className="filter-type"
            value={toyState.type ? toyState.type : "funny"}
            onChange={handleChange}
            label="Type"
          >
            <MenuItem value="funny">Funny</MenuItem>
            <MenuItem value="programmer">Programmer</MenuItem>
            <MenuItem value="Educational">Educational</MenuItem>
            <MenuItem value="Toddles">Toddles</MenuItem>
            <MenuItem value="Adult">Adult</MenuItem>
          </Select>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            name="name"
            value={toyState.name ? toyState.name : ""}
            type="name"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            name="price"
            value={toyState.price ? toyState.price : ""}
            type="price"
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              onChange={({ target }) => setFile({ file: target.files[0] })}
              hidden
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSaveToy} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export const ToyModal = withRouter(_ToyModal);
