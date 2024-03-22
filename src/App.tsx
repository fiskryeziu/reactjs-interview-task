import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Layout from "./components/Layout"
import Notelist from "./components/Notes"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path=":categoryId" element={<Notelist />} />
    </Route>
  )
)
function App() {
  return <RouterProvider router={router} />
}

export default App
