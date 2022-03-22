import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className='main'>
      <h1>Blog</h1>
      <Link to='/login'>Přihlásit se</Link>
      <br />
      <Link to='/register'>Registrovat se</Link>
    </div>
  )
}

export default Homepage
