import { FC, useEffect, useState, FormEvent } from "react";
import axios from "axios";
import "./SearchBar.css";
import { ISkifield } from "../interface"


type SearchProps = { 
    setSkifields: (newSkifields: ISkifield[]) => void;
    token: string;
    userId: string;
    searchTerm: string;
}

const SearchBar: FC<SearchProps> = ({ setSkifields, token, userId, searchTerm }) => {
    
    const [search, setSearch] = useState<string>("")
//    const [favouriteSkifields, setFavouriteSkifields] = useState<string[]>([]);

    useEffect(() => {
        if (search !== searchTerm) {
            searchData(search);
        }}, [search]);

    useEffect(() => {
        if (searchTerm && searchTerm !== search) {
            setSearch(searchTerm);
            searchData(searchTerm);
        }}, [searchTerm]);


        console.log(searchTerm)
    const searchData = async (query = search) => {
        try {
            const searchRes = await axios.get("http://localhost:3001/skifields/search?q=" + query);
            const searchArray = searchRes.data.map( (skifield: ISkifield) => ({
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
            setSkifields(searchArray)
        }

        catch (error) {
            console.error(error);
        }
    };

    const handleInput = (event: FormEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
    }

    const getFavourites = async () => {
        try {
            const favRes = await axios.get(`http://localhost:3001/users/favourites/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const favouritesArray = favRes.data.favourites;
            setSkifields(favouritesArray)
            
        }
        catch (error) {
            console.error(error);
        }
    }

    const getPlacesIveBeen = async () => {

        try {
            const beenRes = await axios.get(`http://localhost:3001/users/beenhere/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const placesIveBeenArray = beenRes.data.beenhere;
            setSkifields(placesIveBeenArray)
        }
        catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="searchBar-box">
            {token ? (
                <div className="searchBar-box">
                    <div className="input-wrapper">
                        <i id="fa-solid" className="fa-solid fa-magnifying-glass"></i>
                        <input id="search-input" onChange={handleInput} className="searchBar" placeholder="Search skifield..." />
                    </div>
                    <div className="favourite-button">
                        <button className="f-button" onClick={getFavourites}>Favourite</button>
                    </div>
                    <div className="been-here-button">
                        <button className="bh-button" onClick={getPlacesIveBeen}>Places Ive Been</button>
                    </div>
                    
                </div>
            ) : (
                <div className="searchBar-box">
                    <div className="input-wrapper">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input id="search-input" onChange={handleInput} className="searchBar" placeholder="Search skifield..." />
                    </div>
                </div>
            )}
        </div> 
    )
}

export default SearchBar

