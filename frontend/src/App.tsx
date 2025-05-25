// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AllCryptosOverview from './pages/AllCryptosOverview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/CryptoOverview" element={<AllCryptosOverview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
