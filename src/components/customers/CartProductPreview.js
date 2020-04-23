import React from "react"
import "./Customer.css"
import { Button } from "reactstrap"

export default (props) => {
    const removeItem = () => {
        const cart = sessionStorage.getItem("customer_cart")
        const cartArray = cart.split(",")
        const currentId = props.product.id
        const foundItem = cartArray.find(ca => parseInt(ca) === currentId)
        const index = cartArray.indexOf(foundItem)
        cartArray.splice(index, 1)
        
        sessionStorage.setItem("customer_cart", cartArray)
    }

    return (
        <>
            <div className="cart__preview">
                <h5 className="cart__productName">{props.product.name}</h5>
                <label className="cart__productPrice">Price:</label> {props.product.price}
                <Button onClick={removeItem}>Remove Item From Cart</Button>
            </div>
        </>
    )
}