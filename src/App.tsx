import './App.css'
import AppRouter from './page/AppRouter'
import DbProvider from './contexts/DbProvider'

const App = () => {
  return (
    <div className='App'>
      <DbProvider>
        <AppRouter />
      </DbProvider>
    </div>
  )
}

export default App
