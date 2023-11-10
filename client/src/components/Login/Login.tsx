import { FC,  useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "./Login.css";
import { toast } from "react-toastify";


type LoginProps = {
    setToken: React.Dispatch<React.SetStateAction<string>>,
    setUserId: React.Dispatch<React.SetStateAction<string>>,
}

const Login: FC<LoginProps> = ({setToken, setUserId}) => {

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();


    const handleUsername = (event: FormEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value);
    };

    const handleEmail = (event: FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    };
    
    const handlePassword = (event: FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const login = async () => {
        const newLoginUser = {
            email: email,
            password: password
        }
        const res = await axios.post("http://localhost:3001/users/login", newLoginUser);
        console.log(res.data.accessToken);
        console.log("User Id: " + res.data.userId)
        setToken(res.data.accessToken);
        navigate("/");
        setUserId(res.data.userId)
    }

    const register = async () => {
        const newUser = {
            username: username,
            email: email,
            password: password
        }
        await axios.post("http://localhost:3001/users/register", newUser);
        navigate("/"); toast.success('User Successfully Created');
    }

        useEffect(() => {
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

    return(
        <div className="login-body">
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
                    <button type="submit" className="btn" onClick={login} >Login</button>
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
                    <button type="submit" className="btn" onClick={register} >Register</button>
                    <div className="login-register">
                        <p>Already have an account? <a href="#" className="login-link">Login</a></p>
                    </div>
                </form>
            </div>    

        </div>
        </div>

    )
}

export default Login;