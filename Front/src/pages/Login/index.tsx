import React, { useState } from 'react';
import Auth from '../../datas/Auth';
import i18n from '../../langs/i18n';
import IUserConnexion from '../../datas/Models/Users';
import '../../styles/Login.scss';

interface LoginState {
  username: string;
  password: string;
}

function Login(): React.ReactElement {
  const [loginData, setLoginData] = useState<LoginState>({
    username: '',
    password: ''
  });

  const [error, setError] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    Auth.login(loginData.username, loginData.password).then((loginResponse) => {
      if (loginResponse) {
        Auth.saveToLocalStorage(loginResponse as IUserConnexion);
        window.location.href = '/';
        return;
      }

      setError(i18n.auth.error.fr);
    });
  };

  if (Auth.isAuthenticated()) {
    return (
      <div className='login-container'>
        <h2>{i18n.auth.alreadyConnected.fr}</h2>
        <button
          type="button"
          onClick={() => {
            Auth.logout();
            window.location.href = '/';
          }}
        >
          {i18n.auth.logout.fr}
        </button>
      </div>
    );
  }

  return (
    <div className='login-container'>
      <div className='login-background'>
        {error && <div className='error'>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="username"
              placeholder={i18n.auth.username.fr}
              value={loginData.username}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <input
              autoComplete='on'
              type="password"
              name="password"
              placeholder={i18n.auth.password.fr}
              value={loginData.password}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">{i18n.auth.login.fr}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
