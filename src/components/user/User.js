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

    const sortByFrequency = (array) => {
        let frequency = {};

        array.forEach((value) => frequency[value.productId] = 0);

        const uniques = array.filter((value) => {
            return ++frequency[value.productId] == 1
        })

        uniques.map(u => {
            u.quanitiy = frequency[u.productId]
        })

        const sortedUniques = uniques.sort((a, b) => {
            return b.quanitiy - a.quanitiy
        })
        return sortedUniques
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
                                let purchasedProduct = products.find(p => p.id === cps.productId)
                                return <UserOrderHistory
                                    key={cps.id}
                                    purchase={cps}
                                    product={purchasedProduct}
                                    {...props} />
                            })
                        }
                    </tbody>
                </Table>
            </section>
        </>
    )
}