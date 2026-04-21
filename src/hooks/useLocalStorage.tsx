// import { useState } from "react"

// export default function useLocalStorage<T>(key: string, initialValue: T) {
//     const item = window.localStorage.getItem(key)
//     const [value, setValue] = useState()
//     const value = item ? JSON.parse(item) : initialValue

//     window.localStorage.setItem(key, JSON.stringify(value))

//     try {
//         return JSON.parse(value)
//     } catch (error) {

//     }

//   return []
// }
