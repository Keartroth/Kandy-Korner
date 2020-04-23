import React from "react"
import { Route, Redirect } from "react-router-dom"
import ApplicationViews from "./ApplicationViews"
import NavBar from "./nav/NavBar"
import Login from "./auth/Login"
import Register from "./auth/Register"
import EmployeeLogin from "./auth/EmployeeLogin"
import "./KandyKorner.css"

export default () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("kandy_customer") || localStorage.getItem("kandy_manager") || localStorage.getItem("kandy_employee")) {
                return (
                    <>
                        
                        <Route render={props => <NavBar {...props} />} />
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
        <Route path="/employeelogin" render={props => <EmployeeLogin {...props} />} />
    </>
)