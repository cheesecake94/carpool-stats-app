import React from 'react';
import { CarpoolEvent } from '../../models/carpool-event.model';
import { PersonStatistics } from '../../models/person-statistics.model';
import './person-statistics-list.component.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

interface PersonStatisticsListProps {
    carpoolEvents: CarpoolEvent[];
}

export const PersonStatisticsList = ({ carpoolEvents }: PersonStatisticsListProps) => {
    const drivers = carpoolEvents.map(ce => ce.driver);
    const passengers = carpoolEvents.map(ce => ce.passengers.map(p => p.name)).flat();
    const persons = [...new Set([...drivers, ...passengers])];

    const statistics = buildPersonStatistics(persons, carpoolEvents);

    return (
        <div>
            <h4>Statistics per person</h4>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Person</TableCell>
                            <TableCell>Number of trips as driver</TableCell>
                            <TableCell>Number of trips as passenger</TableCell>
                            <TableCell>Last time trip as driver</TableCell>
                            <TableCell>Last time trip as passenger</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {statistics.map((stat, i) => (
                            <TableRow key={i}>
                                <TableCell>{stat.person}</TableCell>
                                <TableCell>{stat.tripsCount}</TableCell>
                                <TableCell>{stat.tripsAsPassengerCount}</TableCell>
                                <TableCell>{dateToDisplay(stat.lastTimeTripAsDriver)}</TableCell>
                                <TableCell>{dateToDisplay(stat.lastTimeTripAsPassenger)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

const buildPersonStatistics = (persons: string[], carpoolEvents: CarpoolEvent[]) => {
    const statistics: PersonStatistics[] = [];

    persons.forEach(person => {
        const trips = carpoolEvents.filter(ce => ce.driver === person).sort((ce1, ce2) => ce1.date.valueOf() - ce2.date.valueOf());
        const tripsAsPassenger = carpoolEvents.filter(ce => ce.passengers.findIndex(p => p.name === person) !== -1).sort((ce1, ce2) => ce1.date.valueOf() - ce2.date.valueOf());
        const lastTimeTrip = trips.length > 0 ? trips[trips.length - 1].date : undefined;
        const lastTimeTripAsPassenger = tripsAsPassenger.length > 0 ? tripsAsPassenger[tripsAsPassenger.length - 1].date : undefined;

        const personStatistics = new PersonStatistics(person, trips.length, tripsAsPassenger.length, lastTimeTrip, lastTimeTripAsPassenger);
        statistics.push(personStatistics);
    });

    return statistics;
}

const dateToDisplay = (date?: Date) => {
    return date ? moment(date).format('DD/MM/YYYY') : 'N/A';
}