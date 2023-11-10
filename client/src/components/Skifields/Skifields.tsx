import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "./Skifields.css"
import { ISkifield } from "../interface.ts";

const Skifields: FC = () => {

    useEffect(() => {
        getAllSkifields();
    },[]);

    const [skifields, setSkifields] = useState([]);
    const navigate = useNavigate();

    const getAllSkifields = async () => {
        const res = await axios.get("http://localhost:3001/skifields");
        console.log(res.data)
        const skifieldsArray = res.data

        setSkifields(skifieldsArray); 
    };

    return(
        <div className="skifields">
            <h2>Skifields</h2>
        
            {skifields.length > 0 && (
                <div className="skifields-container">
                    {skifields.map((skifield: ISkifield) => (
                        <div className="box" key={skifield._id}>
                            <div className="card">
                                <div className="card-image">
                                    <img src={skifield.image} alt={skifield.name} />
                                    <i className="heart-icon">❤️</i>
                                </div>
                                <div className="card-price">$36/night</div>
                                <h2>{skifield.name}</h2>
                                <p>{skifield.lan}, {skifield.region}, {skifield.country}</p>
                                <button className="read-more" onClick={()=> { navigate(`/skifield/${skifield._id}`)}}>More Info</button>
                            </div>
                        </div>
                    ))};
                </div>
            )}
        </div>
    )
}

export default Skifields