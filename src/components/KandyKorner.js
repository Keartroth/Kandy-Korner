import React from "react"
import { Route, Redirect } from "react-router-dom"
import ApplicationViews from "./ApplicationViews"
import NavBar from "./nav/NavBar"
import "./KandyKorner.css"

export default () => (
    <>
        <Route render={props => <NavBar {...props} />} />
        <Route render={props => <ApplicationViews {...props} />} />
    </>
)