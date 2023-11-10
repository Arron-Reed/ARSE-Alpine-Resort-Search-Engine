import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Map from "../Map/Map";
import "./Home.css";
import SearchBar from "../SearchBar/SearchBar";
import { ISkifield } from "../interface.ts";
import { toast } from 'react-toastify';

type SkifieldProps = {
    token: string,
    userId: string,
    setFavourites: React.Dispatch<React.SetStateAction<string[]>>,
    setBeenHere: React.Dispatch<React.SetStateAction<string[]>>,
    favourites: string[],
    beenHere: string[],

}

interface Favourite {
    _id: string;
}

interface BeenHere {
    _id: string;
}

const Home: FC<SkifieldProps> = ({ token, userId, setFavourites, setBeenHere, favourites, beenHere, }) => { 
    const [skifields, setSkifields] = useState<ISkifield[]>([]); 
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
   

    useEffect(() => {
        const fetchData = async () => {
            await getAllSkifields();
            if (token) {
                await getUserLists();
            }
        };
        fetchData();
    },[token])
    
    const getAllSkifields = async () => {
        const res = await axios.get("http://localhost:3001/skifields"); 
        const skifieldsArray = res.data.map( (skifield: ISkifield) => ({
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
            })
        );
        setSkifields(skifieldsArray); 
    };

    const getUserLists = async () => {
        try {
            const headers = {Authorization: `Bearer ${token}`};
            const favRes = await axios.get(`http://localhost:3001/users/favourites/${userId}`, { headers });
            const favouriteList = favRes.data.favourites;
            const favIds = favouriteList.map((item: Favourite) => item._id)
            setFavourites(favIds);

            const beenHereRes = await axios.get(`http://localhost:3001/users/beenHere/${userId}`, { headers });
            const BHlist = beenHereRes.data.beenhere;
            const beenHereIds = BHlist.map((item: BeenHere) => item._id)
            setBeenHere(beenHereIds);
        } catch (error) {
            console.error("Error fetching user lists: ", error);
            setFavourites([]);
            setBeenHere([]);
        }
    };
    const isFavourite = (skifieldId: string) => favourites.includes(skifieldId);
    const hasBeenHere = (skifieldId: string) => beenHere.includes(skifieldId);

    
    const handleFavourites = async (skifieldId: string) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
              };

            if (!isFavourite(skifieldId)) {
                setFavourites([...favourites, skifieldId]);
                toast.success('Successfully added to your Favourite List!');
            }

            await axios.post("http://localhost:3001/users/savefavourite",
                { userId, skifieldId },
                { headers }
            );
        }  
        catch (error) {
            console.error("Error saving favorite: ", error);
          }
    }


    const handleBeenHere = async (skifieldId: string) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
              };

              if (!hasBeenHere(skifieldId)) {
                setBeenHere([...beenHere, skifieldId]);
                toast.success('Successfully added to your Been Here List!');
            }

            await axios.post("http://localhost:3001/users/beenhere",
                { userId, skifieldId },
                { headers }
            );
        }  
        catch (error) {
            console.error("Error saving been here: ", error);
            setBeenHere(beenHere.filter(id => id !== skifieldId));
            toast.error('Error saving to your Been Here List.');
        }
    }


    const handleMapMarkerClick = (skiFieldName: string) => {
        setSearchTerm(skiFieldName);
      };


    return(
        <div className="home">
            <div className="navbar-space"></div>
            <div className="home-box">
                <div className="home-left">
                    <div className="search-bar">
                        { <SearchBar setSkifields={setSkifields} token={token} userId={userId} searchTerm={searchTerm} /> }
                    </div>
                        {skifields.length > 0 && (
                            <div className="">
                                {skifields.map((skifield: ISkifield) => (
                                    <div className="box" key={skifield._id}>
                                        <div className="body-box">
                                            <div className="image-box">
                                                <img src={skifield.image} alt={skifield.name} />
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
                                                            <i className="fa-solid fa-cable-car" title="Ski lifts" />
                                                            <p>{skifield.skiLifts} ski lifts</p>
                                                        </div>
                                                        <div className="price"><i className="fa-solid fa-coins" title="Adult pass"></i>{skifield.adultSkiPass}kr (SEK)</div>
                                                    </div>
                                                    <div className="middle-content-right">
                                                        <div className="slope-diagram">
                                                            <i className="fa-solid fa-person-skiing" title="Distance" />
                                                            <div className="total-slopes"><p>{skifield.totalSlopes}km</p></div>
                                                            <div className="blue"><p>{skifield.blueSlopes}km</p></div>
                                                            <div className="red"><p>{skifield.redSlopes}km</p></div>
                                                            <div className="black"><p>{skifield.blackSlopes}km</p></div>
                                                        </div>
                                                        <div className="elevation"><i className="fa-solid fa-arrows-up-down" title="Altitude" />{skifield.elevation}</div>
                                                    </div>
                                                </div>
                                                <div className="bottom-content">
                                                    {token ? ( 
                                                        <div className="button-box">
                                                            <div className="bottom-content-left">
                                                                <button className={isFavourite(skifield._id) ? "grey-button" : "favourite"} onClick={ () => handleFavourites(skifield._id) }>Favourite</button>
                                                                <button className={hasBeenHere(skifield._id) ? "grey-button" : "been-here"} onClick={ () => handleBeenHere(skifield._id) } >Been Here</button>
                                                            </div>
                                                            <div className="bottom-content-right">
                                                                <button className="more-info" onClick={()=> { navigate(`/skifield/${skifield._id}`)}}>More Info</button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="whole-button-box">
                                                            <button className="whole-more-info" onClick={()=> { navigate(`/skifield/${skifield._id}`)}}>More Info</button>
                                                        </div>
                                                    )}
                                                </div> 

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    
                </div>

                <div className="home-right">
                    <Map skifields={skifields} onMarkerClick={handleMapMarkerClick} />
                </div>
            </div>
            
            
        </div>
    )
}

export default Home;