import { User } from '../models/user';
import UserRepository from '../repositories/userRepository';

class UserService {
  private userRespository;

  constructor() {
    this.userRespository = new UserRepository();
  }

  async createrUser(name: string, email?: string, password?: string) {
    const user = new User(name, email, password);

    return await this.userRespository.createUser(user);
  }
}

export default UserService;