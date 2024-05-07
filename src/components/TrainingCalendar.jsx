import {useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Snackbar} from "@mui/material";

const localizer = momentLocalizer(moment);

export default function TrainingCalendar() {
    const [events, setEvents] = useState([]);
    const [snackbar, setSnackbar] = useState({open: false, msg: ""});

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings');
            const responseData = await response.json();

            const formattedEvents = responseData
                .filter(training => training.customer)
                .map(training => ({
                    id: training.id,
                    title: training.activity,
                    customerFirstname: training.customer.firstname,
                    customerLastname: training.customer.lastname,
                    start: new Date(training.date),
                    end: new Date(moment(training.date).add(training.duration, 'minutes')),
                }));

            setEvents(formattedEvents);
        } catch (error) {
            setSnackbar({open: true, msg: "Fetch failed!"});
        }
    };

    const EventComponent = ({event}) => (
        <div>
            {event.title}
            {event.customerFirstname && event.customerLastname && (
                <div>{`${event.customerFirstname} ${event.customerLastname}`}</div>
            )}

            <br/>
        </div>
    );

    return <>
        <div style={{height: 1000, width: 1280, padding: 20}}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{height: '100%'}}
                components={{
                    event: EventComponent,
                }}
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