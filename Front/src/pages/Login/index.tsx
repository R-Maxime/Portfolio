import React, { Component } from 'react';
import Auth from '../../datas/Auth';
import i18n from '../../langs/i18n';
import IUserConnexion from '../../datas/Models/Users';
import '../../styles/Login.scss';
import '../../styles/global.scss';

interface LoginState {
  username: string;
  password: string;
  error: string;
}

class Login extends Component<NonNullable<unknown>, LoginState> {
  constructor(props: NonNullable<unknown>) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    Auth.login(this.state.username, this.state.password).then((loginResponse) => {
      if (loginResponse) {
        Auth.saveToLocalStorage(loginResponse as IUserConnexion);
        window.location.href = '/';
        return;
      }

      this.setState({ error: i18n.auth.error.fr });
    });
  };

  render() {
    const { username, password, error } = this.state;

    if (Auth.isAuthenticated()) {
      return (
        <div className='login-container'>
          <h2>{i18n.auth.alreadyConnected.fr}</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            marginTop: '10px'
          }}>
            <button type="button" onClick={() => { window.location.href = '/'; }}>
              {i18n.auth.home.fr}
            </button>
            <button
              type="button"
              onClick={() => {
                Auth.logout();
                window.location.href = '/';
              }}
            >
              {i18n.auth.logout.fr}
            </button>
            <button type="button" onClick={() => { window.location.href = '/admin'; }}>
              {i18n.admin.admin.fr}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className='login-container'>
        <div className='login-background'>
          {error && <div className='error'>{error}</div>}
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                name="username"
                placeholder={i18n.auth.username.fr}
                value={username}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              <input
                autoComplete='on'
                type="password"
                name="password"
                placeholder={i18n.auth.password.fr}
                value={password}
                onChange={this.handleInputChange}
              />
            </label>
            <button type="submit">{i18n.auth.login.fr}</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
