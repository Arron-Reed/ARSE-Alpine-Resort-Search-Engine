"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Home_1 = __importDefault(require("./components/Home/Home"));
const Skifields_1 = __importDefault(require("./components/Skifields/Skifields"));
const Skifield_1 = __importDefault(require("./components/Skifield/Skifield"));
const Login_1 = __importDefault(require("./components/Login/Login"));
const Admin_1 = __importDefault(require("./components/Admin/Admin"));
require("./App.css");
const react_toastify_1 = require("react-toastify");
const App = () => {
    const [accessToken, setAccessToken] = (0, react_1.useState)("");
    const [userId, setUserId] = (0, react_1.useState)("");
    const [favourites, setFavourites] = (0, react_1.useState)([]);
    const [beenHere, setBeenHere] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleLogout = () => {
        setAccessToken("");
        setUserId("");
        setFavourites([]);
        setBeenHere([]);
        navigate("/");
    };
    return (<div>
      <header>
        <react_router_dom_1.Link to="/"> <img src="./logo.png" alt="Logo" className="logo"/> </react_router_dom_1.Link>
        <nav className="nav">
          <react_router_dom_1.Link to="/" className="a">Home</react_router_dom_1.Link>
          <react_router_dom_1.Link to="/skifields" className="a">Skifields</react_router_dom_1.Link>
          {accessToken ? (<div>
              <react_router_dom_1.Link to="/admin" className="a">Dashboard</react_router_dom_1.Link>
              <button className="login-button" onClick={handleLogout}>Log Out</button>
            </div>) : (<react_router_dom_1.Link to="/login"><button className="login-button">Register / Login</button></react_router_dom_1.Link>)}
        </nav>
      </header>
            <react_toastify_1.ToastContainer />
      <main>
        <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<Home_1.default userId={userId} token={accessToken} favourites={favourites} beenHere={beenHere} setFavourites={setFavourites} setBeenHere={setBeenHere}/>}/>
          <react_router_dom_1.Route path="/skifields" element={<Skifields_1.default />}/>
          <react_router_dom_1.Route path="/skifield/:skifieldId" element={<Skifield_1.default userId={userId} token={accessToken}/>}/>
          <react_router_dom_1.Route path="/login" element={<Login_1.default setToken={setAccessToken} setUserId={setUserId}/>}/>
          <react_router_dom_1.Route path="/admin" element={<Admin_1.default token={accessToken} userId={userId}/>}/>
        </react_router_dom_1.Routes>
      </main>
      </div>);
};
exports.default = App;
