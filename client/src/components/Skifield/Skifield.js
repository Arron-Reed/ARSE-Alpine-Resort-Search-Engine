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
require("./Skifield.css");
const react_toastify_1 = require("react-toastify");
const Skifield = ({ token, userId }) => {
    const { skifieldId } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        getSkifield();
    });
    const [skifield, setSkifield] = (0, react_1.useState)(null);
    const getSkifield = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get("http://localhost:3001/skifields/" + skifieldId);
            setSkifield(res.data);
        }
        catch (error) {
            console.error(error);
        }
    });
    const handleFavourites = (skifieldId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            yield axios_1.default.post("http://localhost:3001/users/savefavourite", { userId, skifieldId }, { headers });
        }
        catch (error) {
            console.error("Error saving favorite: ", error);
        }
    });
    const handleBeenHere = (skifieldId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            yield axios_1.default.post("http://localhost:3001/users/beenhere", { userId, skifieldId }, { headers });
        }
        catch (error) {
            console.error("Error saving been here: ", error);
        }
    });
    return (<div>
            {skifield ? (<div className="skifield-page">
                    <div className="navbar-space"></div>
                    <div className="skifield-container">
                        <div className="skifield-header">
                            <div>
                                <div className="buttons-box">
                                    <button id="bh-button" className="been-here" onClick={() => { handleBeenHere(skifield._id); react_toastify_1.toast.success('Successfully added to your Been Here List!'); }}>Been Here</button>
                                    <button id="fav-button" className="favourite" onClick={() => { handleFavourites(skifield._id); react_toastify_1.toast.success('Successfully added to your Favourite List!'); }}>Favourite</button>
                                </div>
                            </div>
                            <div className="title">
                                <div>
                                    <h1>{skifield.name}</h1>
                                </div>
                                <div>
                                    <h3>{skifield.lan} - {skifield.region} - {skifield.country}</h3>
                                </div>
                            </div>
                            <div className="skifield-rating-box">
                                <div className="ratings-container">
                                    <div className="ratings-image">
                                        <img src={`/${skifield.rating}.png`} alt="rating out of 5"/>
                                    </div>
                                    <div><p>{skifield.rating} out of 5 stars</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="skifield-top">
                            <div className="skifield-image">
                                <img id="skifield-image" src={skifield.image} alt={skifield.name}/>
                            </div>
                            <div className="skifield-top-info">
                                <div className="skilifts-box">
                                    <div className="skilifts-left">
                                        <i id="skilifts" className="fa-solid fa-cable-car" title="Skilifts"/>
                                    </div>
                                    <div className="skilifts-right">
                                        <div className="ski-slopes-total">
                                            <p>Total: {skifield.skiLifts} ski lifts</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ski-slopes-box">
                                    <div className="ski-slopes-left">
                                        <i id="skifield-slopes" className="fa-solid fa-person-skiing" title="Distance"/>
                                    </div>
                                    <div className="ski-slopes-right">
                                        <div className="ski-slopes-block">
                                            <div className="slopes-colour">
                                                <div className="easy"><p>.</p></div>
                                                <div className="intermediate"><p>.</p></div>
                                                <div className="difficult"><p>.</p></div>
                                            </div>
                                            <div className="slopes-difficulty">
                                                <p>Easy</p>
                                                <p>Intermediate</p>
                                                <p>Difficult</p>
                                            </div>
                                            <div className="slopes-distance">
                                                <p>{skifield.blueSlopes} km</p>
                                                <p>{skifield.redSlopes} km</p>
                                                <p>{skifield.blackSlopes} km</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="skipass-price-box">
                                    <div className="skipass-price-left">
                                        <i id="skifield-price" className="fa-solid fa-coins" title="Adult pass"/>
                                    </div>
                                    <div className="skipass-price-right">
                                        <div className="skipass-price-block">
                                            <div className="adultPrice">
                                                <p className="category">Adult</p>
                                                <p className="skipass-price">{skifield.adultSkiPass}kr</p>
                                            </div>
                                            <div className="youthPrice">
                                                <p className="category">Youth</p>
                                                <p className="skipass-price">{skifield.youthSkiPass}kr</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="elevation-box">
                                    <div className="elevation-left">
                                        <div className="elevation-image">
                                            <img src="/elevation.gif" alt="elevation"/>
                                        </div>
                                    </div>
                                    <div className="elevation-info">
                                        <div className="highest"><p>Highest point {skifield.highest} m</p></div>
                                        <div className="topToBottom"><p>Ski elevation {skifield.topToBottom} m</p></div>
                                        <div className="lowest"><p>Lowest point {skifield.lowest} m</p></div>
                                    </div>
                                </div> 
                            </div>
                        </div>

                        <div className="skifield-bottom">
                            <div className="skifield-bottom-description">
                                <div className="description"><p>{skifield.description}</p></div>
                            </div>
                            <div className="skifield-bottom-info">
                                <div className="generalSeason">
                                    <div className="generalHours-left"><h4>Opening Hours</h4></div>
                                    <div className="generalHours-right">
                                        <p>{skifield.openingTimes}</p>
                                        <p>{skifield.generalSeason}</p>
                                    </div>
                                </div>
                                <div className="nearbyTowns">
                                    <div className="nearbyTowns-left"><h4>Nearby Towns</h4></div>
                                    <div className="nearbyTowns-right">
                                        <p>{skifield.nearbyTown1}</p>
                                        <p>{skifield.nearbyTown2}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : (<p>Loading...</p>)}
        </div>);
};
exports.default = Skifield;
