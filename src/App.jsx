import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Posts from './components/Posts';
import './App.css';
import Footer from './components/Footer';
import GetPosts from './components/GetPosts';
import CreatePost from './components/CreatePost';

function App() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 776);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 776);
    };

    // Call handleResize on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='main-container'>
        <Router>
          <Routes>
            {/* Show GetPosts if screen width is 776px or smaller, otherwise show Posts */}
            <Route path="/" element={isMobileView ? <GetPosts /> : <Posts />} />

            {/* Route for Create Posts */}
            <Route path="/create-posts" element={isMobileView ? <CreatePost/> : <Posts />} />
          </Routes>

          {/* Footer should only be visible on mobile screens */}
          {isMobileView && <Footer />}
        </Router>
    </div>
  );
}

export default App;
