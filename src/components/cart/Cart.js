import React, { useContext } from "react"
import { CustomerContext } from "../customers/CustomerProvider"
import { Button, Table } from 'reactstrap'
import "../customers/Customer.css"
import { ProductContext } from "../products/ProductsProvider"
import CartItem from "./CartItem"
import { CustomerProductsContext } from "../customers/CustomerProductsProvider"
import { CartContext } from "./CartProductProvider"
import "./Cart.css"

export default props => {
    const { addCustomerProducts } = useContext(CustomerProductsContext)
    const { customers } = useContext(CustomerContext)
    const { products } = useContext(ProductContext)
    const { shoppingCart, removeItemFromCart } = useContext(CartContext)
    const customerId = parseInt(localStorage.getItem("kandy_customer"))
    const customerInformation = customers.find(c => c.id === customerId) || {}
    const customerCart = shoppingCart.filter(sc => sc.customerId === customerId) || []

    const sortByFrequency = () => {
        let frequency = {};

        customerCart.forEach((cc) => {
            if (!frequency[cc.productId]) {
                frequency[cc.productId] = 1
            } else {
                frequency[cc.productId] = frequency[cc.productId] + 1
            }
        });

        const uniqueProductIds = [...new Set(customerCart.map(ph => ph.productId))]

        const uniqueProductPurchases = uniqueProductIds.map(up => {
            return products.find(p => p.id === up)
        })

        uniqueProductPurchases.map(u => {
            u.quanitiy = frequency[u.id]
        })

        const sortedUniqueProductPurchases = uniqueProductPurchases.sort((a, b) => {
            return b.quanitiy - a.quanitiy
        })
        return sortedUniqueProductPurchases
    }

    const filteredCustomerCart = sortByFrequency()

    const purchaseCart = () => {
        customerCart.map(i => {
            const productId = i.id
            delete i.id
            i.purchaseDate = Date.now()
            addCustomerProducts(i)
            removeItemFromCart(productId)
        })
        props.history.push("/")
    }

    let total = 0

    filteredCustomerCart.forEach(fci => {
        if (total === 0) {
            return total = fci.quanitiy * fci.price
        } else {
            return total = (fci.quanitiy * fci.price) + total
        }
    })

    return (
        <>
            <article className="shoppingCart">
                <h1> {customerInformation.name}'s Shopping Cart</h1>
                <div>
                    {filteredCustomerCart.length ? "" : <h4 className="shoppingCart--empty">Your Shopping Cart is Empty!</h4>}
                </div>
                <section className="pendingOrder">
                    {filteredCustomerCart.length ?
                        <Table id="user__CartTable">
                            <thead>
                                <tr>
                                    <th>Candy</th>
                                    <th>Quantity</th>
                                    <th>Price/unit</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredCustomerCart.map(i => {
                                        return <CartItem key={i.id}
                                            product={i}
                                            shoppingCart={shoppingCart}
                                            {...props} />
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>${total.toFixed(2)}</td>
                                    <td><Button onClick={purchaseCart}>Purchase Items</Button></td>
                                </tr>
                            </tfoot>
                        </Table>
                        : ""}
                </section>
            </article>
        </>
    )
}