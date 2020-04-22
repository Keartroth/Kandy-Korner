import React from "react"
import { Route } from "react-router-dom"
import { LocationProvider } from "./locations/LocationsProvider"
import LocationList from "./locations/LocationsList"

export default (props) => {
    return (
        <>
            <LocationProvider>
                {/* Render the location list when http://localhost:3000/ */}
                <Route exact path="/">
                    <LocationList />
                </Route>
            </LocationProvider>
        </>
    )
}