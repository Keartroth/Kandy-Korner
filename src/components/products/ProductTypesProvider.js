  
import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const ProductTypesContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const ProductTypesProvider = (props) => {
    const [productTypes, setProductTypes] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const getProductTypes = () => {
        return fetch("http://localhost:8088/productTypes")
            .then(res => res.json())
            .then(setProductTypes)
    }

    const addProductTypes = productTypes => {
        return fetch("http://localhost:8088/productTypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productTypes)
        })
            .then(getProductTypes)
    }

    const updateProductTypes = productTypes => {
        return fetch(`http://localhost:8088/productTypes/${productTypes.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productTypes)
        })
            .then(getProductTypes)
    }

    /*
        Load all productTypes when the component is initialized. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getProductTypes()
    }, [])

    useEffect(() => {
        console.log("****  PRODUCTTYPES APPLICATION STATE CHANGED  ****")
    }, [productTypes])

    return (
        <ProductTypesContext.Provider value={{
            productTypes, addProductTypes, 
            searchTerm, setSearchTerm,
            updateProductTypes
        }}>
            {props.children}
        </ProductTypesContext.Provider>
    )
}