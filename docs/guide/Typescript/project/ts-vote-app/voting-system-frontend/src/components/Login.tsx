import React, { useState } from 'react';
import { login } from '../services/api';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    const response = await login(username, password);
    localStorage.setItem('token', response.data.token);
    history.push('/votes');
  };

  return (
    <div className='container'>
      <div className='logo'>
        <h1>登录</h1>
      </div>
      <div className='form'>
        <div className='form-group'>
          <label>用户名</label>
          <input type="text" placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>密码</label>
          <input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary' onClick={handleLogin}>登录</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
