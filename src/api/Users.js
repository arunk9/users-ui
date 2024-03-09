import axios from 'axios'
import { USERS_API_BASE_URL } from '../constants'

const User = axios.create({
    baseURL: USERS_API_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': true,
      },
})

export default User



