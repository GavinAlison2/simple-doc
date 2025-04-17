import React, { useEffect, useState } from 'react';
import { getVotes } from '../services/api';

const VoteList: React.FC = () => {
  const [votes, setVotes] = useState<any[]>([]);

  useEffect(() => {
    const fetchVotes = async () => {
      const response = await getVotes();
      setVotes(response.data);
    };
    fetchVotes();
  }, []);

  return (
    <div>
      <h1>投票列表</h1>
      <ul>
        {votes.map((vote) => (
          <li key={vote.id}>
            <h2>{vote.title}</h2>
            <p>{vote.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoteList;
