import { Request, Response } from 'express';
import LoginQuery from './User/Usecase/LoginQuery';
import Login from './User/Login';
import SignupCommand from './User/Usecase/SignupCommand';
import Signup from './User/Signup';

export default class UserController {
  constructor(
    private readonly loginQuery: LoginQuery,
    private readonly signupCommand: SignupCommand,
  ) { }

  async login(req: Request, res: Response): Promise<Response> {
    const login = await new Login(this.loginQuery).execute(req, res);
    return login;
  }

  async signup(req: Request, res: Response): Promise<Response> {
    const signup = await new Signup(this.signupCommand).execute(req, res);
    return signup;
  }
}
