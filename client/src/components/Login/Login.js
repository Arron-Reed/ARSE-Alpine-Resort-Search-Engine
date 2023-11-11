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
require("./Login.css");
const react_toastify_1 = require("react-toastify");
const Login = ({ setToken, setUserId }) => {
    const [username, setUsername] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleUsername = (event) => {
        setUsername(event.currentTarget.value);
    };
    const handleEmail = (event) => {
        setEmail(event.currentTarget.value);
    };
    const handlePassword = (event) => {
        setPassword(event.currentTarget.value);
    };
    const login = () => __awaiter(void 0, void 0, void 0, function* () {
        const newLoginUser = {
            email: email,
            password: password
        };
        const res = yield axios_1.default.post("http://localhost:3001/users/login", newLoginUser);
        console.log(res.data.accessToken);
        console.log("User Id: " + res.data.userId);
        setToken(res.data.accessToken);
        navigate("/");
        setUserId(res.data.userId);
    });
    const register = () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            username: username,
            email: email,
            password: password
        };
        yield axios_1.default.post("http://localhost:3001/users/register", newUser);
        navigate("/");
        react_toastify_1.toast.success('User Successfully Created');
    });
    (0, react_1.useEffect)(() => {
        const loginLink = document.querySelector('.login-link');
        const registerLink = document.querySelector('.register-link');
        const wrapper = document.querySelector('.wrapper');
        if (registerLink && loginLink && wrapper) {
            registerLink.addEventListener('click', () => {
                wrapper.classList.add('active');
            });
            loginLink.addEventListener('click', () => {
                wrapper.classList.remove('active');
            });
        }
    }, []);
    return (<div className="login-body">
        <div className="wrapper">
            <span className="icon-close">
                <i className="fa-solid fa-xmark"></i>
            </span>
            <div className="form-box login">
                <h2>Login</h2>
                <form action="#">
                    <div className="input-box"> 
                        <i className="fa-solid fa-envelope"></i>  
                        <input type="email" required onChange={handleEmail}/>
                        <label>Email</label>
                    </div>

                    <div className="input-box">
                        <i className="fa-solid fa-lock"></i>
                        <input type="password" required onChange={handlePassword}/>
                        <label>Password</label>
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox"/>Remember me
                        </label>

                        <a href="#">Forgot Password</a>
                    </div>
                    <button type="submit" className="btn" onClick={login}>Login</button>
                    <div className="login-register">
                        <p>Dont't have an account? <a href="#" className="register-link">Register</a></p>
                    </div>
                </form>
            </div> 

            <div className="form-box register">
                <h2>Registration</h2>
                <form action="#">
                    <div className="input-box"> 
                        <i className="fa-solid fa-user"></i>  
                        <input type="text" required onChange={handleUsername}/>
                        <label>Username</label>
                    </div>

                    <div className="input-box"> 
                        <i className="fa-solid fa-envelope"></i>  
                        <input type="email" required onChange={handleEmail}/>
                        <label>Email</label>
                    </div>

                    <div className="input-box">
                        <i className="fa-solid fa-lock"></i>
                        <input type="password" required onChange={handlePassword}/>
                        <label>Password</label>
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox"/>I agree to the terms & conditions
                        </label>
                    </div>
                    <button type="submit" className="btn" onClick={register}>Register</button>
                    <div className="login-register">
                        <p>Already have an account? <a href="#" className="login-link">Login</a></p>
                    </div>
                </form>
            </div>    

        </div>
        </div>);
};
exports.default = Login;
