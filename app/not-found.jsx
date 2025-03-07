'use client'
import ErrorPage from './components/ErrorPage'

export default function Error({ error, reset }) {
  console.log('Error = :', error)
  return <ErrorPage />
}
