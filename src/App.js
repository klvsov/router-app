import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Main from './components/Main/Main';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <Signin title="Sign in" />
        </Route>
        <Route path="/signup">
          <Signup title="Sign up" />
        </Route>
        <Route path="/main">
          <Main>
            <h2>Authorized success</h2>
            <Link style={{ color: 'white' }} to="/">
              Log out
            </Link>
          </Main>
        </Route>
        <Route path="/">
          <Signin title="Sign in" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
