

import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import MenuPage from './Pages/MenuPage/MenuPage';
import SignUp from './Pages/SignUp/SignUp';
import SuccessPage from './Pages/SuccessPage/SuccessPage';

function App() {
  return (
    <>


      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Use element prop to render the ProductPage component */}
        <Route path="/SignUp" element={<SignUp />} /> {/* Use element prop to render the ProductPage component */}
        <Route path="/menu" element={<MenuPage />} /> {/* Use element prop to render the ProductPage component */}
        <Route path="/success" element={<SuccessPage />} /> {/* Use element prop to render the ProductPage component */}
      </Routes>




    </>
  );
}

export default App;
