import { Vote } from "../models/vote";
import prisma from "../utils/prisma";
import { Result } from "../utils/result";

class VoteRepository {

  async createVotes(votes: Vote[]) {
    try {
      const votesData = await Promise.all(votes.map((vote) => {
        return prisma.vote.create({
          data: {
            userName: vote.userName,
            timeId: vote.timeId
            }
          });
        })
      );
      return Result.ok(votesData);
    } catch (error) {
      return Result.fail(new Error('Erro ao criar um voto'));
    }
  }
}

export default VoteRepository;