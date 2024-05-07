import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom';
import CustomerList from './components/CustomerList.jsx';
import TrainingList from './components/TrainingList.jsx';
import App from './App.jsx';
import './index.css';
import TrainingCalendar from './components/TrainingCalendar.jsx';
import ActivityChart from './components/ActivityChart.jsx';

const router = createHashRouter([
    { path: '/', element: <App />, children: [
            { path: '', element: <CustomerList />, index: true },
            { path: 'customers', element: <CustomerList /> },
            { path: 'trainings', element: <TrainingList /> },
            { path: 'calendar', element: <TrainingCalendar /> },
            { path: 'charts', element: <ActivityChart /> }
        ]}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
