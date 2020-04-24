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

    return (
        <article className="customers">
            <h1>Customer Order History</h1>
            <section className="customerList">
                <Table id="customerPurchaseTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Total Candy Purchases</th>
                            <th>Total Dollars Spent</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            customers.map(c => {
                                const purchaseHistory = customerProducts.filter(cp => cp.customerId === c.id)
                                return <Customer key={c.id}
                                    customer={c}
                                    purchases={purchaseHistory}
                                    productList={products} />
                            })
                        }
                    </tbody>
                </Table>
            </section>
        </article>
    )
}