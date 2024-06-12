import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import Historic from './pages/Historic/Historic'
import Movimentation from './pages/Movimentation/Movimentation'
import Profile from './pages/Profile/Profile'

import Container from './components/layouts/Container'
import Footer from './components/layouts/Footer'
import Navbar from './components/layouts/Navbar'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route>
          <Navbar />
          <Container customClass="min-height">
            <Switch>
              <Route path="/historic">
                <Historic />
              </Route>
              <Route path="/movimentation">
                <Movimentation />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
            </Switch>
          </Container>
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
