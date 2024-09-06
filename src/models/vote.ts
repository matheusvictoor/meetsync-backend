export class Vote {
  userName: string;
  timeId: string;

  constructor(userName: string, timeId: string) {
    this.userName = userName;
    this.timeId = timeId;
  }
}