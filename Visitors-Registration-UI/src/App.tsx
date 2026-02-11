import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home.tsx'
// import Features from './pages/Features.tsx'
import Navbar from './components/navbar/Navbar.tsx'
import Visitor from './pages/visitor/Visitor.tsx'
import Login from './pages/login/Login.tsx'
import Admin from './pages/Admin/Admin.tsx'

function App() {
  return (
    <>
    <div className='page-Design'>
      <Navbar />
      <div className="page-content">
        <div className="page-container"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visitor" element={<Visitor />} />
            {/* <Route path="/features" element={<Features />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </div>
    </>
  )
}

export default App