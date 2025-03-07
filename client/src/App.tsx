import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';
import MantineLayout from './componets/layout/MantineLayout';

function App() {
  return (
    <div className="App">
      <MantineLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </MantineLayout>
    </div>
  );
}

export default App;
