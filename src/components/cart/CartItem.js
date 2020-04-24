import React, { useContext } from "react"
import "../customers/Customer.css"
import { Button } from "reactstrap"
import { CartContext } from "./CartProductProvider"

export default (props) => {
    const { shoppingCart, removeItemFromCart } = useContext(CartContext)
    const customerId = parseInt(localStorage.getItem("kandy_customer"))
    const product = props.product
    const totalPrice = product.quanitiy * product.price

    const removeItem = () => {
        const currentCustomersCart = shoppingCart.filter(sc => sc.customerId === customerId)
        const foundProducts = currentCustomersCart.filter(cc => cc.productId === product.id)
        debugger
        foundProducts.forEach(fp => removeItemFromCart(fp.id))
    }

    return (
        <>
            <tr>
                <td>{product.name}</td>
                <td>{product.quanitiy}</td>
                <td>{product.price}</td>
                <td>{totalPrice.toFixed(2)}</td>
                <td><Button onClick={removeItem}>Remove Items From Cart</Button></td>
            </tr>
        </>
    )
}