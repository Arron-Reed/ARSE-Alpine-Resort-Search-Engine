"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
require("./Admin.css");
const Dashboard = ({ userId, token }) => {
    const [id, setId] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [username, setUsername] = (0, react_1.useState)("");
    const [role, setRole] = (0, react_1.useState)("");
    const [image, setImage] = (0, react_1.useState)("");
    //    const [favourites, setFavourites] = useState<[string]>([""]);
    //    const [beenHere, setBeenHere] = useState<[string]>([""]);
    const [view, setView] = (0, react_1.useState)("Profile");
    const [skifields, setSkifields] = (0, react_1.useState)([]);
    const [users, setUsers] = (0, react_1.useState)([]);
    const [beenHereSkifields, setBeenHereSkifields] = (0, react_1.useState)([]);
    //    const [createIsOpen, setCreateIsOpen] = useState(false); 
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = yield axios_1.default.get("http://localhost:3001/users/" + userId, accessToken);
            setId(res.data._id);
            setEmail(res.data.email);
            setUsername(res.data.username);
            setRole(res.data.role);
            setImage(res.data.image);
            //            setFavourites(res.data.favourites)
            //            setBeenHere(res.data.beenHere)
        });
        getUser();
    }, [userId, token]);
    const infoBox = () => {
        switch (view) {
            case "Profile":
                return (<div className="profile-container">
                        <div className="profile-header"><h3>{view}</h3></div>
                        <div className="user-card">
                            <div className="user-card-img">
                                <img src={image ? image : "./unknown.jpg"} alt={username} className="profile-image"/>
                            </div>
                            <div className="profile-right">
                                <div className="user-card-info">
                                    <div className="profile-name"><h4>{username}</h4><p id="role">{role}</p></div>
                                    <p><span>Id:</span> {id}</p>
                                    <p><span>Email:</span> {email}</p>
                                    <p><span>Location:</span> Stockholm, Sweden</p>
                                    <p><span>About me:</span> Snowboarder, loves riding powder and exploring new skifields</p>
                                    <div className="profile-buttons">
                                        <div className="profile-button-box">
                                            <button className="been-here" /*onClick={ () => handleBeenHere(skifield._id) }*/>Edit</button>
                                            <button className="favourite" /*onClick={ () => handleFavourites(skifield._id) }*/>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>);
            /*
                        case "My Skifields":
                            return (
                                <div className="profile-container">
                                    <CreateSkifieldModal
                                                isOpen={createIsOpen}
                                                onClose={() => setCreateIsOpen(false)}
                                                onCreate={createSkifield}
                                            />
                                    <div className="profile-header">
                                        <h3>{view}</h3>
                                        <button className="createSkifield" onClick={() => setCreateIsOpen(true)}>Add Skifield</button>
                                            
                                    </div>
                                    <div className="my-skifields-card">
                                        <table width="100%">
                                            <thead>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            );
            */
            case "Users":
                return (<div className="favourites-container">
                        <div><h2>All Users</h2></div>
                        <table>
                            <thead>
                                <tr>
                        <th>USERNAME</th>
                        <th>EMAIL</th>
                        <th>ROLE</th>
                        <th>ID</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (<tr className="table-row" key={user._id}>
                        <td>
                            <div className="skifield-info">
                                <img id="user-image" src={user.image ? user.image : "./unknown.jpg"} alt={user.username}/>                   
                                    <div className="name">{user.username}</div>
                            </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user._id}</td>
                        <td><button id="edit-button1">Edit</button></td>
                        <td><button id="delete-button1">Delete</button></td>
                    </tr>))} 
                </tbody>
            </table>
        </div>);
            case "My Favourites":
                return (<div className="favourites-container">
                        <div><h2>My Favourites</h2></div>
                        <table>
                            <thead>
                                <tr>
                                    <th>SKIFIELD</th>
                                    <th>LIFTS</th>
                                    <th>STATUS</th>
                                    <th>SLOPES</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {skifields.map((skifield) => (<tr className="table-row" key={skifield._id}>
                                    <td>
                                        <div className="skifield-info">
                                            <img src={skifield.image} alt={skifield.name} className="profile-pic"/>
                                            <div>
                                                <div className="name">{skifield.name}</div>
                                                <div className="email">{skifield.lan}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{skifield.skiLifts} Skilifts</td>
                                    <td><span className="status active-button">Active</span></td>
                                    <td>{skifield.totalSlopes}km</td>
                                    <td><button className="edit-button" onClick={() => { removeFavourite(skifield._id); }}>Remove</button></td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>);
            case "Places I've Been":
                return (<div className="favourites-container">
                        <div><h2>Places I've Been</h2></div>
                        <table>
                            <thead>
                                <tr>
                                    <th>SKIFIELD</th>
                                    <th>LIFTS</th>
                                    <th>STATUS</th>
                                    <th>SLOPES</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {beenHereSkifields.map((skifield) => (<tr className="table-row" key={skifield._id}>
                                    <td>
                                        <div className="skifield-info">
                                            <img src={skifield.image} alt={skifield.name} className="profile-pic"/>
                                            <div>
                                                <div className="name">{skifield.name}</div>
                                                <div className="email">{skifield.lan}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{skifield.skiLifts} Skilifts</td>
                                    <td><span className="status active-button">Active</span></td>
                                    <td>{skifield.totalSlopes}km</td>
                                    <td><button className="edit-button" onClick={() => { removeBeenHere(skifield._id); }}>Remove</button></td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>);
            default:
                return <p>Profile</p>;
        }
    };
    const getFavourites = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(`http://localhost:3001/users/favourites/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const favouritesArray = res.data.favourites;
            setSkifields(favouritesArray);
        }
        catch (error) {
            console.error(error);
        }
    });
    const removeFavourite = (skifieldId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.delete(`http://localhost:3001/users/favourites/${userId}/${skifieldId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            yield getFavourites();
        }
        catch (error) {
            console.error(error);
        }
    });
    const getBeenHere = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(`http://localhost:3001/users/beenhere/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const beenHereArray = res.data.beenhere;
            setBeenHereSkifields(beenHereArray);
        }
        catch (error) {
            console.error(error);
        }
    });
    const removeBeenHere = (skifieldId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.delete(`http://localhost:3001/users/beenhere/${userId}/${skifieldId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            yield getBeenHere();
        }
        catch (error) {
            console.error(error);
        }
    });
    /*
        const createSkifield = (event) => {
            event.preventDefault();
            console.log('Skifield created');
            setCreateIsOpen(false);
        };
    */
    const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get("http://localhost:3001/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const usersArray = res.data;
            setUsers(usersArray);
        }
        catch (error) {
            console.error(error);
        }
    });
    return (<div className="dashboard-page">
            <div className="dash-navbar-space"></div>
            <div className="dashboard-container">
                <div className="dash-nav">
                    <ul>
                        <li>
                            <a href="#" className="nav-logo">
                                <img src="/ARlogo-nverted.png" alt="logo"/>
                            </a> 
                        </li>
                        <li>
                            <a className="nav-a">
                                <i className="fa-solid fa-house"></i>
                                <span className="nav-item" onClick={() => { navigate("/"); }}>Home</span>
                            </a>
                        </li>
                        <li>
                            <a className="nav-a">
                                <i className="fa-solid fa-user"></i>
                                <span className="nav-item" onClick={() => { setView("Profile"); }}>My Profile</span>
                            </a>
                        </li>
                        {role === "Super Admin" && (<li>
                                <a className="nav-a">
                                    <i className="fa-solid fa-users"></i>
                                    <span className="nav-item" onClick={() => { setView("Users"); getUsers(); }}>Users</span>
                                </a>
                            </li>)}
                                           <li>
                            <a className="nav-a">
                                <i className="fa-solid fa-star"></i>
                                <span className="nav-item" onClick={() => { setView("My Favourites"); getFavourites(); }}>My Favourites</span>
                            </a>
                        </li>
                        <li>
                            <a className="nav-a">
                                <i className="fa-solid fa-check"></i>
                                <span className="nav-item" onClick={() => { setView("Places I've Been"); getBeenHere(); }}>Places I've Been</span>
                            </a>
                        </li>
                        <li>
                            <a href="" className="nav-a">
                                <i className="fa-solid fa-list-check"></i>
                                <span className="nav-item">Tasks</span>
                            </a>
                        </li>
                        <li>
                            <a href="" className="nav-a">
                                <i className="fa-solid fa-gear"></i>
                                <span className="nav-item">Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="" className="nav-a">
                                <i className="fa-solid fa-circle-question"></i>
                                <span className="nav-item">Help</span>
                            </a>
                        </li>
                        <li>
                            <a id="logout" className="nav-a">
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span className="nav-item" onClick={() => { setView("Profile"); }}>Logout</span>
                            </a>
                        </li>  
                    </ul>
                </div>

                <section className="main">
                    <div className="main-top">
                        <h2>Dashboard</h2>
                        <i className="fa-solid fa-sliders"></i>
                    </div>
                    <div className="main-dashboard">
                        <div id="profile" className="card" onClick={() => { setView("Profile"); }}>
                            <i className="fa-solid fa-user"></i>
                            <h3>Profile</h3>
                            <p>Edit User Profile</p>
                            <button>Update</button>
                        </div>
                        {role === "Super Admin" && (<div id="users" className="card" onClick={() => { setView("Users"); getUsers(); }}>
                                <i className="fa-solid fa-users"></i>
                                <h3>Users</h3>
                                <p>Edit All Users</p>
                                <button>Update</button>
                            </div>)}
                        <div id="favourites" className="card" onClick={() => { setView("My Favourites"); getFavourites(); }}>
                            <i className="fa-solid fa-star"></i>
                            <h3>My Favourites</h3>
                            <p>Edit Favourite List</p>
                            <button>Update</button>
                        </div>
                        <div id="been" className="card" onClick={() => { setView("Places I've Been"); getBeenHere(); }}>
                            <i className="fa-solid fa-check"></i>
                            <h3>My Places</h3>
                            <p>Edit Places I've Been</p>
                            <button>Update</button>
                        </div>
                    </div>

                    <section className="main-bottom">
                        <div className="">
                            {infoBox()}
                        </div>
                    </section>
                </section>
            </div>
    </div>);
};
exports.default = Dashboard;
