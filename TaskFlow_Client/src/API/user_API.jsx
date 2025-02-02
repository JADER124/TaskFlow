import axios from 'axios'

const User_Api = () => {
    return axios.get('http://127.0.0.1:8000/TaskFlow/Api_User/users/')
}

export default User_Api