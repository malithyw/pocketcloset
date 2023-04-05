import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Closet.css';
import { useState, useEffect, useCallback } from "react";
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

const Closet = () =>  {
    const [allClothes, setAllClothes] = useState([]);
    const [clothes, setClothingItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [weatherInfo, setWeatherInfo] = useState([]);
    const [outfitItems, setOutfitItems] = useState([]);
    const [savedOutfits, setSavedOutfits] = useState([]);
    const [showSavedOutfits, setShowSavedOutfits] = useState(false);
    const [showCommonItems, setShowCommonItems] = useState(false);
    const [outfitKeys, setOutfitKeys] = useState([]);
    const [showHelpDoc, setShowHelpDoc] = useState(false);
    const user = auth.currentUser.uid;
    const navigate = useNavigate();

    useEffect(() => {
        const clothesRef = ref(db, `users/${user}/closet/clothes`);
        onValue(clothesRef, (snapshot) => {
            const clothesArray = [];
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                clothesArray.push(childData); 
            });
            setAllClothes(clothesArray);
        });
        setClothingItems(allClothes.filter(item => item.tags.includes(searchTerm)));
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
        setWeatherInfo(closet.weather[1]);
    }, []);

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

    const routeChange = () => {
        let path = "/calendar";
        navigate(path);
    };


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === "") {
            setSearchTerm("none");
            handleSearchSubmit();
        }
    };

    const handleSearchSubmit = () => {
        setClothingItems(allClothes.filter(item => item.tags.includes(searchTerm)));
    };
    
    const updateWeatherInfo = (direction) => {
        let index = weatherInfo.id;
        if (direction === "prev") {
            if (index > 0) {
                index--;
            }
        } else {
            if (index < closet.weather.length - 1) {
                index++;
            }
        }
        setWeatherInfo(closet.weather[index]);
    };

    const logClothingItem = (itemName) => {
        if (typeof outfitItems.find(item =>item.name === itemName) === "undefined") {
            if (outfitItems.length < 12) {
                setOutfitItems([...outfitItems, clothes.find(item =>item.name === itemName)]);
            }
        }
    };
    
    const outfitGrid = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridAutoRows: "40px",
        gap: "10px",
    };


    const handleUndo = () => {
        setOutfitItems(outfitItems.slice(0,-1));
    };

    const handleReset = () => {
        setOutfitItems([]);
    };
    
    const handleSaveOutfit = () => {
        if (outfitItems.length > 1 & savedOutfits.length < 9) {
            addOutfitToUserCloset();
        }
    };

    const addItemToUserCloset = (item) => {
        console.log(item.name);
        const dbRef = ref(db, `users/${user}/closet/clothes`);
        push(dbRef, item);
    }

    const addOutfitToUserCloset = () => {
        const dbRef = ref(db, `users/${user}/closet/outfits`);
        push(dbRef, outfitItems);
    }

    const deleteOutfit = (outfitId) => {
        const dbRef = ref(db, `users/${user}/closet/outfits/${outfitId}`);
        remove(dbRef);
        console.log(dbRef);
        
    }

    return (
        <Container className="screen">
            <Row className="top-row">
                <Col>
                    <Button className="top-button" onClick={() => buttonClick("help")}>
                        <img src={bubbleChatQuestion} alt="help" />
                    </Button>
                    <Button className="top-button" onClick={() => routeChange()}>
                        <img src={calendarplus} alt="cal" />
                    </Button>
                </Col> 
                <Col className="date-info">
                    <Button className="top-a arrow" onClick={() => updateWeatherInfo("prev")}>&lt;</Button>
                        <p>
                        {weatherInfo.day}<br />
                        {weatherInfo.date}<br />
                        {weatherInfo.temperature}°F
                        </p>
                        <img className="weather-icon" src={cloud} alt="weather-icon"/> 
                    <Button className="top-a arrow" onClick={() => updateWeatherInfo("next")}>&gt;</Button>
                </Col>
            </Row>
            <Row className="outfit-b box position-relative">
                <Col>
                <div style={outfitGrid}>
                    <Button className="corner-button top-0 start-0" onClick={handleUndo}>
                        <img src={undo} alt="u" ></img>  
                    </Button>
                    <Button className="corner-button top-0 end-0" onClick={handleReset}>
                        reset
                    </Button>
                    {outfitItems.map(item => (
                        <div>
                            <img className="outfit-item" src={item.image} alt={item.name} />
                        </div>
                    ))}
                    <Button className="corner-button bottom-0 end-0" onClick={handleSaveOutfit}>
                        save
                    </Button>
                </div>
                </Col>
            </Row>
            <Row className="clothing-b box">
                <Col className="clothing-display">
                    {clothes.map(item => (
                        <div>
                            <img className="clothing-item" src={item.image} alt={item.name} onClick={() => logClothingItem(item.name)}/>
                        </div>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col className="search-bar justify-content-center d-flex align-items-center">
                    <Button onClick={handleSearchSubmit}>
                        <img src={searchicon} alt="Search" />
                    </Button>
                    <input type="text" placeholder="Search" onChange={handleSearch}/>
                    <div>
                        <Button onClick={() => buttonClick("saved-outfits")}>saved</Button>
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
            <Row>
                <Button onClick={() => buttonClick("common-items")}>Common Items</Button>
                    {showCommonItems && 
                    <div className="saved-outfits-b box"> 
                        <p>Click the + button to add the item to your closet</p>
                        {closet.clothes.map(item => (
                            <div>
                                <img className="clothing-item" src={item.image} alt={item.name}/>
                                <Button className="add-button" onClick={() => addItemToUserCloset(item)}>+</Button>
                            </div>
                        ))}
                        <Button className="corner-button top-0 end-0" onClick={() => buttonClick("close-common-items")}>
                            close
                        </Button>
                    </div>}
            </Row>
        </Container>
    );
}

export default Closet;