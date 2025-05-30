import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Professors from './pages/Professors';
import Courses from './pages/Courses';
import Departments from './pages/Departments';
import Allocations from './pages/Allocations';
import Layout from './components/Layout';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/professors" element={<Professors />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/allocations" element={<Allocations />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
