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
require("./Skifields.css");
const Skifields = () => {
    (0, react_1.useEffect)(() => {
        getAllSkifields();
    }, []);
    const [skifields, setSkifields] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const getAllSkifields = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get("http://arse-alpine-resort-search-engine-production.up.railway.app/skifields");
        console.log(res.data);
        const skifieldsArray = res.data;
        setSkifields(skifieldsArray);
    });
    return (<div className="skifields">
            <h2>Skifields</h2>
        
            {skifields.length > 0 && (<div className="skifields-container">
                    {skifields.map((skifield) => (<div className="box" key={skifield._id}>
                            <div className="card">
                                <div className="card-image">
                                    <img src={skifield.image} alt={skifield.name}/>
                                    <i className="heart-icon">❤️</i>
                                </div>
                                <div className="card-price">$36/night</div>
                                <h2>{skifield.name}</h2>
                                <p>{skifield.lan}, {skifield.region}, {skifield.country}</p>
                                <button className="read-more" onClick={() => { navigate(`/skifield/${skifield._id}`); }}>More Info</button>
                            </div>
                        </div>))};
                </div>)}
        </div>);
};
exports.default = Skifields;
