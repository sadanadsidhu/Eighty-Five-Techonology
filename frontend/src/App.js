import { Route, Routes } from "react-router-dom";
import LoginForm from "./forms/login/Login";
import SignupForm from "./forms/signup/Signup";
import Homepage from "./pages/Homepage";
import EditBlog from "./forms/blogging/editBlog/EditBlog";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/editblog/:id" element={<EditBlog />} />
      </Routes>
    </>
  );
}

export default App;
