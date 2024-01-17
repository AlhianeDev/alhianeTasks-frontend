import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";

import Footer from "./components/Footer";

import Home from "./pages/Home";

import AddTask from "./pages/AddTask";

import UpdateTask from "./pages/UpdateTask";

function App() {

  return (<>
    
    <Header />

      <Routes>

        <Route path="/" element={ <Home /> } />

        <Route path="/addTask" element={ <AddTask /> } />

        <Route path="/updateTask/:todoId" element={ <UpdateTask /> } />

      </Routes>

    <Footer />

  </>);

}

export default App;
