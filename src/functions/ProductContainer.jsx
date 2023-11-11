const ProductContainer = ({product}) => {
    return (
        <div className="product-container">
            <a href = {`/games/${product.id}`}>
                <img className="product-thumbnail" src={product.productImage} />
            </a>
            <div className="product-details">
                <p className="product-title">
                    {product.name}
                </p>
                <p className="product-price"> {product.price} RON</p>
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