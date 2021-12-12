export class Passenger {
    name: string;
    roundtrip: boolean;

    public constructor(name: string, roundtrip: boolean) {
        this.name = name;
        this.roundtrip = roundtrip;
    }
}