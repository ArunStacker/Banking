import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import DepositWithdraw from './pages/DepositWithdraw';
import Loan from './pages/Loan';
import Admin from './pages/Admin';
import Statement from './pages/Statement';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/banking" element={<DepositWithdraw />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/statement" element={<Statement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
