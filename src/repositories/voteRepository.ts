import { Vote } from "../models/vote";
import prisma from "../utils/prisma";

class VoteRepository {

  async createVotes(votes: Vote[]) {
    return await Promise.all(votes.map((vote) => {
      return prisma.vote.create({
        data: {
          userName: vote.userName,
          timeId: vote.timeId
          }
        });
      }));
  }
}

export default VoteRepository;