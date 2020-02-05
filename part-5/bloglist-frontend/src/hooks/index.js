import { useState } from 'react'
import axios from 'axios'

export const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const inputProps = () => {
    return {
      type,
      value,
      onChange,
      name
    }
  }

  return {
    value,
    inputProps,
    reset,
  }
}
