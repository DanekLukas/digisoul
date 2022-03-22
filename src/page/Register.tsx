import { DbContext } from '../contexts/DbContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Back from '../components/Back'
import GenForm, { TValues } from '../components/GenForm'
import Info from '../components/Info'

const Register = () => {
  const initValues = { name: '', login: '', password: '', confirm: '' }
  const text = 'Registrovat se'
  let info = ''
  const { checkLoginExists, register: newRegistration, login } = useContext(DbContext)
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<TValues>(initValues)
  const navigate = useNavigate()

  const register = {
    name: { text: 'Jméno', type: 'text', helperText: 'Celé jméno' },
    login: { text: 'Login', type: 'text', helperText: 'Můžete použít třeba email' },
    password: { text: 'Heslo', type: 'password', helperText: 'Alespoň osm znaků' },
    confirm: { text: 'Potvrdit heslo', type: 'password', helperText: 'Totéž heslo znovu' },
  }

  const openInfo = (text: string) => {
    info = text
    setOpen(true)
    return
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (await checkLoginExists(values.login)) return openInfo('Login je již použitý')
    if (values.password !== values.confirm) return openInfo('Hesla se neshodují')
    if (values.password.trim().length < 8) return openInfo('Heslo je kratší než osm znaků')

    if (
      !(await newRegistration(values.name, values.login, values.password)) ||
      !(await login(values.login, values.password))
    )
      return openInfo('Registrace se nezdařila')
    navigate('/blog')
  }

  return (
    <div className='main'>
      <h1>{text}</h1>
      <form method='post' onSubmit={handleOnSubmit}>
        <GenForm input={register} values={values} setValues={setValues} button={text} />
      </form>
      <Info info={info} open={open} setOpen={setOpen} />
      <Back />
    </div>
  )
}

export default Register
