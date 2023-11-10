import { useState, useMemo, Fragment } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import './Map.css';
import { ISkifield } from '../interface'

interface MapProps {
  skifields: ISkifield[]
  onMarkerClick: (skiFieldName: string) => void;
}

function Map({ skifields, onMarkerClick }: MapProps) {
  const [activeSkifield, setActiveSkifield] = useState<ISkifield | null>(null)
  const { isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY })


  const options = useMemo(() => ({ disableDefaultUI: true, clickableIcons: false }),[]);

  const handleMarkerClick = (skifield: ISkifield) => {
    handleActiveSkifield(skifield);
    onMarkerClick(skifield.name);
    console.log(name)
  }

  const handleActiveSkifield = (skifield: ISkifield) => {
    if (skifield === activeSkifield) {
      return;
    }
    setActiveSkifield(skifield);
  };


  const getIconSize = (skiLifts: number) => {
    let size = { width: 30, height: 30 };
    if (skiLifts > 30) {
      size = { width: 70, height: 70 };
    } else if (skiLifts > 20) {
      size = { width: 60, height: 60 };
    } else if (skiLifts > 10) {
      size = { width: 40, height: 40 };
    }
    return size;
  };

  console.log("Map Info" + skifields)

  return (
    <Fragment>
      <div className="container">
        <div>
          {isLoaded ? (
            <GoogleMap
            center={{ lat: 63.21742, lng: 14.932099 }}
            zoom={5}
//            onClick={() => setActiveSkifield(skifield)}
            mapContainerClassName="map-container"
            options={options}
            >
              {
                skifields.map(({ _id, name, skiLifts, position, image }) => (
                  <MarkerF 
                    key={_id}
                    position={position}
                    onClick={() => handleMarkerClick({
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
                    })}
                    icon={{
                      url: "/ski-icon.png", // Make sure you have the appropriate icon file
                      scaledSize: new google.maps.Size(getIconSize(skiLifts).width, getIconSize(skiLifts).height)
                    }}
                  >
                    {activeSkifield?._id === _id ? (
                      <InfoWindowF onCloseClick={() => setActiveSkifield(null)}>
                        <div className="popUpBox">
                          <div className="map-imgBox">
                            <img src={image} alt={name} />
                            <div className="map-name">
                              <h2>{name}</h2>
                            </div>
                          </div>
                        </div>
                      </InfoWindowF>
                    ) : null}
                  </MarkerF>
                ))
              }
            </GoogleMap>
          ) : null}
        </div>
      </div>
    </Fragment>
  );

}

export default Map;
