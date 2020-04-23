import React, { useContext, useState, useEffect } from "react"
import { CustomerContext } from "../customers/CustomerProvider"
import { Button } from 'reactstrap'
import "../customers/Customer.css"
import { ProductContext } from "../products/ProductsProvider"
import CartItem from "./CartItem"
import { CustomerProductsContext } from "../customers/CustomerProductsProvider"
import { CartContext } from "./CartProductProvider"

export default props => {
    const { addCustomerProducts } = useContext(CustomerProductsContext)
    const { customers } = useContext(CustomerContext)
    const { products } = useContext(ProductContext)
    const { shoppingCart, removeItemFromCart } = useContext(CartContext)
    const customerId = parseInt(localStorage.getItem("kandy_customer"))
    const customerInformation = customers.find(c => c.id === customerId)
    const customerCart = shoppingCart.filter(sc => sc.customerId === customerId)

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

    return (
        <>
            <article className="shoppingCart">
                <h1> {customerInformation.name}'s Shopping Cart</h1>
                <div>
                    {customerCart.length ? <Button onClick={purchaseCart}>Purchase Items</Button> : <h4 className="shoppingCart--empty">Your Shopping Cart is Empty!</h4>}
                </div>
                <section className="pendingOrder">
                    {
                        customerCart.map(i => {
                            let potentialPurchase = products.find(p => p.id === i.productId)

                            return <CartItem key={i.id}
                                product={potentialPurchase}
                                {...props} />
                        })
                    }
                </section>
            </article>
        </>
    )
}