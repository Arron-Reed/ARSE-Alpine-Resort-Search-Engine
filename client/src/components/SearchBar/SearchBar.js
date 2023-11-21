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
const axios_1 = __importDefault(require("axios"));
require("./SearchBar.css");
const SearchBar = ({ setSkifields, token, userId, searchTerm }) => {
    const [search, setSearch] = (0, react_1.useState)("");
    //    const [favouriteSkifields, setFavouriteSkifields] = useState<string[]>([]);
    (0, react_1.useEffect)(() => {
        if (search !== searchTerm) {
            searchData(search);
        }
    }, [search]);
    (0, react_1.useEffect)(() => {
        if (searchTerm && searchTerm !== search) {
            setSearch(searchTerm);
            searchData(searchTerm);
        }
    }, [searchTerm]);
    console.log(searchTerm);
    const searchData = (query = search) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const searchRes = yield axios_1.default.get("http://arse-alpine-resort-search-engine-production.up.railway.app/skifields/search?q=" + query);
            const searchArray = searchRes.data.map((skifield) => ({
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
            setSkifields(searchArray);
        }
        catch (error) {
            console.error(error);
        }
    });
    const handleInput = (event) => {
        setSearch(event.currentTarget.value);
    };
    const getFavourites = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const favRes = yield axios_1.default.get(`http://arse-alpine-resort-search-engine-production.up.railway.app/users/favourites/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const favouritesArray = favRes.data.favourites;
            setSkifields(favouritesArray);
        }
        catch (error) {
            console.error(error);
        }
    });
    const getPlacesIveBeen = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const beenRes = yield axios_1.default.get(`http://arse-alpine-resort-search-engine-production.up.railway.app/users/beenhere/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const placesIveBeenArray = beenRes.data.beenhere;
            setSkifields(placesIveBeenArray);
        }
        catch (error) {
            console.error(error);
        }
    });
    return (<div className="searchBar-box">
            {token ? (<div className="searchBar-box">
                    <div className="input-wrapper">
                        <i id="fa-solid" className="fa-solid fa-magnifying-glass"></i>
                        <input id="search-input" onChange={handleInput} className="searchBar" placeholder="Search skifield..."/>
                    </div>
                    <div className="favourite-button">
                        <button className="f-button" onClick={getFavourites}>Favourite</button>
                    </div>
                    <div className="been-here-button">
                        <button className="bh-button" onClick={getPlacesIveBeen}>Places Ive Been</button>
                    </div>
                    
                </div>) : (<div className="searchBar-box">
                    <div className="input-wrapper">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input id="search-input" onChange={handleInput} className="searchBar" placeholder="Search skifield..."/>
                    </div>
                </div>)}
        </div>);
};
exports.default = SearchBar;
