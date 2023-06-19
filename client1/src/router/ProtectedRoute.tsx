import {Navigate} from 'react-router-dom'
interface IPropsProtected  {
    children: JSX.Element
}

const ProtectedRoute = ({children}:IPropsProtected) => {

   const token = localStorage.getItem("token")
   console.log(`token`, token)
   if(token) {
        return children
   }
   else {
    return <Navigate to="/login" />;
   }
 
}

export default ProtectedRoute
