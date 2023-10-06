import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentecation from "./routes/authentication/authentecation.component";

const Shop = () => {
  return <h1>I am the shop page</h1>;
};
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="auth" element={<Authentecation />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
