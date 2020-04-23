import React from "react"
import { Route } from "react-router-dom"
import { CartProvider } from "./cart/CartProductProvider"
import { CustomerProductsProvider } from "./customers/CustomerProductsProvider"
import { CustomerProvider } from "./customers/CustomerProvider"
import { EmployeeProvider } from "./employees/EmployeesProvider"
import { LocationProvider } from "./locations/LocationsProvider"
import { ProductProvider } from "./products/ProductsProvider"
import { ProductTypesTypesProvider } from "./products/ProductTypesProvider"
import Cart from "./cart/Cart"
import CustomerList from "./customers/CustomerList"
import EmployeesList from "./employees/EmployeesList"
import LocationList from "./locations/LocationsList"
import ProductsList from "./products/ProductsList"
import User from "./user/User"

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
                                        {/* Render the current user's information when http://localhost:3000/user */}
                                        <Route exact path="/user" render={
                                            props => <User {...props} />
                                        } />
                                        {/* Render the employees list when http://localhost:3000/employees */}
                                        <Route exact path="/employees" render={
                                            props => <EmployeesList {...props} />
                                        } />
                                        {/* Render the customers' information when http://localhost:3000/customers */}
                                        <Route exact path="/customers" render={
                                            props => <CustomerList {...props} />
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