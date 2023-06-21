import Homes from "../Pages/Homes"
import LoginPage from "../Pages/LoginPage"
import AddUpdateBlog from "../components/Blog/AddUpdateBlog"
type routeItem = {
    id:number,
    name: string,
    element: JSX.Element

}

// eslint-disable-next-line react-refresh/only-export-components
export const publicRoute:Array<routeItem> = [
    {id:1, name:"/login", element: <LoginPage />},
    {id:2, name: "/register", element: <LoginPage />},
    {id:3, name: "/", element: <Homes />}
]
export const PrivateRoute:Array<routeItem> =[
    {id:20, name:"/homes", element: <Homes/>},
    {id:21, name: "blog/add", element: <AddUpdateBlog />}
]