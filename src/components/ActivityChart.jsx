import {useEffect, useState} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {Snackbar} from "@mui/material";

export default function ActivityChart() {
    const [trainings, setTrainings] = useState([]);
    const [snackbar, setSnackbar] = useState({open: false, msg: ""});

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings');
            const responseData = await response.json();
            const groupedTrainings = groupTrainings(responseData);
            setTrainings(groupedTrainings);
        } catch (error) {
            setSnackbar({open: true, msg: "Fetch failed!"});
        }
    }

    const groupTrainings = (trainings) => {
        return trainings.reduce((grouped, training) => {
            const key = training.activity;
            if (!grouped[key]) {
                grouped[key] = {name: key, durations: 0};
            }
            grouped[key].durations += training.duration;
            return grouped;
        }, {});
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <ResponsiveContainer width={1030} height={500}>
                <BarChart data={Object.values(trainings)} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="durations" fill="#B1B1EF" />
                </BarChart>
            </ResponsiveContainer>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({open: false, msg: ""})} message={snackbar.msg} />
        </div>
    );
}