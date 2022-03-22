import { createContext } from 'react'

export type TBlog = {
  name: string
  text: string
  created: string
  author: string
}

type State = {
  checkLoginExists: (login: string) => Promise<boolean>
  register: (name: string, login: string, password: string) => Promise<boolean>
  login: (login: string, password: string) => Promise<boolean>
  logout: () => void
  insertBlog: (name: string, text: string) => Promise<boolean>
  getBlogs: () => Promise<TBlog[]>
  userName: string
}

export const DbContext = createContext<State>({
  checkLoginExists: async () => false,
  register: async () => false,
  login: async () => false,
  logout: () => undefined,
  insertBlog: async () => false,
  getBlogs: async () => [],
  userName: '',
})
