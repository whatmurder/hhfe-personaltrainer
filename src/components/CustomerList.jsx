import {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import {Button, Snackbar, Stack} from "@mui/material";
import EditCustomer from "./EditCustomer.jsx";
import AddCustomer from "./AddCustomer.jsx";
import {Parser} from "@json2csv/plainjs";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [snackbar, setSnackbar] = useState({open: false, msg: ""});

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers');
            const data = await response.json();
            setCustomers(data._embedded.customers);
        } catch (error) {
            setSnackbar({open: true, msg: "Fetch failed!"});
        }
    };

    const deleteCustomer = async (params) => {
        if (window.confirm("Are you sure")) {
            try {
                const response = await fetch(params.data._links.self.href, {method: "DELETE"});
                if (response.ok) {
                    setSnackbar({open: true, msg: "Delete OK!"});
                    fetchCustomers();
                } else {
                    setSnackbar({open: true, msg: "Delete NOT OK!"});
                }
            } catch (error) {
                setSnackbar({open: true, msg: "Error deleting customer!"});
            }
        }
    };

    const addCustomer = async (customer) => {
        try {
            const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
                method: "POST", headers: {
                    'Content-type': 'application/json'
                }, body: JSON.stringify(customer)
            });
            if (response.ok) {
                setSnackbar({open: true, msg: "Customer added!"});
                fetchCustomers();
            } else {
                setSnackbar({open: true, msg: "Error adding customer!"});
            }
        } catch (error) {
            setSnackbar({open: true, msg: "Error adding customer!"});
        }
    };

    const editCustomer = async (customer, link) => {
        try {
            const response = await fetch(link, {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(customer)
            });
            if (response.ok) {
                setSnackbar({open: true, msg: "Customer edited successfully"});
                fetchCustomers();
            } else {
                setSnackbar({open: true, msg: "Error editing customer!"});
            }
        } catch (error) {
            setSnackbar({open: true, msg: "Error editing customer!"});
        }
    };


    const columns = [{
        headerName: "First Name",
        field: "firstname",
        filter: true,
        sortable: true,
    }, {
        headerName: "Last Name",
        field: "lastname",
        filter: true,
        sortable: true,
    }, {
        headerName: "Street Address",
        field: "streetaddress",
        filter: true,
        sortable: true,
    }, {
        headerName: "Post Code",
        field: "postcode",
        filter: true,
        sortable: true,
    }, {
        headerName: "City",
        field: "city",
        filter: true,
        sortable: true,
    }, {
        headerName: "Email",
        field: "email",
        filter: true,
        sortable: true,
    }, {
        headerName: "Phone",
        field: "phone",
        filter: true,
        sortable: true,
    }, {
        cellRenderer: params => <EditCustomer editCustomer={editCustomer} customer={params.data} params={params}/>,
        width: 120,
        sortable: false,
        filter: false
    }, {
        cellRenderer: rows => <Button size="small" color="error" onClick={() => deleteCustomer(rows)}>Delete</Button>,
        width: 120,
        sortable: false,
        filter: false
    }];

    const exportToCSV = () => {
        const customersForCSV = customers.map(({_links, ...rest}) => rest);
        const parser = new Parser();
        const csv = parser.parse(customersForCSV);
        const csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        const csvURL = window.URL.createObjectURL(csvData);
        const tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'customers.csv');
        tempLink.click();
    };

    return <>
        <div className="ag-theme-material" style={{margin: "auto"}}>
            <Stack direction="row" spacing={2} alignItems="center">
                <AddCustomer addCustomer={addCustomer} sx={{width: '150px', height: '40px'}}/>
                <Button variant="outlined" onClick={exportToCSV} sx={{width: '150px', height: '36px'}}>Export to
                    CSV</Button>
            </Stack>
            <AgGridReact
                rowData={customers}
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