import { useState, useCallback } from 'react'
import axios from 'axios'

const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(url)
      return response.data
    } catch (err) {
      // setError(err.message || 'Something went wrong')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { fetchData, loading, error }
}

export default useApi