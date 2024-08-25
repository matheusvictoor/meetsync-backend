export class Time {
  date: Date;
  start: Date;
  end: Date;
  roomId: string;

  constructor(date: Date, start: Date, end: Date, roomId: string) {
    this.date = date
    this.start = start;
    this.end = end;
    this.roomId = roomId;
  }
}