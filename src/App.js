
import './App.css';
import PayrollForm from './components/payroll-form/PayrollForm';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Switch } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div >
      <Header />
      <Router>
        <Switch>
          <Route path="/payroll-form"><PayrollForm /></Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
