import React, { useContext } from "react"
import "../customers/Customer.css"
import { Button } from "reactstrap"
import { CartContext } from "./CartProductProvider"

export default (props) => {
   const { shoppingCart, removeItemFromCart } = useContext(CartContext)
   const customerId = parseInt(localStorage.getItem("kandy_customer"))

    const removeItem = () => {
        const customerCart = shoppingCart.filter(sc => sc.customerId === customerId)
        const currentId = props.product.id
        const foundPotentialPurchase = customerCart.find(sc => sc.productId === currentId)
        removeItemFromCart(foundPotentialPurchase.id)
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