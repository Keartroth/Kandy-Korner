import React from "react"
import "./User.css"

export default (props) => {
    const quantity = props.purchase.quanitiy
    const product = props.product
    const totalSpent = quantity * product.price

    return (
        <>
            <tr>
                <td>{product.name}</td>
                <td>{quantity}</td>
                <td>${product.price}</td>
                <td>${totalSpent.toFixed(2)}</td>
            </tr>
        </>
    )
}