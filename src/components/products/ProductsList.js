import React, { useContext } from "react"
import { ProductContext } from "./ProductsProvider"
import Product from "./Product"
import "./Product.css"

export default props => {
    const { products } = useContext(ProductContext)

    return (
        <article className="products">
            <h1>Products</h1>
            <section className="productsList">
                {
                    products.map(loc => {

                        return <Product key={loc.id}
                            product={loc}
                            {...props} />
                    })
                }
            </section>
        </article>
    )
}