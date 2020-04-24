import React from "react"
import "./Customer.css"

export default (props) => {
    const customerInformation = props.customer

    return (
        <>
            <tr>
                <td>{customerInformation.id}</td>
                <td>{customerInformation.name}</td>
                <td>{customerInformation.mostPurchasedProductName}</td>
                <td>{customerInformation.totalPurchases}</td>
                <td>${customerInformation.totalSpent.toFixed(2)}</td>
            </tr>
        </>
    )
}