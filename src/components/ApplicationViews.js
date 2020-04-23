import React from "react"
import { Route } from "react-router-dom"
import { LocationProvider } from "./locations/LocationsProvider"
import { ProductProvider } from "./products/ProductsProvider"
import { ProductTypesTypesProvider } from "./products/ProductTypesProvider"
import { EmployeeProvider } from "./employees/EmployeesProvider"
import { CustomerProvider } from "./customers/CustomerProvider"
import { CustomerProductsProvider } from "./customers/CustomerProductsProvider"
import { CartProvider } from "./cart/CartProductProvider"
import LocationList from "./locations/LocationsList"
import EmployeesList from "./employees/EmployeesList"
import ProductsList from "./products/ProductsList"
import Customer from "./customers/Customer"
import Cart from "./cart/Cart"

export default (props) => {
    return (
        <>
            <CustomerProvider>
                <EmployeeProvider>
                    <LocationProvider>
                        <ProductProvider>
                            <ProductTypesTypesProvider>
                                <CustomerProductsProvider>
                                    <CartProvider>
                                        {/* Render the location list when http://localhost:3000/ */}
                                        <Route exact path="/">
                                            <LocationList />
                                        </Route>
                                        {/* Render the products list when http://localhost:3000/products */}
                                        <Route exact path="/products" render={
                                            props => <ProductsList {...props} />
                                        } />
                                        {/* Render the current customer's shopping cart when http://localhost:3000/cart */}
                                        <Route exact path="/cart" render={
                                            props => <Cart {...props} />
                                        } />
                                        {/* Render the employees list when http://localhost:3000/employees */}
                                        <Route exact path="/employees" render={
                                            props => <EmployeesList {...props} />
                                        } />
                                        {/* Render the current customer's information when http://localhost:3000/customer */}
                                        <Route exact path="/customer" render={
                                            props => <Customer {...props} />
                                        } />
                                    </CartProvider>
                                </CustomerProductsProvider>
                            </ProductTypesTypesProvider>
                        </ProductProvider>
                    </LocationProvider>
                </EmployeeProvider>
            </CustomerProvider>
        </>
    )
}