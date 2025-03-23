import React, { useEffect, useState } from "react";
import '../../Assets/css/autosuggest.css';
import Carosoul from "./Carosoul";
import DishCarosoul from './DishCarosoul';
import {Link} from 'react-router-dom';
function Home() {
    const [restaurants, setRestaurants] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [location, setLocation] = useState("");

    useEffect(() => {
        if (location === undefined || location === '') {
            DefaultIPAddress();
            //navigator.geolocation.getCurrentPosition(success, () => { console.log("location rejected"); }, options);
        }
        else {
            localStorage.setItem("latlon", location);
        }
    });
    useEffect(() => {
        if (location.length != 0) {
            const ltln = location.split(',');
            GetRestraunnts(ltln[0], ltln[1]);
        }
    }, [location]);

    const DefaultIPAddress = () => {
        fetch('http://ip-api.com/json')
            .then((response) => response.json())
            .then((data) => {
                setLocation(`${data.lat},${data.lon}`)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    }

    const GetRestraunnts = (latitude, longitude) => {
        fetch(`https://www.swiggy.com/dapi/homepagev2/getCards?lat=${latitude}&lng=${longitude}&pageLimit=15`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurants(data.data.success.cards.filter(dt => dt.card.card["@type"].toString().includes('StackedWidget'))[0].card.card.info);
                setDishes(data.data.success.cards.filter(dt => dt.card.card["@type"].toString().includes('GridWidget'))[0].card.card.gridElements.infoWithStyle.info);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    const success = (pos) => {
        const crd = pos.coords;
        setLocation(`${crd.latitude},${crd.longitude}`)
    }

    return (
        <React.Fragment>
            <div className="slider_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="full">
                                <div
                                    id="main_slider"
                                    className="carousel vert slide"
                                    data-ride="carousel"
                                    data-interval={5000}
                                >
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="slider_cont">
                                                        <h3>
                                                            Discover Restaurants
                                                            <br />
                                                            That deliver near You
                                                        </h3>
                                                        <p>
                                                            It is a long established fact that a reader will be
                                                            distracted by the readable content of a page when
                                                            looking at its layout.
                                                        </p>
                                                        <Link className="main_bt_border" to="/resturants">
                                                            Order Now
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="col-md-7">
                                                    <div className="slider_image full text_align_center">
                                                        <img
                                                            className="img-responsive"
                                                            src="/Assets/images/burger_slide.png"
                                                            alt="#"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="carousel-item">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="slider_cont">
                                                        <h3>
                                                            Discover Restaurants
                                                            <br />
                                                            That deliver near You
                                                        </h3>
                                                        <p>
                                                            It is a long established fact that a reader will be
                                                            distracted by the readable content of a page when
                                                            looking at its layout.
                                                        </p>
                                                        <a className="main_bt_border" href="#">
                                                            Order Now
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-md-7 full text_align_center">
                                                    <div className="slider_image">
                                                        <img
                                                            className="img-responsive"
                                                            src="/Assets/images/burger_slide.png"
                                                            alt="#"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        className="carousel-control-prev"
                                        href="#main_slider"
                                        role="button"
                                        data-slide="prev"
                                    >
                                        <i className="fa fa-angle-up" />
                                    </a>
                                    <a
                                        className="carousel-control-next"
                                        href="#main_slider"
                                        role="button"
                                        data-slide="next"
                                    >
                                        <i className="fa fa-angle-down" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DishCarosoul data={dishes} />
            <div className="bg_bg">
                <div className="about">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="title">
                                    <i>
                                        <img src="/Assets/images/title.png" alt="#" />
                                    </i>
                                    <h2>Order food & groceries. Discover best restaurants.</h2>
                                    {/* <div className="row gap-3">
                                        <input className="form-control border border-secondary col-4 rounded" placeholder="Enter your delivery location."/>
                                        <input className="form-control border border-secondary col-7 rounded disabled readonly" placeholder="Search for restraunt items and more."/>
                                    </div> */}
                                    <section className="wrapper-input">
                                        <div className="react-autosuggest__container">
                                            <input
                                                type="text"
                                                defaultValue=""
                                                autoComplete="off"
                                                role="combobox"
                                                aria-autocomplete="list"
                                                aria-owns="react-autowhatever-1"
                                                aria-expanded="false"
                                                aria-haspopup="false"
                                                className="react-autosuggest__input"
                                                placeholder="Type 'c'"
                                            />
                                            <div
                                                id="react-autowhatever-1"
                                                className="react-autosuggest__suggestions-container"
                                            />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Carosoul data={restaurants} />
            <div className="bg-light d-flex align-items-center justify-content-center min-vh-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-left">
                            <h1 className="font-weight-bold mb-4">
                                DEVICE MOCKUP
                                <br />
                                DOWNLOAD THIS APP
                            </h1>
                            <p className="text-muted mb-4">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                                ullamcorper suscipit lobortis
                            </p>
                            <div className="d-flex justify-content-center justify-content-md-start mb-4">
                                <div>
                                    <div style={{marginBottom:"5px"}} className="align-items-center bg-dark text-white px-3 py-2 rounded mr-2">
                                        <i className="fas fa-download mr-2"> </i>
                                        <span> available at </span>
                                        <span className="font-weight-bold ml-2"> Play Store </span>
                                    </div>
                                    <div className="align-items-center bg-success text-white px-3 py-2 rounded mr-2">
                                        <i className="fas fa-download mr-2"> </i>
                                        <span> available at </span>
                                        <span className="font-weight-bold ml-2"> Apple Store </span>
                                    </div>  
                                </div>

                                <img
                                    style={{ height: "90px", width: "90px" }}
                                    alt="QR code for app download"
                                    className="mx-auto mx-md-0"
                                    src="/Assets/images/qr.png"
                                />
                            </div>

                        </div>
                        <div className="col-md-6 device-mockup mt-5 mt-md-0">
                            <div className="gradient-circle" />
                            <div className="d-flex justify-content-center">
                                <img
                                    alt="Device mockup front view"
                                    className="img-fluid rounded-lg mr-3"
                                    src="/Assets/images/downloadapp.png"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}

export default Home;