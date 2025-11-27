import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Welcome from './pages/Welcome';
import Survey from './pages/Survey';
import Surveys from './pages/Surveys';
import Explore from './pages/Explore';
import Exit from './pages/Exit';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Testimonials from './pages/Testimonials';
import About from './pages/About';
import Profile from './pages/Profile';
import Feedback from './pages/Feedback';
import Thanksgiving from './pages/Thanksgiving';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-emerald-50 flex flex-col">
            <NavBar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/survey" element={<Survey type="pre" />} />
                <Route path="/explore/*" element={<Explore />} />
                <Route path="/post-survey" element={<Survey type="post" />} />
                <Route path="/thank-you" element={<Exit />} />
                <Route path="/testimonials/*" element={<Testimonials />} />
                <Route path="/about" element={<About />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/thanksgiving" element={<Thanksgiving />} />
                <Route path="/admin" element={<Admin />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/journal" element={
                  <ProtectedRoute>
                    <Journal />
                  </ProtectedRoute>
                } />
                <Route path="/surveys" element={
                  <ProtectedRoute>
                    <Surveys />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
