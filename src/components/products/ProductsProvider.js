  
import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const ProductContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const ProductProvider = (props) => {
    const [products, setProducts] = useState([])

    const getProducts = () => {
        return fetch("http://localhost:8088/products")
            .then(res => res.json())
            .then(setProducts)
    }

    const addProduct = product => {
        return fetch("http://localhost:8088/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
            .then(getProducts)
    }

    const sellProduct = productId => {
        return fetch(`http://localhost:8088/products/${productId}`, {
            method: "DELETE"
        })
            .then(getProducts)
    }

    const updateProduct = product => {
        return fetch(`http://localhost:8088/products/${product.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
            .then(getProducts)
    }

    /*
        Load all products when the component is initialized. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        console.log("****  PRODUCTS APPLICATION STATE CHANGED  ****")
    }, [products])

    return (
        <ProductContext.Provider value={{
            products, addProduct, 
            sellProduct, updateProduct
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}