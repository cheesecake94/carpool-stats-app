import { Passenger } from "./passenger.model";
import moment from "moment";

export class CarpoolEvent {
    driver: string;
    passengers: Passenger[];
    date: Date;

    public static createFromJSON(jsonCarpoolEvent: any) {
        const carpoolEvent = new CarpoolEvent();
        carpoolEvent.driver = jsonCarpoolEvent.Driver;
        carpoolEvent.passengers = jsonCarpoolEvent.Passengers.map((p: any) => new Passenger(p.Name, p.Roundtrip));
        carpoolEvent.date = moment(jsonCarpoolEvent.Timestamp, "YYYYMMDD").toDate();

        return carpoolEvent;
    }
}