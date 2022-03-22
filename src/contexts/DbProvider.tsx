import { Connection } from 'jsstore'
import { DbContext } from './DbContext'
import { Md5 } from 'ts-md5/dist/md5'
import React, { useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
}

type TUser = {
  id: number
  name: string
}

const DbProvider = ({ children }: Props) => {
  const tbl = { login: 'Login', blog: 'Blog' }
  const [connection, setConnection] = useState<Connection>()
  const [user, setUser] = useState<TUser>()
  const dbName = 'Blog'

  const initDb = async () => {
    // initiate jsstore connection
    if (!connection) {
      setConnection(new Connection(new Worker('jsstore.worker.js')))
      if (!connection) return
      // console.info(connection)
    }

    // step1 - create database schema
    const tblLogin = {
      name: tbl.login,
      columns: {
        // Here "Id" is name of column
        Id: { primaryKey: true, autoIncrement: true },
        Login: { notNull: true, login: 'string' },
        Name: { notNull: true, dataType: 'string' },
        Password: { notNull: true, dataType: 'string' },
      },
    }

    const tblBlog = {
      name: tbl.blog,
      columns: {
        // Here "Id" is name of column
        Id: { primaryKey: true, autoIncrement: true },
        userId: { notNull: true, dataType: 'number' },
        Name: { notNull: true, dataType: 'string' },
        Text: { notNull: true, dataType: 'string' },
        Created: { notNull: true, dataType: 'date_time' },
      },
    }

    const db = {
      name: dbName,
      tables: [tblLogin, tblBlog],
    }

    // step 2
    connection?.initDb(db)
    // const isDbCreated = await connection?.initDb(db)
    // if (isDbCreated) {
    //   console.info('Db Created & connection is opened')
    // } else {
    //   console.info('Connection is opened')
    // }
    // console.info(connection)
  }

  useEffect(() => {
    initDb()
  })

  const checkLoginExists = async (login: string): Promise<boolean> => {
    const results = await connection?.select({
      from: tbl.login,
      where: { Login: login },
    })
    return results !== undefined && results?.length > 0
  }

  const register = async (name: string, login: string, password: string): Promise<boolean> => {
    const hash = Md5.hashAsciiStr(password)
    const rowCnt = await connection?.insert({
      into: tbl.login,
      values: [{ Name: name, Login: login, Password: hash }],
    })
    return rowCnt !== undefined && rowCnt > 0
  }

  const login = async (login: string, password: string): Promise<boolean> => {
    const hash = Md5.hashAsciiStr(password)
    const results: { Id: number; Name: string; Login: string; Password: string }[] | undefined =
      await connection?.select({
        from: tbl.login,
        where: { Login: login, Password: hash },
      })
    if (results === undefined || results.length === 0) return false
    setUser({ id: results[0].Id, name: results[0].Name })
    return true
  }

  const logout = () => {
    setUser(undefined)
  }

  const insertBlog = async (name: string, text: string): Promise<boolean> => {
    if (!user) return false
    const rowCnt = await connection?.insert({
      into: tbl.blog,
      values: [{ userId: user.id, Name: name, Text: text, Created: new Date() }],
    })
    return rowCnt !== undefined && rowCnt > 0
  }

  const getBlogs = async () => {
    const results:
      | {
          Author: string
          Author_Id: number
          Created: string
          Id: number
          Login: string
          Name: string
          Password: string
          Text: string
          userId: number
        }[]
      | undefined = await connection?.select({
      from: tbl.blog,
      join: [
        {
          with: tbl.login,
          on: `${tbl.blog}.userId=${tbl.login}.Id`,
          as: {
            Id: 'Author_Id',
            Name: 'Author',
          },
        },
      ],
      order: {
        by: `${tbl.blog}.Created`,
        type: 'desc',
      },
    })
    return (
      results?.map(items => {
        return {
          author: items.Author,
          name: items.Name,
          text: items.Text,
          created: new Date(items.Created).toLocaleString(),
        }
      }) || []
    )
  }

  const userName = user?.name || ''

  return (
    <DbContext.Provider
      value={{
        checkLoginExists,
        register,
        login,
        logout,
        insertBlog,
        getBlogs,
        userName,
      }}
    >
      {children}
    </DbContext.Provider>
  )
}
export default DbProvider
