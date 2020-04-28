import React, { useState, useEffect } from "react"
import { CartProvider } from "./cart/CartProductProvider"
import { CustomerProductsProvider } from "./customers/CustomerProductsProvider"
import { CustomerProvider } from "./customers/CustomerProvider"
import { EmployeeProvider } from "./employees/EmployeesProvider"
import { LocationProductsProvider } from "./locations/LocationProductsProvider"
import { LocationProvider } from "./locations/LocationsProvider"
import { ProductProvider } from "./products/ProductsProvider"
import { ProductTypesProvider } from "./products/ProductTypesProvider"
import Cart from "./cart/Cart"
import CustomerList from "./customers/CustomerList"
import EmployeesList from "./employees/EmployeesList"
import LocationList from "./locations/LocationsList"
import ProductsList from "./products/ProductsList"
import User from "./user/User"

export default ({ toggle }) => {
    const [activeList, setActiveList] = useState("locations")
    const [components, setComponents] = useState()

    // HIGHER ORDER FUNCTION. IT RETURNS OTHER FUNCTION (i.e. COMPONENTS)
    const showLocations = () => (
        <LocationProductsProvider>
            <ProductProvider>
                <LocationProvider>
                    <LocationList />
                </LocationProvider>
            </ProductProvider>
        </LocationProductsProvider>
    )

    const showProducts = () => (
        <ProductTypesProvider>
            <ProductProvider>
                <ProductsList />
            </ProductProvider>
        </ProductTypesProvider>
    )

    const showCart = () => (
        <CustomerProvider>
            <ProductProvider>
                <CustomerProductsProvider>
                    <CartProvider>
                        <Cart />
                    </CartProvider>
                </CustomerProductsProvider>
            </ProductProvider>
        </CustomerProvider>
    )

    const showUser = () => (
        <ProductProvider>
            <CustomerProductsProvider>
                <CustomerProvider>
                    <User />
                </CustomerProvider>
            </CustomerProductsProvider>
        </ProductProvider>
    )


    const showEmployees = () => (
        <LocationProvider>
            <EmployeeProvider>
                <EmployeesList />
            </EmployeeProvider>
        </LocationProvider>
    )

    const showCustomers = () => (
        <ProductProvider>
            <CustomerProductsProvider>
                <CustomerProvider>
                    <CustomerList />
                </CustomerProvider>
            </CustomerProductsProvider>
        </ProductProvider>
    )


    /*
        This effect hook determines which list is shown
        based on the state of the `activeList` variable.
    */
    useEffect(() => {
        if (activeList === "cart") {
            setComponents(showCart)
        }
        else if (activeList === "customers") {
            setComponents(showCustomers)
        }
        else if (activeList === "employees") {
            setComponents(showEmployees)
        }
        else if (activeList === "locations") {
            setComponents(showLocations)
        }
        else if (activeList === "products") {
            setComponents(showProducts)
        }
        else if (activeList === "user") {
            setComponents(showUser)
        }
    }, [activeList])

    const logout = () => {
        localStorage.removeItem("kandy_employee")
        localStorage.removeItem("kandy_manager")
        localStorage.removeItem("kandy_customer")
        toggle()
    }

    return (
        <div className="mainContainer">
            <div className="links">
                <div className="fakeLink href" onClick={() => setActiveList("locations")}>Locations</div>
                {localStorage.getItem("kandy_customer") ? <div className="fakeLink href" onClick={() => setActiveList("products")}>Online Ordering</div> : ""}
                {localStorage.getItem("kandy_customer") ? <div className="fakeLink href" onClick={() => setActiveList("cart")}>Cart</div> : ""}
                {localStorage.getItem("kandy_customer") ? <div className="fakeLink href" onClick={() => setActiveList("user")}>User's Account</div> : ""}
                {localStorage.getItem("kandy_employee") || localStorage.getItem("kandy_manager") ? <div className="fakeLink href" onClick={() => setActiveList("employees")}>Employees</div> : ""}
                {localStorage.getItem("kandy_employee") || localStorage.getItem("kandy_manager") ? <div className="fakeLink href" onClick={() => setActiveList("customers")}>Customers</div> : ""}
                <div className="fakeLink href" onClick={() => logout()}>Logout</div>
            </div>
            <div className="listDisplay">
                {components}
            </div>
        </div >
    )
}