
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Browse from './components/Browse'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Profile from './components/Profile'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


// ______________
// < happy coding >
//  --------------
//   \
//    \
//        (\/)
//       (_o |
//        /  |
//        \  \______
//         \        )o
//          /|----- |
//          \|     /|


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },


]


)
function App() {

  return (
    <>
      <RouterProvider router = { appRouter } />
    </>
  )
}

export default App
