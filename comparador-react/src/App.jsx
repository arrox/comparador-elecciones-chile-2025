import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';
import CandidatePage from './pages/CandidatePage';
import ComparePage from './pages/ComparePage';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/candidato/:id" element={<CandidatePage />} />
            <Route path="/comparar" element={<ComparePage />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
          <ThemeToggle />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
