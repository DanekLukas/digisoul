import { Button } from '@material-ui/core'
import { DbContext, TBlog } from '../contexts/DbContext'
import { Fragment, useContext, useEffect, useState } from 'react'
import { styled } from '@mui/styles'
import BlogCmp from '../components/Blog'
import GenForm, { TValues } from '../components/GenForm'

const Blog = () => {
  const text = 'Blog'
  const button = 'Vložit'
  const initValues = { name: '', text: '' }
  const { insertBlog, userName, getBlogs, logout } = useContext(DbContext)
  const [values, setValues] = useState<TValues>(initValues)
  const [blogs, setBlogs] = useState<Array<TBlog>>([])
  const blog = {
    name: { text: 'Název', type: 'text', helperText: 'Název příspěvku' },
    text: { text: 'Text', type: 'textarea', helperText: 'Blog text' },
  }

  const refreshBlogs = async () => {
    setBlogs(await getBlogs())
  }

  useEffect(() => {
    refreshBlogs()
  })

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (await insertBlog(values.name, values.text)) {
      setValues(initValues)
      refreshBlogs()
    }
    return
  }

  return (
    <div className='main'>
      <Logout onClick={logout}>
        {userName}
        <br />
        Odhlásit se
      </Logout>
      <h1>{text}</h1>
      <form method='post' onSubmit={handleOnSubmit}>
        <GenForm input={blog} values={values} setValues={setValues} />
        <Button type='submit' variant='contained' color='primary'>
          {button}
        </Button>
      </form>
      {blogs.map((item, index) => (
        <Fragment key={index}>
          <BlogCmp name={item.name} text={item.text} author={item.author} created={item.created} />
        </Fragment>
      ))}
    </div>
  )
}

const Logout = styled('div')({
  float: 'right',
  cursor: 'pointer',
})

export default Blog
