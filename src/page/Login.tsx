import { Button } from '@material-ui/core'
import { DbContext } from '../contexts/DbContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Back from '../components/Back'
import GenForm, { TValues } from '../components/GenForm'
import Info from '../components/Info'

const Login = () => {
  const initValues = { login: '', password: '' }
  const text = 'Přihlásit se'
  const info = 'Přihlášení nebylo úspěšné.'
  const { login: loginUser } = useContext(DbContext)
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<TValues>(initValues)
  const navigate = useNavigate()

  const login = {
    login: { text: 'Login', type: 'text', helperText: 'Vámi zvolený řetězec znaků' },
    password: { text: 'Heslo', type: 'password', helperText: 'Nejméně osm znaků' },
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (await loginUser(values.login, values.password)) {
      navigate('/blog')
    } else {
      setOpen(true)
    }
    return
  }

  return (
    <div className='main'>
      <h1>{text}</h1>
      <form method='post' onSubmit={handleOnSubmit}>
        <GenForm input={login} values={values} setValues={setValues} />
        <Button type='submit' variant='contained' color='primary'>
          {text}
        </Button>
      </form>
      <Info info={info} open={open} setOpen={setOpen} />
      <Back />
    </div>
  )
}

export default Login
