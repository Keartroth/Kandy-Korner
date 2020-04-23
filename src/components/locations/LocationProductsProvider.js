import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const LocationProductsContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const LocationProductsProvider = (props) => {
    const [locationProducts, setLocationProducts] = useState([])

    const getLocationProducts = () => {
        return fetch("http://localhost:8088/locationProducts")
            .then(res => res.json())
            .then(setLocationProducts)
    }

    const addLocationProducts = locationProduct => {
        return fetch("http://localhost:8088/locationProducts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationProduct)
        })
            .then(getLocationProducts)
    }

    /*
        Load all location product relationships when the component is initialized.
        Ensure that an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getLocationProducts()
    }, [])

    useEffect(() => {
        console.log("****  LOCATIONPRODUCTS APPLICATION STATE CHANGED  ****")
    }, [locationProducts])

    return (
        <LocationProductsContext.Provider value={{
            locationProducts, addLocationProducts
        }}>
            {props.children}
        </LocationProductsContext.Provider>
    )
}