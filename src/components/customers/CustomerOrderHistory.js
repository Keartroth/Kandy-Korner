import React from "react"
import "./Customer.css"

export default (props) => {
    return (
        <>
            <div className="product">
                <div className="product__name">{props.product.name}</div>
                <div className="product__price">{props.product.price}</div>
            </div>
        </>
    )
}