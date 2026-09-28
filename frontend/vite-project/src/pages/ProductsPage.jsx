import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


import Navbar from "../components/Navbar/Navbar.jsx";
import ProductCards from "../components/ProductCards/ProductCards.jsx";

import styles from "./ProductsPage.module.css";

function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();

    const category = searchParams.get("category");
    const search = searchParams.get("search");

    

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setLoading(true);
                setError("");

                let url;
                if (search) {
                    url = `https://scaling-goldfish-7rvj4rvrxg42wq9r-8084.app.github.dev/products/search?search=${encodeURIComponent(search)}`;
                } else if (category) {
                    url = `https://scaling-goldfish-7rvj4rvrxg42wq9r-8084.app.github.dev/products/category?category=${encodeURIComponent(category)}`;
                } else {
                    url = "https://scaling-goldfish-7rvj4rvrxg42wq9r-8084.app.github.dev/products/";
                }

                // if (category) {

                //     url = `https://scaling-goldfish-7rvj4rvrxg42wq9r-8084.app.github.dev/products/category?category=${encodeURIComponent(category)}`;

                // } else {

                //     url = "https://scaling-goldfish-7rvj4rvrxg42wq9r-8084.app.github.dev/products/";

                // }

                const response = await fetch(url);

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Unable to fetch products");
                }

                setProducts(data.products);

            } catch (err) {

                console.error(err);
                setError(err.message);

            } finally {

                setLoading(false);

            }
        };

        fetchProducts();

    }, [category, search]);

    if (loading) {
        return (
            <div className={styles.message}>
                Loading products...
            </div>
        );
    }


    if (error) {
        return (
            <div className={styles.message}>
                {error}
            </div>
        );
    }


    return (
        <div className={styles.page}>

            <Navbar />

            <main className={styles.content}>

                <div className={styles.header}>

                    <p className={styles.label}>
                        EKART
                    </p>

                    <h1 className={styles.title}>
                        {search
                            ? `Search results for "${search}"`
                            : category
                                ? category
                                : "All Products"
                        }
                    </h1>

                </div>

                <ProductCards products={products} />

            </main>

        </div>
    );
}

export default ProductsPage;