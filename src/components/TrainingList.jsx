import {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import {Button, Snackbar} from "@mui/material";
import dayjs from "dayjs";
import AddTraining from "./AddTraining.jsx";

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [snackbar, setSnackbar] = useState({open: false, msg: ""});

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings');
            const data = await response.json();
            setTrainings(data);
        } catch (error) {
            setSnackbar({open: true, msg: "Fetch failed!"});
        }
    };

    const addTraining = async (training, selectedCustomerId) => {
        training.customer = selectedCustomerId;
        try {
            const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
                method: "POST", headers: {
                    'Content-type': 'application/json'
                }, body: JSON.stringify(training)
            });
            if (response.ok) {
                setSnackbar({open: true, msg: "Training added!"});
                fetchTrainings();
            } else {
                setSnackbar({open: true, msg: "Error adding training!"});
            }
        } catch (error) {
            setSnackbar({open: true, msg: "Error adding training!"});
        }
    };

    const deleteTraining = async (params) => {
        const trainingId = params.data.id;
        if (window.confirm("Are you sure")) {
            try {
                const response = await fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/" + trainingId, {method: "DELETE"});
                if (response.ok) {
                    setSnackbar({open: true, msg: "Delete OK!"});
                    fetchTrainings();
                } else {
                    setSnackbar({open: true, msg: "Delete NOT OK!"});
                }
            } catch (error) {
                setSnackbar({open: true, msg: "Error deleting training!"});
            }
        }
    };

    const columns = [{
        headerName: "Date",
        valueGetter: params => dayjs(params.data.date).format('DD.MM.YYYY HH:mm'),
        filter: true,
        sortable: true,
    }, {
        headerName: "Activity",
        field: "activity",
        filter: true,
        sortable: true,
    }, {
        headerName: "Duration",
        field: "duration",
        filter: true,
        sortable: true,
    }, {
        headerName: "Customer",
        valueGetter: params => {
            const customer = params.data.customer;
            return customer ? `${customer.firstname} ${customer.lastname}` : '';
        }
    }, {
        cellRenderer: rows => <Button size="small" color="error" onClick={() => deleteTraining(rows)}>Delete</Button>,
        width: 120,
    }];

    return <>
        <div className="ag-theme-material" style={{margin: "auto"}}>
            <AddTraining addTraining={addTraining}/>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                animateRows={true}
                rowSelection="single"
                pagination={true}
                paginationPageSize={100}
                domLayout='autoHeight'
            />
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({open: false, msg: ""})}
                message={snackbar.msg}
            />
        </div>
    </>;
}