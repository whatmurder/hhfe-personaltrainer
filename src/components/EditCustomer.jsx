import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

export default function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: "", lastname: "", streetaddress: "", postcode: "", city: "", email: "", phone: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    };

    const editCustomer = () => {
        props.editCustomer(customer, props.params.data._links.customer.href);
        handleClose();
    };

    return (<div>
        <Button color="primary" onClick={handleClickOpen}>Edit</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstname"
                    value={customer.firstname}
                    onChange={handleInputChange}
                    label="First Name"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="lastname"
                    value={customer.lastname}
                    onChange={handleInputChange}
                    label="Last Name"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={handleInputChange}
                    label="Street Address"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="postcode"
                    value={customer.postcode}
                    onChange={handleInputChange}
                    label="Post Code"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="city"
                    value={customer.city}
                    onChange={handleInputChange}
                    label="City"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="email"
                    value={customer.email}
                    onChange={handleInputChange}
                    label="Email"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="phone"
                    value={customer.phone}
                    onChange={handleInputChange}
                    label="Phone"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={editCustomer}>Save</Button>
                <Button color="error" onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </div>);
}