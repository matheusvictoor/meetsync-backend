import { User } from '../models/user';
import UserRepository from '../repositories/userRepository';

class UserService {
  private userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createrUser(name: string, email?: string, password?: string) {
    const user = new User(name, email, password);

    return await this.userRepository.createUser(user);
  }
}

export default UserService;