import React, { useContext, useState, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import { Button } from 'reactstrap'
import "./Customer.css"
import { ProductContext } from "../products/ProductsProvider"
import CartProductPreview from "./CartProductPreview"
import { CustomerProductsContext } from "./CustomerProductsProvider"

export default props => {
    const { addCustomerProducts } = useContext(CustomerProductsContext)
    const { customers } = useContext(CustomerContext)
    const { products } = useContext(ProductContext)
    const customerId = parseInt(localStorage.getItem("kandy_customer"))
    const customerInformation = customers.find(c => c.id === customerId)
    const cart = sessionStorage.getItem("customer_cart")
    const arrayOfCustomersProducts = cart.split(",")

    const purchaseCart = () => {
        arrayOfCustomersProducts.map(cp => {
            let productId = parseInt(cp)
            let date = Date.now()
            let customerProductPurchase = {
                productId: productId,
                customerId: customerId,
                purchaseDate: date
            }
            addCustomerProducts(customerProductPurchase)
        })
        props.history.push("/")
        sessionStorage.setItem("customer_cart", "")
    }

    return (
        <>
            <article className="shoppingCart">
                <h1> {customerInformation.name}'s Shopping Cart</h1>
                <div>
                    <Button onClick={purchaseCart}>Purchase Items</Button>
                </div>
                <section className="pendingOrder">
                    {
                        arrayOfCustomersProducts.map(cp => {
                            let potentialPurchase = products.find(p => p.id === parseInt(cp))

                            return <CartProductPreview key={cp.id}
                                product={potentialPurchase}
                                {...props} />
                        })
                    }
                </section>
            </article>
        </>
    )
}