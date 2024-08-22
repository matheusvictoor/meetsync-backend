import { User } from "../models/user";
import prisma from "../utils/prisma";

class UserRepository {
  async createUser(user: User) {
    return await prisma.user.create({
      data: { 
        name: user.name,
        email: user.email || "",
        password: user.password || ""
      },
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}

export default UserRepository;
