import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Home'
import Redirect from './Redirect'
import NotFound from './NotFound'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path=":alias" element={<Redirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
