"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const api_1 = require("@react-google-maps/api");
require("./Map.css");
function Map({ skifields, onMarkerClick }) {
    const [activeSkifield, setActiveSkifield] = (0, react_1.useState)(null);
    const { isLoaded } = (0, api_1.useLoadScript)({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY });
    const options = (0, react_1.useMemo)(() => ({ disableDefaultUI: true, clickableIcons: false }), []);
    const handleMarkerClick = (skifield) => {
        handleActiveSkifield(skifield);
        onMarkerClick(skifield.name);
        console.log(name);
    };
    const handleActiveSkifield = (skifield) => {
        if (skifield === activeSkifield) {
            return;
        }
        setActiveSkifield(skifield);
    };
    const getIconSize = (skiLifts) => {
        let size = { width: 30, height: 30 };
        if (skiLifts > 30) {
            size = { width: 70, height: 70 };
        }
        else if (skiLifts > 20) {
            size = { width: 60, height: 60 };
        }
        else if (skiLifts > 10) {
            size = { width: 40, height: 40 };
        }
        return size;
    };
    console.log("Map Info" + skifields);
    return (<react_1.Fragment>
      <div className="container">
        <div>
          {isLoaded ? (<api_1.GoogleMap center={{ lat: 63.21742, lng: 14.932099 }} zoom={5} 
        //            onClick={() => setActiveSkifield(skifield)}
        mapContainerClassName="map-container" options={options}>
              {skifields.map(({ _id, name, skiLifts, position, image }) => (<api_1.MarkerF key={_id} position={position} onClick={() => handleMarkerClick({
                    _id,
                    name,
                    country: '',
                    url: '',
                    region: '',
                    lan: '',
                    elevation: '',
                    topToBottom: 0,
                    highest: 0,
                    lowest: 0,
                    totalSlopes: 0,
                    blueSlopes: 0,
                    redSlopes: 0,
                    blackSlopes: 0,
                    skiLifts: 0,
                    image: '',
                    trailMap: '',
                    description: '',
                    rating: 0,
                    adultSkiPass: 0,
                    youthSkiPass: 0,
                    generalSeason: '',
                    openingTimes: '',
                    nearbyTown1: '',
                    nearbyTown2: '',
                    lat: 0,
                    lng: 0,
                    position: {
                        lat: 0,
                        lng: 0
                    },
                    user_id: ''
                })} icon={{
                    url: "/ski-icon.png",
                    scaledSize: new google.maps.Size(getIconSize(skiLifts).width, getIconSize(skiLifts).height)
                }}>
                    {(activeSkifield === null || activeSkifield === void 0 ? void 0 : activeSkifield._id) === _id ? (<api_1.InfoWindowF onCloseClick={() => setActiveSkifield(null)}>
                        <div className="popUpBox">
                          <div className="map-imgBox">
                            <img src={image} alt={name}/>
                            <div className="map-name">
                              <h2>{name}</h2>
                            </div>
                          </div>
                        </div>
                      </api_1.InfoWindowF>) : null}
                  </api_1.MarkerF>))}
            </api_1.GoogleMap>) : null}
        </div>
      </div>
    </react_1.Fragment>);
}
exports.default = Map;
