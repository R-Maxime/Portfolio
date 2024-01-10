import constant from '../../constant';
import IUserConnexion from './Models/Users';

class Auth {
  static async login(username: string, password: string): Promise<IUserConnexion | null> {
    try {
      const response = await fetch(`${constant.API_URL}/${constant.API_ROUTES.AUTH_LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const user = await response.json();
        return user as IUserConnexion;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  public static getUser(): IUserConnexion | null {
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    return parsedUser;
  }

  public static isAuthenticated(): boolean {
    const user = this.getUser();
    return !!(user && user.token);
  }

  public static saveToLocalStorage(user: IUserConnexion): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public static logout(): void {
    localStorage.removeItem('user');
  }
}

export default Auth;
