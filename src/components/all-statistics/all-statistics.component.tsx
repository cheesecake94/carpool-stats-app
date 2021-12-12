import React, { useState } from 'react';
import { CarpoolEvent } from '../../models/carpool-event.model';
import './all-statistics.component.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import moment from 'moment';

interface AllStatisticsProps {
    carpoolEvents: CarpoolEvent[];
}

interface StatisticsPeriod {
    fromDate: Date;
    toDate: Date;
}

export const AllStatistics = ({ carpoolEvents }: AllStatisticsProps) => {
    const initPeriod = {
        fromDate: moment().startOf('isoWeek').toDate(),
        toDate: moment().endOf('isoWeek').toDate()
    } as StatisticsPeriod;

    const [period, setPeriod] = useState(initPeriod);

    const statistics = buildStatistics(carpoolEvents, period);

    const onMonthsChange = (numberOfMonths: number) => {
        const fromDate = moment(period.fromDate).add(numberOfMonths, 'months').toDate();
        const toDate = moment(fromDate).add(Math.abs(numberOfMonths), 'months').toDate();
        setPeriod({ fromDate, toDate });
    }

    const onWeeksChange = (numberOfWeeks: number) => {
        const fromDate = moment(period.fromDate).add(numberOfWeeks, 'weeks').toDate();
        const toDate = moment(fromDate).add(Math.abs(numberOfWeeks), 'weeks').toDate();
        setPeriod({ fromDate, toDate });
    }

    return (
        <div>
            <h4>All statistics</h4>
            <div className='period-wrapper'>
                <Button variant="text" onClick={() => onMonthsChange(-1)}>&lt; month</Button>
                <Button variant="text" onClick={() => onWeeksChange(-1)}>&lt; week</Button>
                <p>{dateToDisplay(period.fromDate)} - {dateToDisplay(period.toDate)}</p>
                <Button variant="text" onClick={() => onWeeksChange(1)}>week &gt;</Button>
                <Button variant="text" onClick={() => onMonthsChange(1)}>month &gt;</Button>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Driver</TableCell>
                            <TableCell>Passengers</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {statistics.map((stat, i) => (
                            <TableRow key={i}>
                                <TableCell>{stat.driver}</TableCell>
                                <TableCell>
                                    <ul>
                                        {stat.passengers.map(p => (
                                            <li>{p.name}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>{dateToDisplay(stat.date)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

const buildStatistics = (carpoolEvents: CarpoolEvent[], period: StatisticsPeriod) => {
    return carpoolEvents.filter(ce => ce.date >= period.fromDate && ce.date <= period.toDate).sort((ce1, ce2) => ce1.date.valueOf() - ce2.date.valueOf());
}

const dateToDisplay = (date?: Date) => {
    return date ? moment(date).format('DD/MM/YYYY') : 'N/A';
}