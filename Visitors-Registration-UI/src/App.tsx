import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home.tsx'
// import Features from './pages/Features.tsx'
import Navbar from './components/navbar/Navbar.tsx'
import Visitor from './pages/visitor/Visitor.tsx'
import Login from './pages/login/Login.tsx'
import Admin from './pages/Admin/Admin.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <Toaster
      position="top-right"
      toastOptions={{ style: { fontSize: "clamp(14px, 2vw, 18px)", padding: "12px 16px",
        },
      }}
    />

    <div className='page-Design'>
      <Navbar />
      <div className="page-content">
        <div className="page-container"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visitor" element={<Visitor />} />
            {/* <Route path="/features" element={<Features />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </div>
    </>
  )
}

export default App