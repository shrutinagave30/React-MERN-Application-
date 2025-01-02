import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import App from './App'
import { DataProvider } from './Context'
import Register from './components/Login/Register'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Owner from './components/Login/Owner'
import Dashboard from './components/OwnerDashboard/Dashboard'
import Veg from './Screens/Veg'
import NonVeg from './Screens/NonVeg'
import Snacks from './Screens/Snacks'
import Beverage from './Screens/Bevarages'
import Desserts from './Screens/Desserts'
import Soup from './Screens/Soup'
import Bill from './Bill'

const router=createBrowserRouter(
    [
        
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>

        },
        {
            path:'/',
            element:<App/>,
        },
        {
            path:'/home/:id',
            element:<Home/>
        },{
            path:'/owner',
            element:<Owner/>
        },{
            path:'/dashboard',
            element:<Dashboard/>
        },
        {
            path:'/veg',
            element:<Veg/>
        },
        {
            path:'/nonveg',
            element:<NonVeg/>
        },
        {
            path:'/snacks',
            element:<Snacks/>
        },
        {
            path:'/bevarage',
            element:<Beverage/>
        },{
            path:"/desserts",
            element:<Desserts/>
        },{
            path:'/soup',
            element:<Soup/>
        },{
            path:'/bill',
            element:<Bill/>

        }
    ]
)

function AppRouter() {
  return (
    <DataProvider>
        <RouterProvider router={router}/>
    </DataProvider>
  )
}

export default AppRouter