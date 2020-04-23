  
import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const CustomerProductsContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const CustomerProductsProvider = (props) => {
    const [customerProducts, setCustomerProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const getCustomerProducts = () => {
        return fetch("http://localhost:8088/customerProducts")
            .then(res => res.json())
            .then(setCustomerProducts)
    }

    const addCustomerProducts = customerProducts => {
        return fetch("http://localhost:8088/customerProducts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerProducts)
        })
            .then(getCustomerProducts)
    }

    /*
        Load all customerProducts when the component is initialized. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getCustomerProducts()
    }, [])

    useEffect(() => {
        console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [customerProducts])

    return (
        <CustomerProductsContext.Provider value={{
            customerProducts, addCustomerProducts, 
            searchTerm, setSearchTerm
        }}>
            {props.children}
        </CustomerProductsContext.Provider>
    )
}