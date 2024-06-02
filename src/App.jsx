import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { GlobalProvider } from './context/GlobalState'
import EditProduct from './components/EditProduct/EditProduct'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/editproduct/:id" element={<EditProduct/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer/>
        </GlobalProvider>
      </BrowserRouter>
    </>
  )
}

export default App
