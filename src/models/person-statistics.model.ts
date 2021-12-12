export class PersonStatistics {
    person: string;
    tripsCount: number;
    tripsAsPassengerCount: number;
    lastTimeTripAsDriver?: Date;
    lastTimeTripAsPassenger?: Date;

    public constructor(person: string, tripsCount: number, tripsAsPassengerCount: number, lastTimeTripAsDriver?: Date, lastTimeTripAsPassenger?: Date) {
        this.person = person;
        this.tripsCount = tripsCount;
        this.tripsAsPassengerCount = tripsAsPassengerCount;
        this.lastTimeTripAsDriver = lastTimeTripAsDriver;
        this.lastTimeTripAsPassenger = lastTimeTripAsPassenger;
    }
}