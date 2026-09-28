import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import styles from "./WishlistPage.module.css";

function WishlistPage() {

    const navigate = useNavigate();

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchWishlist = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await fetch(
                    "https://scaling-goldfish-7rvj4rvrxg42wq9r-8084.app.github.dev/wishlist",
                    {
                        credentials: "include"
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Unable to fetch wishlist"
                    );
                }

                /*
                    getWishlist currently gives us:

                    wishlist: [
                        {
                            productid: "product-id"
                        }
                    ]

                    So we fetch each actual product separately.
                */

                const products = await Promise.all(
                    data.wishlist.map(async (item) => {

                        const productResponse = await fetch(
                            `https://scaling-goldfish-7rvj4rvrxg42wq9r-8084.app.github.dev/products/${item.productid}`,
                            {
                                credentials: "include"
                            }
                        );

                        const productData = await productResponse.json();

                        if (!productResponse.ok) {
                            throw new Error(
                                productData.message ||
                                "Unable to fetch product"
                            );
                        }

                        return productData.product;
                    })
                );

                setWishlist(products);

            } catch (err) {

                console.error(err);
                setError(err.message);

            } finally {

                setLoading(false);

            }
        };

        fetchWishlist();

    }, []);


    if (loading) {

        return (
            <div className={styles.messagePage}>
                <Navbar />
                <p className={styles.message}>
                    Loading wishlist...
                </p>
            </div>
        );

    }


    if (error) {

        return (
            <div className={styles.messagePage}>
                <Navbar />
                <p className={styles.message}>
                    {error}
                </p>
            </div>
        );

    }


    return (

        <div className={styles.page}>

            <Navbar />

            <main className={styles.content}>

                {/* HEADER */}

                <div className={styles.header}>

                    {/* <div className={styles.breadcrumb}>
                        <span>Home</span>
                        <span className={styles.separator}>›</span>
                        <span>My Account</span>
                        <span className={styles.separator}>›</span>
                        <span className={styles.current}>
                            Wishlist
                        </span>
                    </div> */}

                    <div className={styles.titleRow}>

                        <div>
                            <p className={styles.label}>
                                EKART
                            </p>

                            <h1 className={styles.title}>
                                Wishlist
                            </h1>
                        </div>

                        <p className={styles.itemCount}>
                            Wishlisted Products:{" "}
                            <span>{wishlist.length}</span>
                        </p>

                    </div>

                </div>


                {/* EMPTY WISHLIST */}

                {wishlist.length === 0 ? (

                    <div className={styles.emptyState}>

                        <div className={styles.emptyHeart}>
                            ♡
                        </div>

                        <h2>
                            Your wishlist is empty
                        </h2>

                        <p>
                            Save products you love and find them here later.
                        </p>

                        <button
                            className={styles.shopButton}
                            onClick={() => navigate("/products")}
                        >
                            Explore Products
                        </button>

                    </div>

                ) : (

                    /* PRODUCT GRID */

                    <div className={styles.productGrid}>

                        {wishlist.map((product) => (

                            <article
                                key={product._id}
                                className={styles.productCard}
                            >

                                <div
                                    className={styles.imageContainer}
                                    onClick={() =>
                                        navigate(
                                            `/products/${product._id}`
                                        )
                                    }
                                >

                                    <img
                                        src={product.images}
                                        alt={product.name_}
                                        className={styles.productImage}
                                    />

                                </div>


                                <div className={styles.productInfo}>

                                    <h2
                                        className={styles.productName}
                                        onClick={() =>
                                            navigate(
                                                `/products/${product._id}`
                                            )
                                        }
                                    >
                                        {product.name_}
                                    </h2>

                                    <p className={styles.price}>
                                        ₹{product.price}
                                    </p>

                                    <button
                                        className={styles.addToCart}
                                    >
                                        Add to Cart
                                    </button>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default WishlistPage;