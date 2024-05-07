import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";


export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [customers, setCustomers] = React.useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = React.useState("");
    const [training, setTraining] = React.useState({
        date: "", duration: "", activity: ""
    });

    React.useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers');
            const data = await response.json();
            setCustomers(data._embedded.customers);
        } catch (error) {
            console.error("Fetch failed!", error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    };

    const handleDateChange = (date) => {
        setTraining({...training, date: date});
    }

    const saveTraining = () => {
        props.addTraining(training, selectedCustomerId);
        handleClose();
    };

    return <div>
        <Button style={{margin: 10}} variant="outlined" onClick={handleClickOpen}>Add Training</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Training</DialogTitle>
            <DialogContent>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        ampm={false}
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
                <TextField
                    margin="dense"
                    name="activity"
                    value={training.activity}
                    onChange={handleInputChange}
                    label="Activity"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="duration"
                    value={training.duration}
                    onChange={handleInputChange}
                    label="Duration"
                    fullWidth
                />
                <TextField
                    select
                    label="Customer"
                    value={selectedCustomerId}
                    onChange={event => setSelectedCustomerId(event.target.value)}
                    fullWidth
                >
                    {customers.map((customer) => <MenuItem key={customer._links.self.href}
                                                           value={customer._links.self.href}>
                        {customer.firstname} {customer.lastname}
                    </MenuItem>)}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={saveTraining} color="primary">Save</Button>
                <Button onClick={handleClose} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    </div>;
}