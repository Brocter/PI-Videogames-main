import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import Landing from './views/Landing';
import Home from './views/Home';
import Detail from './views/Detail';
import CreateVideogame from './views/CreateVideogame';
import { useLocation } from 'react-router-dom';



function App() {
  const location = useLocation();
  

  return (
    <div>
     
        <NavBar show={location.pathname !== "/"} /> 
        
      <Routes>
      
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="home/detail/:id" element={<Detail />} />
        <Route path="/form" element={<CreateVideogame />} />
        
      </Routes>
    </div>
  );
}

export default App;

