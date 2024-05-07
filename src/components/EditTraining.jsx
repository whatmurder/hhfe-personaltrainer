import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function EditTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: "", duration: "", activity: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({
            date: props.training.date,
            duration: props.training.duration,
            activity: props.training.activity
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    };

    const handleDateChange = (date) => {
        setTraining({...training, date: date.format()});
    }

    const editTraining = () => {
        props.editTraining(training, props.params.data._links.self.href);
        handleClose();
    };

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={dayjs(training.date)}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={handleInputChange}
                        label="Duration"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={handleInputChange}
                        label="Activity"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={editTraining} color="primary">Save</Button>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}