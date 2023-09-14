import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import {UserType} from './HW3'

type GreetingContainerPropsType = {
  users: UserType[]
  addUserCallback: (name: string) => void
}

export const pureAddUser = (name: string, setError: (error: string) => void, setName: (name: string) => void, addUserCallback: (name: string) => void) => {

  if (name.trim().length) {
    addUserCallback(name)
    setName('')
  } else {
    setError('Ошибка! Введите имя!')
  }
}

export const pureOnBlur = (name: string, setError: Function) => {
  // setError('Ошибка! Введите имя!')
   const newName = name.trim()
  if (!newName.length) {
    setError('Ошибка! Введите имя!')
  }
}

export const pureOnEnter = (e: any, addUser: () => void) => {
  if (e.key === 'Enter') {
    addUser()
  }
}


const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
                                                                   users,
                                                                   addUserCallback,
                                                                 }) => {
  // деструктуризация пропсов
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<string | null>('')

  const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
    error && setError('')
    // const value = e.target.value
    // if (value) {
    //   setName(value)
    //   setError(null)
    // } else {
    //   setError('Ошибка! Введите имя!')
    //   setName('')
    // }
  }

  const addUser = () => {
    pureAddUser(name, setError, setName, addUserCallback)
  }

  const onBlur = () => {
    pureOnBlur(name, setError)
  }

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    pureOnEnter(e, addUser)
  }

  const totalUsers = users.length
  const lastUserName = users.length ? users[users.length - 1].name : ''
  console.log(lastUserName)


  return (
    <Greeting
      name={name}
      setNameCallback={setNameCallback}
      addUser={addUser}
      onBlur={onBlur}
      onEnter={onEnter}
      error={error}
      totalUsers={totalUsers}
      lastUserName={lastUserName}
    />
  )
}

export default GreetingContainer
