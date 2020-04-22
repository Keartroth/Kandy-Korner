import React from "react"
import { Route } from "react-router-dom"
import { LocationProvider } from "./locations/LocationsProvider"
import LocationList from "./locations/LocationsList"
import EmployeesList from "./employees/EmployeesList"
import { ProductProvider } from "./products/ProductsProvider"
import ProductsList from "./products/ProductsList"
import { ProductTypesTypesProvider } from "./products/ProductTypesProvider"
import { EmployeeProvider } from "./employees/EmployeesProvider"

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
                <ProductTypesTypesProvider>
                    {/* Render the products list when http://localhost:3000/products */}
                    <Route exact path="/products" render={
                        props => <ProductsList {...props} />
                    } />
                </ProductTypesTypesProvider>
            </ProductProvider>
            
            <EmployeeProvider>
                <LocationProvider>
                    {/* Render the employees list when http://localhost:3000/employees */}
                    <Route exact path="/employees" render={
                        props => <EmployeesList {...props} />
                    } />
                </LocationProvider>
            </EmployeeProvider>
        </>
    )
}