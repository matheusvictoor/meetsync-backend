import { User } from "../models/user";
import prisma from "../utils/prisma";
import { Result } from "../utils/result";

class UserRepository {
  async createUser(user: User) {
    try {
      const userData = await prisma.user.create({
        data: { 
          name: user.name,
          email: user.email || "",
          password: user.password || ""
        },
      });
      return Result.ok(userData);
    } catch (error) {
      return Result.fail(new Error('Erro ao criar um usuario.'));
    }
  }

  async findUserByEmail(email: string) {
    try {
      const userData = await prisma.user.findUnique({
        where: { email },
      });
      return userData? Result.ok(userData) : Result.fail(new Error('Usuario nao encontrado.'));
    } catch (error) {
      return Result.fail(new Error('Erro ao buscar o usuario pelo email.'));
    }
  }
}

export default UserRepository;
