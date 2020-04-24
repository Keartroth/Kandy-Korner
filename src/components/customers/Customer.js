import React from "react"
import "./Customer.css"

export default (props) => {
    const customerInformation = props.customer
    const purchaseHistory = props.purchases
    const products = props.productList

    let totalSpent = 0
    purchaseHistory.map(ph => {
        let pro = products.find(p => p.id === ph.productId)
        totalSpent = totalSpent + pro.price
    })

    return (
        <>
            <tr>
                <td>{customerInformation.id}</td>
                <td>{customerInformation.name}</td>
                <td>{purchaseHistory.length}</td>
                <td>${totalSpent.toFixed(2)}</td>
            </tr>
        </>
    )
}