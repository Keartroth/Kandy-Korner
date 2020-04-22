import React from "react"
import { Route } from "react-router-dom"
import { LocationProvider } from "./locations/LocationsProvider"
import LocationList from "./locations/LocationsList"
import { ProductProvider } from "./products/ProductsProvider"
import ProductsList from "./products/ProductsList"

export default (props) => {
    return (
        <>
            <LocationProvider>
                {/* Render the location list when http://localhost:3000/ */}
                <Route exact path="/">
                    <LocationList />
                </Route>
            </LocationProvider>

            <ProductProvider>
                {/* Render the products list when http://localhost:3000/products */}
                <Route exact path="/products" render={
                    props => <ProductsList {...props} />
                } />
            </ProductProvider>
        </>
    )
}