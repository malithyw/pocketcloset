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
import del from './icons/delete-02.png';
import closet from './closet.json';

const Closet = () =>  {
    const [clothes, setClothingItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("none");
    const [weatherInfo, setWeatherInfo] = useState([]);
    const [outfitItems, setOutfitItems] = useState([]);
    const [savedOutfits, setSavedOutfits] = useState([]);
    const [showSavedOutfits, setShowSavedOutfits] = useState(false);

    useEffect(() => {
        setClothingItems(closet.clothes.filter(item => item.tags.includes(searchTerm)));
        setWeatherInfo(closet.weather[1]);
    }, []);

    const buttonClick = (button) => {
        switch(button) {
            case "help":
                console.log("help button clicked");
                break;
            case "save":
                console.log("save button clicked");
                break;
            case "saved-outfits":
                setShowSavedOutfits(true);
                console.log("saved outfits buttons clicked");
                break;
            case "close-saved-outfits":
                setShowSavedOutfits(false);
                break;
            case "clothing-left":
                console.log("clothing left button clicked");
                break;
            case "clothing-right":
                console.log("clothing right button clicked");
                break;
            case "delete":
                console.log("delete button clicked");
                break;
            default:
                break;
        }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === "") {
            setSearchTerm("none");
            handleSearchSubmit();
        }
    };

    const handleSearchSubmit = () => {
        setClothingItems(closet.clothes.filter(item => item.tags.includes(searchTerm)));
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
        if (typeof outfitItems.find(item =>item.name === itemName) === "undefined" & 
            closet.clothes[0].name !== itemName) {
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

    const savedOutfitsGrid = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridAutoRows: "80px",
        gap: "20px",
        // Each grid item will have its own nested grid
        "& > *": {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridAutoRows: "30px",
          gap: "5px",
        },
      };


    const handleUndo = () => {
        setOutfitItems(outfitItems.slice(0,-1));
    };

    const handleReset = () => {
        setOutfitItems([]);
    };
    
    const handleSave = () => {
        if (outfitItems.length > 1 & savedOutfits.length < 9) {
            setSavedOutfits([...savedOutfits, outfitItems]);
            console.log("oufit saved");
            console.log(savedOutfits);
        }
    };


    
    return (
        <Container className="screen">
            <Row className="top-row">
                <Col>
                    <Button className="top-button" onClick={() => buttonClick("help")}>
                        <img src={bubbleChatQuestion} alt="help" />
                    </Button>
                    <Button className="top-button" onClick={() => buttonClick("calendar")}>
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
                    <Button className="corner-button bottom-0 end-0" onClick={handleSave}>
                        save
                    </Button>
                </div>
                </Col>
            </Row>
            <Row className="clothing-b box">
                {/*
                <Col className="col-2">
                    <Button className="clothing-a-left arrow" onClick={() => buttonClick("clothing-left")}>&lt;</Button>
                </Col>
                    */}
                <Col className="col-8 clothing-display">
                    {clothes.map(item => (
                        <div>
                            <img className="clothing-item" src={item.image} alt={item.name} onClick={() => logClothingItem(item.name)}/>
                        </div>
                    ))}
                </Col>
                {/*
                <Col className="col-2">
                    <Button className="clothing-a-right arrow" onClick={() => buttonClick("clothing-right")}>&gt;</Button>
                </Col>
                    */}
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
                        <div className="saved-outfits-b box" style={savedOutfitsGrid}>
                            {savedOutfits.map((outfit, index) => (
                                <div key={index} className="outfit">
                                    {outfit.map((item, index) => (
                                        <img key={index} className="outfit-item" src={item.image} alt={item.name} />
                                    ))}
                                </div>
                            ))}
                            <Button className="close-button corner-button top-0 end-0" onClick={() => buttonClick("close-saved-outfits")}>
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
