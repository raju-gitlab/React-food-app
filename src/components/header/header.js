import '../../Assets/css/bootstrap.min.css'
import '../../Assets/css/owl.carousel.min.css'
import '../../Assets/css/style.css'
import '../../Assets/css/responsive.css'
import { Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const Header = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalShowRegister, setModalShowRegister] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(sessionStorage.getItem('isloggedin') === null || sessionStorage.getItem('isloggedin') === undefined);

    useEffect(() => {
        if (window.indexedDB) {
            const dbName = "TestfDB";
            const dbV = 1;
            const db = indexedDB.open(dbName, dbV);

            db.onupgradeneeded = function (event) {
                const dbObj = event.target.result;
                if (!dbObj.objectStoreNames.contains("users")) {
                    const objectStore = dbObj.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
                    objectStore.createIndex('email', 'email', { unique: true });
                }
            }

            db.onsuccess = function (event) {
                console.log("Database opened successfully.");
            }

            db.onerror = function (event) {
                console.log("Error");
            }
        }
    })

    const SwicthLogin = (status) => {
        setIsLoggedin(false);
        sessionStorage.removeItem('isloggedin');
        window.location.reload();
    }

    const Register = (event) => {
        const emailId = event.target.Email.value;
        const pass = event.target.Password.value;
        const dbName = "TestfDB";
        const dbVersion = 1;
        const request = indexedDB.open(dbName, dbVersion);

        const newUser = {
            email: emailId,
            password: pass
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction("users", 'readwrite');
            const store = transaction.objectStore('users');
            
            const request = store.add(newUser);
            
            request.onsuccess = function(event) {
                console.log("New user added:", event.target.result);
            };
            
            request.onerror = function(event) {
                if (event.target.error.name === 'ConstraintError') {
                    console.error('Email already exists!');
                } else {
                    console.error('Error adding user:', event.target.error);
                }
            };
        };

        request.onerror = function (event) {
            console.error("Database error:", event.target.error);
        };

    }

    const SubmitLogin = (event) => {
        const mailId = event.target.Email.value;
        const dbName = "TestfDB";
        const dbVersion = 1;
        const request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction("users", 'readonly');
            const store = transaction.objectStore('users');
            const index = store.index('email');
            const getRequest = index.get(mailId);
            getRequest.onsuccess = function () {
                if (getRequest.result) {
                    setIsLoggedin(true);
                    sessionStorage.setItem('isloggedin', true);
                    console.log(getRequest.result);
                    window.location.reload();
                } else {

                }
            };

            getRequest.onerror = function (event) {
                console.error("Error checking email:", event.target.error);
            };
        };

        request.onerror = function (event) {
            console.error("Database error:", event.target.error);
        };
    }

    const MyVerticallyCenteredModal = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={SubmitLogin}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                name="Email"
                                id="Email"
                                type="email"
                                className="form-control"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                name="Password"
                                id="Password"
                                type="password"
                                className="form-control"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }

    const MyVerticallyCenteredModalRegister = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Register
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={Register}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                name="Email"
                                id="Email"
                                type="email"
                                className="form-control"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                name="Password"
                                id="Password"
                                type="password"
                                className="form-control"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <>
            <header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="full">
                                <a className="logo" href="index.html">
                                    <img src="/React-food-app/Assets/images/logo.png" alt="#" />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="full">
                                <div className="right_header_info">
                                    <ul>
                                        <li className="dinone">
                                            Contact Us :{" "}
                                            <img
                                                style={{ marginRight: 15, marginLeft: 15 }}
                                                src="/React-food-app/Assets/images/phone_icon.png"
                                                alt="#"
                                            />
                                            <a href="#">987-654-3210</a>
                                        </li>
                                        <li className="dinone">
                                            <img
                                                style={{ marginRight: 15 }}
                                                src="/React-food-app/Assets/images/mail_icon.png"
                                                alt="#"
                                            />
                                            <a href="#">demo@gmail.com</a>
                                        </li>
                                        <li className="dinone">
                                            <img
                                                style={{
                                                    marginRight: 15,
                                                    height: 21,
                                                    position: "relative",
                                                    top: "-2px"
                                                }}
                                                src="/React-food-app/Assets/images/location_icon.png"
                                                alt="#"
                                            />
                                            <a href="#">104 New york , USA</a>
                                        </li>
                                        <li className={`button_user  ${(!isLoggedin ? "d-none" : "")}`}>
                                            <a className="button active" href="#" onClick={() => setModalShow(true)}>
                                                Login
                                            </a>
                                            <a className="button" href="#" onClick={() => setModalShowRegister(true)} >
                                                Register
                                            </a>
                                        </li>
                                        <li onClick={() => SwicthLogin(false)} className={`button_user ${(isLoggedin ? "d-none" : "")}`}>
                                            <a className="button active" href="#">
                                                LogOut
                                            </a>
                                        </li>
                                        <li>
                                            <img
                                                style={{ marginRight: 15 }}
                                                src="/React-food-app/Assets/images/search_icon.png"
                                                alt="#"
                                            />
                                        </li>
                                        <li>
                                            <button type="button" id="sidebarCollapse">
                                                <img src="/React-food-app/Assets/images/menu_icon.png" alt="#" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <MyVerticallyCenteredModalRegister show={modalShowRegister} onHide={() => setModalShowRegister(false)} />
        </>
    );
}

export default Header;