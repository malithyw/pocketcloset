import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Closet.css';
import { useState, useEffect } from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';
import bubbleChatQuestion from './icons/bubble-chat-question.png';
import star from './icons/Vectorstar.png';
import calendarplus from './icons/calendar-plus-01.png';
import cloud from './icons/Vectorcloud.png';
import searchicon from './icons/search-02.png';
import undo from './icons/arrow-turn-backward-round1.png';
import redo from './icons/arrow-turn-backward-round.png';
import savecal from './icons/calendar-04.png';
import deleteicon from './icons/delete-02.png';
import closet from './closet.json';
import { db, auth } from '../Login';
import { ref, push, onValue, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import partlyCloudy from './backgrounds/partlyCloudy.jpg'
import clearSky from './backgrounds/clearSky.jpg';
import cloudy from './backgrounds/cloudy.jpg'
import rainy from './backgrounds/rainy.jpg'
import snowy from './backgrounds/snowy.jpg'
import thunderstorm from './backgrounds/thunderstorm.jpg'

const Closet = (props) =>  {
    const [allClothes, setAllClothes] = useState([]);
    const [clothes, setClothes] = useState([]);
    const [clothesKeys, setClothesKeys] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [outfitItems, setOutfitItems] = useState([]);
    const [savedOutfits, setSavedOutfits] = useState([]);
    const [showSavedOutfits, setShowSavedOutfits] = useState(false);
    const [outfitKeys, setOutfitKeys] = useState([]);
    const user = auth.currentUser.uid;
    const [weatherData, setWeatherData] = useState(null);
    const [day, setDay] = useState(null);
    const [dayOfWeek, setDayOfWeek] = useState(null);
    const [index, setIndex] = useState(0);
    const [maxTemperature, setMaxTemperature] = useState(0.0);
    const [minTemperature, setMinTemperature] = useState(0.0);
    const [backgroundImg, setBackgroundImg] = useState(clearSky);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [searchEmpty, setSearchEmpty] = useState(true);

    const openAlert = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
    }

    const closeAlert = () => {
        setShowAlert(false);
        setAlertMessage("");
    }

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?daily=weathercode&latitude=30.28&longitude=-97.75&limit=1&timezone=America/Chicago&daily=temperature_2m_max&daily=temperature_2m_min`);
            const data = await response.json();
            setWeatherData(data);
            parseWeatherData();
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const parseWeatherData = () => {
        const date = new Date(`${weatherData.daily.time[index]}T00:00:00-05:00`);
        const tempDayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const formattedDate = `${month} ${day}`;
        const maxTempC = weatherData.daily.temperature_2m_max[index];
        const minTempC = weatherData.daily.temperature_2m_min[index];
        setMaxTemperature(Math.round(maxTempC * 9 / 5 + 32));
        setMinTemperature(Math.round(minTempC * 9 / 5 + 32));
        setDay(formattedDate);
        setDayOfWeek(tempDayOfWeek);
        updateBackgroundImage();
    }
    
    const updateBackgroundImage = () => {
        const weathercode = weatherData.daily.weathercode[index];
        switch(weathercode) {
            case 1:
            case 2:
                setBackgroundImg(partlyCloudy);
                break;
            case 3:
                setBackgroundImg(cloudy);
                break;
            case 51: 
            case 53:
            case 55: 
            case 56: 
            case 57: 
            case 61: 
            case 63: 
            case 65: 
            case 66: 
            case 67: 
            case 80: 
            case 81: 
            case 82:
                setBackgroundImg(rainy);
                break;
            case 71: 
            case 73: 
            case 75: 
            case 77: 
            case 85: 
            case 86:
                setBackgroundImg(snowy);
                break;
            case 95: 
            case 96: 
            case 99:
                setBackgroundImg(thunderstorm);
                break;
            default:
                setBackgroundImg(clearSky);
                break;
        }
    }
    
    const changeDay = (direction) => {
        if (direction === "left") {
                setIndex(index - 1);
        } else {
                setIndex(index + 1);
        }
        parseWeatherData();
    };

    const loadClothes = () => {
        const clothesRef = ref(db, `users/${user}/closet/clothes`);
        onValue(clothesRef, (snapshot) => {
            const clothesArray = [];
            const keys = [];
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                clothesArray.push(childData);
                keys.push(childSnapshot.key); 
            });
            setAllClothes(clothesArray);
            setClothesKeys(keys);
        });
        setClothes(allClothes.filter(item => item.tags.includes(searchTerm)));
    }

    const loadOutfits = () => {
        const outfitsRef = ref(db, `users/${user}/closet/outfits`);
        onValue(outfitsRef, (snap) => {
            const outfitsArray = [];
            const keys = [];
            snap.forEach((childSnap) => {
                const childData = childSnap.val();
                outfitsArray.push(childData); 
                keys.push(childSnap.key);
            });
            setSavedOutfits(outfitsArray);
            setOutfitKeys(keys);
        });
    }

    useEffect(() => {
        loadClothes();
        loadOutfits();
        fetchWeatherData();
        handleSearchSubmit();
    }, [index, day, searchTerm]);

    const buttonClick = (button) => {
        switch(button) {
            case "saved-outfits":
                setShowSavedOutfits(true);
                console.log("saved outfits buttons clicked");
                break;
            case "close-saved-outfits":
                setShowSavedOutfits(false);
                break;
            case "help":
                setShowHelpDoc(true);
                console.log("help button clicked");
                break;
            case "common-items":
                setShowCommonItems(true);
                break;
            case "close-common-items":
                setShowCommonItems(false);
                break;
            default:
                break;
        }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setSearchEmpty(false);
        if (event.target.value === "") {
            setSearchEmpty(true);
            setSearchTerm("none");
            handleSearchSubmit();
        }
    };

    const handleSearchSubmit = () => {
        setClothes(allClothes.filter(item => item.tags.includes(searchTerm)));
    };

    const logClothingItem = (itemName) => {
        if (typeof outfitItems.find(item =>item.name === itemName) === "undefined") {
            setOutfitItems([...outfitItems, clothes.find(item =>item.name === itemName)]);            
        }
    };


    const handleUndo = () => {
        setOutfitItems(outfitItems.slice(0,-1));
    };

    const handleReset = () => {
        setOutfitItems([]);
    };
    
    const handleSaveOutfit = () => {
        if (outfitItems.length > 1 & savedOutfits.length < 9 && !showAlert) {
            addOutfitToUserCloset();
            openAlert("Your outfit has been saved");
        }
    };

    const addOutfitToUserCloset = () => {
        const dbRef = ref(db, `users/${user}/closet/outfits`);
        push(dbRef, outfitItems);
    }

    const deleteOutfit = (outfitId) => {
        const dbRef = ref(db, `users/${user}/closet/outfits/${outfitId}`);
        remove(dbRef);
        console.log(dbRef);
        
    }

    const deleteItem = (name, index) => {
        console.log(clothesKeys[index]);
        const dbRef = ref(db, `users/${user}/closet/clothes/${clothesKeys[index]}`);
        remove(dbRef);
        loadClothes();
        handleSearchSubmit();
    }

    
    return (
        <Container style={{ backgroundImage: `url(${props.background})`, width: '400px', height: '990px' }}>
            <Row className="top-row">
                <Col>
                     <Button className="top-button" onClick={() => buttonClick("help")}>
                        <img src={bubbleChatQuestion} alt="help" />
                    </Button>
                </Col>
                <Col>
                    <div className="weather-info">
                        {index > 0 &&
                        <Button className="top-a arrow" onClick={() => changeDay("left")}>&lt;</Button>
                        }
                        <p>
                            {dayOfWeek}, {day}<br />
                            Max: {maxTemperature}°F<br/>
                            Low: {minTemperature}°F
                        </p>
                        {index < 6 &&
                        <Button className="top-a arrow" onClick={() => changeDay("right")}>&gt;</Button>
                        }
                    </div>
                </Col>
            </Row>
            <Row className="outfit-b box position-relative">
                <Col>
                <div>
                    <Button className="corner-button top-0 start-0" onClick={handleUndo}>
                        <img src={undo} alt="u" ></img>  
                    </Button>
                    <Button className="corner-button top-0 end-0" onClick={handleReset}>
                        reset
                    </Button>
                    <div className="clothing-display">
                        {outfitItems.map(item => (
                            <div>
                                <img className="clothing-item" src={item.image} alt={item.name} />
                            </div>
                        ))}
                    </div>
                    {showAlert &&
                    <div className="alert-b box">
                        <Button className="corner-button top-0 end-0" onClick={() => closeAlert()}>
                            x
                        </Button>
                        {alertMessage}
                    </div>
                    }
                    <Button className="corner-button bottom-0 end-0" onClick={handleSaveOutfit}>
                        save
                    </Button>
                </div>
                </Col>
            </Row>
            <Row className="clothing-b box">
                <Col>
                    <div key={index} className = "clothing-display">
                        {!searchEmpty && clothes.map((item, index) => (
                            <div>
                                <img className="clothing-item" src={item.image} alt={item.name} onClick={() => logClothingItem(item.name)}/>
                                <Button onClick={() => deleteItem(item.name, index)}>
                                    <img src={deleteicon} alt="delete"/>
                                </Button>
                            </div>
                        ))
                        
                        }
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="search-bar justify-content-center d-flex align-items-center">
                    <Button onClick={handleSearchSubmit}>
                        <img src={searchicon} alt="Search" />
                    </Button>
                    <input className="searchBar" type="text" placeholder="Search for a clothing tag" onChange={handleSearch}/>
                    <div>
                        <Button className="add-button" onClick={() => buttonClick("saved-outfits")}>Outfits</Button>
                            {showSavedOutfits && 
                            <div className="saved-outfits-b box">
                                    {savedOutfits.map((outfit, index) => (
                                        <div key={index} className="outfit">
                                            {outfit.map((item, index) => (
                                                <img key={index} className="outfit-item" src={item.image} alt={item.name} />
                                            ))}
                                            <Button className="corner-button" onClick={() => deleteOutfit(outfitKeys[index])}>
                                                <img src={deleteicon} alt="delete"/>
                                            </Button>
                                        </div>
                                    ))}
                                <Button className="corner-button top-0 end-0" onClick={() => buttonClick("close-saved-outfits")}>
                                    close
                                </Button>
                            </div>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Closet;