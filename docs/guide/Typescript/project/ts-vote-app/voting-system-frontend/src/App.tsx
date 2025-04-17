import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import VoteList from './pages/VoteList';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/votes" component={VoteList} />
        <Route path="/" exact component={VoteList} />
      </Switch>
    </Router>
  );
};

export default App;
