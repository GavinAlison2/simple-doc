import React, { useState } from 'react';
import { register } from '../services/api';
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const history = useHistory();

  const handleRegister = async () => {
    await register(username, password, role);
    history.push('/login');
  };

  return (
    <div key="container" className="container">
      <h1>注册</h1>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label htmlFor="role">角色</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'user')}>
          <option value="user">普通用户</option>
          <option value="admin">管理员</option>
        </select>
        </div>
      <button onClick={handleRegister}>注册</button>
    </div>
  );
    //   <input type="text" placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} />
    //   <input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   <select value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'user')}>
    //     <option value="user">普通用户</option>
    //     <option value="admin">管理员</option>
    //   </select>
    //   <button onClick={handleRegister}>注册</button>
    // </div>
  // );
};

export default Register;
