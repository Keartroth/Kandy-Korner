  
import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const CartContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const CartProvider = (props) => {
    const [shoppingCart, setCart] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const getCart = () => {
        return fetch("http://localhost:8088/shoppingCart")
            .then(res => res.json())
            .then(setCart)
    }

    const addItemToCart = cart => {
        return fetch("http://localhost:8088/shoppingCart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cart)
        })
            .then(getCart)
    }

    const removeItemFromCart = cartId => {
        return fetch(`http://localhost:8088/shoppingCart/${cartId}`, {
            method: "DELETE"
        })
            .then(getCart)
    }

    /*
        Load shoppingCart when the component is initialized. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getCart()
    }, [])

    useEffect(() => {
        console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [shoppingCart])

    return (
        <CartContext.Provider value={{
            shoppingCart, addItemToCart, 
            searchTerm, setSearchTerm,
            removeItemFromCart
        }}>
            {props.children}
        </CartContext.Provider>
    )
}