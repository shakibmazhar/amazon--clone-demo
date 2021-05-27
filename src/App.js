import './style/App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout'
import Error from './components/Error'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path = "/">
          <Home />
        </Route>
        <Route path = "/checkout">
          <Checkout />
        </Route>
        <Route path = "/*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
