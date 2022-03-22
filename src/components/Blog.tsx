import { Fragment } from 'react'

type Props = {
  name: string
  text: string
  author: string
  created: string
}

const Blog = ({ name, text, author, created }: Props) => {
  const nl2br = (text: string) => {
    return text.split('\n').map((item, index) => (
      <Fragment key={index}>
        {item}
        <br />
      </Fragment>
    ))
  }

  return (
    <div>
      <h2>{name}</h2>
      <p>{nl2br(text)}</p>
      <span>{`autor: ${author}`}</span>
      <br />
      <span>{`vytvořil: ${created}`}</span>
    </div>
  )
}

export default Blog
