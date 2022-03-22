import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DbContext } from '../contexts/DbContext'
import { useContext } from 'react'
import Blog from './Blog'
import Homepage from './Homepage'
import Login from './Login'
import Register from './Register'
const AppRouter = () => {
  const { userName } = useContext(DbContext)
  return (
    <>
      <BrowserRouter>
        <Routes>
          {userName !== '' && (
            <>
              <Route path='/blog/:id' element={<Blog />} />
              <Route path='/blog' element={<Blog />} />
            </>
          )}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Homepage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default AppRouter
