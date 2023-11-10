const ProductContainer = ({product, key}) => {
    return (
        <div className="product-container">
            <img src={product.productImage} />
            <div className="product-details">
                <p className="product-title">
                    {product.name}
                </p>
                <p> {product.price} </p>
            </div>
            <div className = "buy-cart">
                <button className = 'btn'>
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default ProductContainer;