import { string } from "zod";

export class Room {
  roomId: string;
  endingAt: Date;
  title: string;
  description: string | null;
  emails?: string[];

  constructor(endingAt: Date, title: string, description: string | null = null, emails?: string[]) {
    this.roomId = "";
    this.endingAt = endingAt;
    this.title = title;
    this.description = description;
    this.emails = emails;
  }
}