export class Room {
  endingAt: Date;
  title: string;
  description: string | null;  

  constructor(endingAt: Date, title: string, description: string | null = null) {
    this.endingAt = endingAt;
    this.title = title;
    this.description = description;
  }
}