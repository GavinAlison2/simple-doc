import React, { useState } from 'react';
import { createVote } from '../services/api';

const AdminPanel: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<string[]>(['']);
  const [endDate, setEndDate] = useState('');

  const handleCreateVote = async () => {
    const voteData = { title, description, options, endDate };
    await createVote(voteData);
    alert('投票创建成功');
  };

  return (
    <div>
      <h1>创建投票</h1>
      <input type="text" placeholder="标题" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="描述" value={description} onChange={(e) => setDescription(e.target.value)} />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder="选项"
          value={option}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[index] = e.target.value;
            setOptions(newOptions);
          }}
        />
      ))}
      <button onClick={() => setOptions([...options, ''])}>添加选项</button>
      <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleCreateVote}>创建投票</button>
    </div>
  );
};

export default AdminPanel;
