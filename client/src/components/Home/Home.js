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
const Map_1 = __importDefault(require("../Map/Map"));
require("./Home.css");
const SearchBar_1 = __importDefault(require("../SearchBar/SearchBar"));
const react_toastify_1 = require("react-toastify");
const Home = ({ token, userId, setFavourites, setBeenHere, favourites, beenHere, }) => {
    const [skifields, setSkifields] = (0, react_1.useState)([]);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            yield getAllSkifields();
            if (token) {
                yield getUserLists();
            }
        });
        fetchData();
    }, [token]);
    const getAllSkifields = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get("http://arse-alpine-resort-search-engine-production.up.railway.app/skifields");
        const skifieldsArray = res.data.map((skifield) => ({
            _id: skifield._id,
            name: skifield.name,
            country: skifield.country,
            skiLifts: skifield.skiLifts,
            image: skifield.image,
            position: { "lat": skifield.lat, "lng": skifield.lng },
            region: skifield.region,
            lan: skifield.lan,
            elevation: skifield.elevation,
            topToBottom: skifield.topToBottom,
            highest: skifield.highest,
            lowest: skifield.lowest,
            totalSlopes: skifield.totalSlopes,
            blueSlopes: skifield.blueSlopes,
            redSlopes: skifield.redSlopes,
            blackSlopes: skifield.blackSlopes,
            rating: skifield.rating,
            adultSkiPass: skifield.adultSkiPass,
        }));
        setSkifields(skifieldsArray);
    });
    const getUserLists = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const favRes = yield axios_1.default.get(`http://arse-alpine-resort-search-engine-production.up.railway.app/users/favourites/${userId}`, { headers });
            const favouriteList = favRes.data.favourites;
            const favIds = favouriteList.map((item) => item._id);
            setFavourites(favIds);
            const beenHereRes = yield axios_1.default.get(`http://arse-alpine-resort-search-engine-production.up.railway.app/users/beenHere/${userId}`, { headers });
            const BHlist = beenHereRes.data.beenhere;
            const beenHereIds = BHlist.map((item) => item._id);
            setBeenHere(beenHereIds);
        }
        catch (error) {
            console.error("Error fetching user lists: ", error);
            setFavourites([]);
            setBeenHere([]);
        }
    });
    const isFavourite = (skifieldId) => favourites.includes(skifieldId);
    const hasBeenHere = (skifieldId) => beenHere.includes(skifieldId);
    const handleFavourites = (skifieldId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            if (!isFavourite(skifieldId)) {
                setFavourites([...favourites, skifieldId]);
                react_toastify_1.toast.success('Successfully added to your Favourite List!');
            }
            yield axios_1.default.post("http://arse-alpine-resort-search-engine-production.up.railway.app/users/savefavourite", { userId, skifieldId }, { headers });
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
            if (!hasBeenHere(skifieldId)) {
                setBeenHere([...beenHere, skifieldId]);
                react_toastify_1.toast.success('Successfully added to your Been Here List!');
            }
            yield axios_1.default.post("http://arse-alpine-resort-search-engine-production.up.railway.app/users/beenhere", { userId, skifieldId }, { headers });
        }
        catch (error) {
            console.error("Error saving been here: ", error);
            setBeenHere(beenHere.filter(id => id !== skifieldId));
            react_toastify_1.toast.error('Error saving to your Been Here List.');
        }
    });
    const handleMapMarkerClick = (skiFieldName) => {
        setSearchTerm(skiFieldName);
    };
    return (<div className="home">
            <div className="navbar-space"></div>
            <div className="home-box">
                <div className="home-left">
                    <div className="search-bar">
                        {<SearchBar_1.default setSkifields={setSkifields} token={token} userId={userId} searchTerm={searchTerm}/>}
                    </div>
                        {skifields.length > 0 && (<div className="">
                                {skifields.map((skifield) => (<div className="box" key={skifield._id}>
                                        <div className="body-box">
                                            <div className="image-box">
                                                <img src={skifield.image} alt={skifield.name}/>
                                                {isFavourite(skifield._id) && <span className="favorite-icon"><i className="fa-solid fa-star"></i></span>}
                                                {hasBeenHere(skifield._id) && <span className="beenhere-icon"><i className="fa-solid fa-check"></i></span>}
                                            </div>
                                            <div className="content-box">

                                                <div className="top-content">                  
                                                    <div className="name"><h4>{skifield.name}</h4></div>
                                                    <div className="rating-box">
                                                        <img className="rating" src={`/${skifield.rating}.png`} alt="rating" title={`${skifield.rating} out of 5`}/>
                                                    </div>
                                                </div>

                                                <div className="middle-content">
                                                    <div className="middle-content-left">
                                                        <div className="skiLifts">
                                                            <i className="fa-solid fa-cable-car" title="Ski lifts"/>
                                                            <p>{skifield.skiLifts} ski lifts</p>
                                                        </div>
                                                        <div className="price"><i className="fa-solid fa-coins" title="Adult pass"></i>{skifield.adultSkiPass}kr (SEK)</div>
                                                    </div>
                                                    <div className="middle-content-right">
                                                        <div className="slope-diagram">
                                                            <i className="fa-solid fa-person-skiing" title="Distance"/>
                                                            <div className="total-slopes"><p>{skifield.totalSlopes}km</p></div>
                                                            <div className="blue"><p>{skifield.blueSlopes}km</p></div>
                                                            <div className="red"><p>{skifield.redSlopes}km</p></div>
                                                            <div className="black"><p>{skifield.blackSlopes}km</p></div>
                                                        </div>
                                                        <div className="elevation"><i className="fa-solid fa-arrows-up-down" title="Altitude"/>{skifield.elevation}</div>
                                                    </div>
                                                </div>
                                                <div className="bottom-content">
                                                    {token ? (<div className="button-box">
                                                            <div className="bottom-content-left">
                                                                <button className={isFavourite(skifield._id) ? "grey-button" : "favourite"} onClick={() => handleFavourites(skifield._id)}>Favourite</button>
                                                                <button className={hasBeenHere(skifield._id) ? "grey-button" : "been-here"} onClick={() => handleBeenHere(skifield._id)}>Been Here</button>
                                                            </div>
                                                            <div className="bottom-content-right">
                                                                <button className="more-info" onClick={() => { navigate(`/skifield/${skifield._id}`); }}>More Info</button>
                                                            </div>
                                                        </div>) : (<div className="whole-button-box">
                                                            <button className="whole-more-info" onClick={() => { navigate(`/skifield/${skifield._id}`); }}>More Info</button>
                                                        </div>)}
                                                </div> 

                                            </div>
                                        </div>
                                    </div>))}
                            </div>)}
                    
                </div>

                <div className="home-right">
                    <Map_1.default skifields={skifields} onMarkerClick={handleMapMarkerClick}/>
                </div>
            </div>
            
            
        </div>);
};
exports.default = Home;
