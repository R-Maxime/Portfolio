import constant from '../../constant';
import IUserConnexion from './Models/Users';

class User {
  static async login(username: string, password: string): Promise<IUserConnexion> {
    const response = await fetch(`${constant.API_URL}/${constant.API_ROUTES.AUTH_LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const user = await response.json();
    return user;
  }
}

export default User;
