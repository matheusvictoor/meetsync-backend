import { Vote } from "../models/vote";
import prisma from "../utils/prisma";
import { Result } from "../utils/result";

class VoteRepository {

  async createVotes(votes: Vote[]) {
    try {
      const votesData = await prisma.vote.createMany({
        data: votes.map((vote) => ({
          userName: vote.userName,
          timeId: vote.timeId
        }))
      });
      return Result.ok(votesData);
    } catch (error) {
      return Result.fail(new Error('Erro ao criar um voto'));
    }
  }
}

export default VoteRepository;