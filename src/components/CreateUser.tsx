'use client'

import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $name: String) {
    createUser(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  }
`

export default function CreateUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createUser({ variables: { email, password, name } })
  }

  if (loading) return <p>Submitting...</p>
  if (error) return <p>Error: {error.message}</p>
  if (data) return <p>User created successfully!</p>

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button type="submit">Create User</button>
    </form>
  )
}