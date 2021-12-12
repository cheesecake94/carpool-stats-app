import React from 'react';
import './app.css';
import data from './data/carpool-events.data.json';
import { CarpoolEvent } from './models/carpool-event.model';
import { PersonStatisticsList } from './components/person-statistics-list/person-statistics-list.component';
import { AllStatistics } from './components/all-statistics/all-statistics.component';

function App() {
    const carpoolEvents = data.CarPoolEvents.map(jsonCarpoolEvent => CarpoolEvent.createFromJSON(jsonCarpoolEvent));

    return (
        <div className="app">
            <h1>Carpool Statistics</h1>
            <PersonStatisticsList carpoolEvents={carpoolEvents} />
            <AllStatistics carpoolEvents={carpoolEvents} />
        </div>
    );
}

export default App;
