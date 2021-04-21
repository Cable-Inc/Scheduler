import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface MobileAddScheduleModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  submit: (username: string) => void;
}

const MobileAddScheduleModal: React.FC<MobileAddScheduleModalProps> = ({ isOpen, setIsOpen, submit }) => {
  const [text, setText] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (username: string) => {
    submit(username);
    handleClose();
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Your Schedule</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              "In order to add your schedule, we'll need your name! Make sure no one else on the calendar has this name, or you'll end up editing their calendar."
            }
          </DialogContentText>
          <TextField
            color="primary"
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="search"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button disabled={!text.trim()} onClick={() => handleSubmit(text)} color="secondary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MobileAddScheduleModal;
