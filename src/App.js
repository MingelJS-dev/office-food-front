import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useSwipeable } from "react-swipeable";
import Container from "react-bootstrap/Container";
import useWindowSize from "./app/shared/WindowSize.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import history from "./history.js";

import LoginPage from "./app/login/LoginPage.js";
import MainPage from './app/main_page/MainPage.js'
// import Header from './app/layout/Header.js'
import Sidebar from './app/layout/Sidebar.js'
import ProformaPage from './app/proforma/ProformaPage.js'
import Notification from "./app/shared/Notifications.js";


import UsersPage from "./app/users/UserPage.js"
import CategoriesPage from "./app/categories/CategoriesPage.js"
import * as Permission from "./app/shared/Permission.js"

export const CurrentUserContext = React.createContext({})
// function SidebarWrapper({ isOpen, setOpen }) {
//   const winSize = useWindowSize()
//   const [isMobile, setIsMobile] = useState(winSize.width <= 768)

//   useEffect(() => {
//     setIsMobile(winSize.width <= 768)
//     setOpen(winSize.width >= 768)
//   }, [winSize])


//   return (
//     <Menu
//       className="col-8 col-md-3 col-lg-2 d-md-block p-0 sidebar"
//       isOpen={isOpen}
//       disableCloseOnEsc
//       onClose={() => setOpen(false)}
//       noTransition={!isMobile}
//       noOverlay={true}
//     >
//       <nav>
//         <Sidebar onChange={() => {
//           if (isMobile) {
//             setOpen(false)
//           }
//         }} />
//       </nav>
//     </Menu>
//   )
// }

function App() {
  const [isOpen, setOpen] = useState(false)
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const currentUser = useSelector(state => state.auth.currentUser)
  useEffect(() => {
    if (isLoggedIn) {
      // dispatch(fetchCurrentUser());
    }
  }, [isLoggedIn, dispatch, currentUser]);

  const showSidebar = () => {
    setOpen(true)
  }
  if (isLoggedIn) {
    return (

      <Router history={history}>
        <Notification></Notification>
        <nav className="navbar navbar-expand-lg fixed-top navbar-expand-md navOffice ">
          <button onClick={() => showSidebar()} className="btn btn-create-user" type="button">
            <FontAwesomeIcon className='fa-2x' icon={faBars} />
          </button>
          <div className="mx-auto order-0">
            <a className="navbar-brand mx-auto">  Back Office Food Regional</a>
          </div>
        </nav>
        <CurrentUserContext.Provider value={currentUser}>
          <Container fluid={true} >
            <div className='row p-0'>

              <Sidebar isOpen={isOpen} setOpen={setOpen} pageWrapId={"page-wrap"} outerContainerId={"App"} />

              <Col id="page-wrap" className="containerPage" style={{ height: '100vh' }}>
                <Switch>
                  <Route path="/" exact>
                    <Redirect to="/list" />
                  </Route>

                  <Route path="/list" exact component={MainPage} />
                  {
                    Permission.isAdmin(currentUser.role)
                    &&
                    <Switch>
                      <Route path="/proforma" exact component={ProformaPage} />
                      <Route path="/users" exact component={UsersPage} />
                      <Route path="/categories" exact component={CategoriesPage} />
                      <Route path="*">
                        <Redirect to="/" />
                      </Route>
                    </Switch>
                  }

                  {
                    Permission.isRegionalBuyer(currentUser.role)
                    &&
                    <Switch>
                      <Route path="/proforma" exact component={ProformaPage} />
                      <Route path="*">
                        <Redirect to="/" />
                      </Route>
                    </Switch>
                  }

                  {
                    Permission.isPlanner(currentUser.role)
                    &&
                    <Switch>
                      <Route path="/proforma" exact component={ProformaPage} />
                      <Route path="/categories" exact component={CategoriesPage} />
                      <Route path="*">
                        <Redirect to="/" />
                      </Route>
                    </Switch>
                  }

                  <Route path="*">
                    <Redirect to="/" />
                  </Route>
                </Switch>
              </Col>
            </div>
          </Container>
        </CurrentUserContext.Provider>

      </Router>
    );
  } else {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={LoginPage} />
          {/* <Route path="/users/new" exact component={NewUserPage} /> */}
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

// function App() {
//   const [isOpen, setOpen] = useState(window.innerWidth >= 768)

//   const handlers = useSwipeable({
//     delta: 150,
//     trackMouse: true,
//     onSwipedRight: () => setOpen(true),
//   });

//   return (
//     <Router history={history}>
//       <Header />

//       <Container fluid={true} className='containerPage'>
//         <div className="row m-0">
//           <SidebarWrapper isOpen={isOpen} setOpen={setOpen} />

//           <Col {...handlers} className="col-md-9 ml-sm-auto col-lg-10 px-md-2" style={{ height: '100vh' }}>
//             <MainPage />
//           </Col>
//         </div>
//       </Container>
//     </Router>
//   );
// }

