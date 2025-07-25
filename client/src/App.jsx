import { BrowserRouter } from "react-router-dom";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';
import 'react-loading-skeleton/dist/skeleton.css'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} transition={Bounce} />
    </>
  )
}

export default App