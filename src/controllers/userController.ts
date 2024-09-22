import { Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await this.userService.createUser(name, email, password);

    if(user.isFailure)
      return res.status(400).json({ error: user.error?.message });

    res.status(201).json(user.getValue());    
  }
}

export default new UserController();