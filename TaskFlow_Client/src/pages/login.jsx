import React, {useEffect} from 'react'
import User_Api from '../API/user_API'

const Login = () => {

    useEffect(()=>{
        async  function load_Users() {
            try {
                const res = await User_Api()
                console.log(res.data)
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        }
        load_Users()
    },[])

  return (
    <div>login</div>
  )
}

export default Login