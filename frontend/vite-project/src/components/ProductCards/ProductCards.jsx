import styles from "./ProductCards.module.css";
import { useNavigate } from "react-router-dom";

function ProductCards({ products }) {

    const navigate = useNavigate();

    return (
        <div className={styles.productGrid}>

            {products.map((product) => (

                <div
                    key={product._id}
                    className={styles.productCard}
                >

                    <div
                        className={styles.imageContainer}
                        onClick={() => navigate(`/products/${product._id}`)}
                    >
                        <img
                            src={product.images}
                            alt={product.name_}
                            className={styles.productImage}
                        />
                    </div>

                    <div className={styles.productInfo}>

                        <div className={styles.priceCategoryRow}>

                            <span className={styles.price}>
                                ₹{product.price}
                            </span>

                            <span className={styles.category}>
                                {product.category}
                            </span>

                        </div>

                        <h3 className={styles.productName}>
                            {product.name_}
                        </h3>

                        <div className={styles.actions}>

                            <button
                                className={styles.addToCart}
                            >
                                Add to Cart
                            </button>

                            <button
                                className={styles.buyNow}
                            >
                                Buy Now
                            </button>

                        </div>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default ProductCards;