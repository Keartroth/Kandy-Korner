import React, { useContext } from "react"
import { Table } from 'reactstrap'
import { CustomerContext } from "../customers/CustomerProvider"
import "./User.css"
import { CustomerProductsContext } from "../customers/CustomerProductsProvider"
import { ProductContext } from "../products/ProductsProvider"
import UserOrderHistory from "./UserOrderHistory"

export default (props) => {
    const { customers } = useContext(CustomerContext)
    const { products } = useContext(ProductContext)
    const { customerProducts } = useContext(CustomerProductsContext)
    const customerId = parseInt(localStorage.getItem("kandy_customer"))
    const customerInformation = customers.find(c => c.id === customerId)
    const purchaseHistory = customerProducts.filter(cp => cp.customerId === customerId)

    const sortByFrequency = (purchaseHistory) => {
        let frequency = {};

        purchaseHistory.forEach((value) => {
            if (!frequency[value.productId]) {
                frequency[value.productId] = 1
            } else {
                frequency[value.productId] = frequency[value.productId] + 1
            }
        });

        const uniqueProductIds = [...new Set(purchaseHistory.map(ph => ph.productId))]

        const uniqueProductPurchased = uniqueProductIds.map(up => {
            return products.find(p => p.id === up)
        })

        uniqueProductPurchased.map(u => {
            u.quanitiy = frequency[u.id]
        })

        const sortedUniqueProductPurchases = uniqueProductPurchased.sort((a, b) => {
            return b.quanitiy - a.quanitiy
        })
        return sortedUniqueProductPurchases
    }

    const customerPurchases = sortByFrequency(purchaseHistory)

    return (
        <>
            <section className="user__history">
                <h3 className="user__name">{customerInformation.name}'s Order History</h3>
                <Table id="user__PurchaseTable">
                    <thead>
                        <tr>
                            <th>Candy</th>
                            <th>Quantity Purchased</th>
                            <th>Price/unit</th>
                            <th>Total Spent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerPurchases.map(cps => {
                                return <UserOrderHistory
                                    key={cps.id}
                                    purchase={cps}
                                    {...props} />
                            })
                        }
                    </tbody>
                </Table>
            </section>
        </>
    )
}