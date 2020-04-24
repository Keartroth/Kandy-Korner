import React, { useContext } from "react"
import { CustomerContext } from "./CustomerProvider"
import Customer from "./Customer"
import "./Customer.css"
import { Table } from "reactstrap"
import { CustomerProductsContext } from "./CustomerProductsProvider"
import { ProductContext } from "../products/ProductsProvider"

export default () => {
    const { customers } = useContext(CustomerContext)
    const { customerProducts } = useContext(CustomerProductsContext)
    const { products } = useContext(ProductContext)

    const sortCustomersByPurchases = () => {
        let totalSpent = {};

        customers.forEach((value) => {
            if (!totalSpent[value.id]) {
                totalSpent[value.id] = 0
            } else {
                return false
            }
        });

        customerProducts.forEach((value) => {
            const product = products.find(p => p.id === value.productId)
            totalSpent[value.customerId] = totalSpent[value.customerId] + product.price
        });

        customers.map(c => {
            const purchaseHistory = customerProducts.filter(cp => cp.customerId === c.id)

            const sortPurchasesByFrequency = (currentCustomerPrchaseHistory) => {
                let productFrequency = {};

                currentCustomerPrchaseHistory.forEach((value) => {
                    if (!productFrequency[value.productId]) {
                        productFrequency[value.productId] = 1
                    } else {
                        productFrequency[value.productId] = productFrequency[value.productId] + 1
                    }
                });

                const uniqueProductIds = [...new Set(currentCustomerPrchaseHistory.map(ccph => ccph.productId))]

                const sortedUniques = uniqueProductIds.sort((a, b) => {
                    return productFrequency[b] - productFrequency[a]
                })

                const mostPurchasedProductId = sortedUniques[0]

                const mostPurchasedProduct = products.find(p => p.id === mostPurchasedProductId)

                return mostPurchasedProduct.name

            }

            const productName = sortPurchasesByFrequency(purchaseHistory)

            c.totalSpent = totalSpent[c.id]
            c.totalPurchases = purchaseHistory.length
            c.mostPurchasedProductName = productName
        })

        const sortedCustomers = customers.sort((a, b) => {
            return b.totalSpent - a.totalSpent
        })

        return sortedCustomers
    }

    const customersSortedByOrder = sortCustomersByPurchases()

    return (
        <article className="customers">
            <h1>Customer Order History</h1>
            <section className="customerList">
                <Table id="customer__PurchaseTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Most Purchased Product</th>
                            <th>Total Candies Purchased</th>
                            <th>Total Dollars Spent</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            customersSortedByOrder.map(c => {
                                return <Customer key={c.id}
                                    customer={c}
                                    productList={products} />
                            })
                        }
                    </tbody>
                </Table>
            </section>
        </article>
    )
}