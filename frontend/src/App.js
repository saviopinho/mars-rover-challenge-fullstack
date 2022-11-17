import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Report from './pages/Report';

import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    return (
        <Router>
            <div className="App">
                <ToastContainer />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/report" element={<Report />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
