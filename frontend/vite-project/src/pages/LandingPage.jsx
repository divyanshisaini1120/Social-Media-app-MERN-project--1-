import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import styles from "./LandingPage.module.css";

function Landing() {

    const navigate = useNavigate();

    const collections = [
        {
            name: "T-Shirts",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnKkp9Vw6aj7t8TRqT1qC3OfpgVQ8IKxaCqidgp2rmN3zFbq_AvUEKijRm&s=10"
        },
        {
            name: "Footwear",
            image: "https://s.yimg.com/lo/mysterio/api/087fbab2ede00b637a932727b1346d1c6e3ed2b05e699ff80736e5639b42e039/lightyear_networkapi/resizefill_w960%3Bquality_80%3Bformat_webp/https%3A%2F%2Fmedia.zenfs.com%2Fen%2Frolling_stone_ecomm_619%2F6264dd053954ead7a2fe6ac132d48b8e"
        },
        {
            name: "Bags",
            image: "https://assets.vogue.com/photos/6441903dc1aeb0fdef204c0e/1:1/w_1028,h_1028,c_limit/LAYOUT%20440x285%20C-Z%20SS23%20DP3%20INTL_BD.jpg"
        },
        {
            name: "Jeans",
            image: "https://m.media-amazon.com/images/I/81WocfUL7rL._AC_UY1100_.jpg"
        },
        {
            name: "Watches",
            image: "https://images.squarespace-cdn.com/content/v1/5c78138211f784469d4817df/80ca74a0-8055-4f73-983c-92b3008f604d/EC928377-7971-4879-A81A-4324C31BA213.jpeg?format=2500w"
        },
        {
            name: "Stationery",
            image: "https://img-srv.arcprint.in/adpsSTG/specification/1769259287644_633.jpg/full/500,500/0/default.webp"
        }
    ];

    const handleCollectionClick = (category) => {
        navigate(`/products?category=${encodeURIComponent(category)}`);
    };

    return (
        <div className={styles.page}>

            <Navbar />

            <main>

                {/* =========================
                    PROMOTION / AD
                ========================= */}

                <section className={styles.hero}>

                    <div className={styles.heroContent}>

                        <p className={styles.heroLabel}>
                            NEW SEASON
                        </p>

                        <h1 className={styles.heroTitle}>
                            Everyday,
                            <br />
                            Reimagined.
                        </h1>

                        <p className={styles.heroDescription}>
                            Contemporary essentials designed
                            for everyday living.
                        </p>

                        <button
                            className={styles.heroButton}
                            onClick={() => navigate("/products")}
                        >
                            SHOP NOW
                        </button>

                    </div>


                    <div className={styles.heroVisual}>

                        <img
                            src="https://fashionmagazine.mblycdn.com/fm/resized/2025/08/w1200/FEATURE_Horizontal.png"
                            alt="New season promotion"
                            className={styles.heroImage}
                        />

                    </div>

                </section>


                {/* =========================
                    OUR COLLECTIONS
                ========================= */}

                <section className={styles.collections}>

                    <div className={styles.sectionHeader}>

                        <p className={styles.sectionLabel}>
                            EXPLORE
                        </p>

                        <h2 className={styles.sectionTitle}>
                            Our Collections
                        </h2>

                    </div>


                    <div className={styles.collectionGrid}>

                        {collections.map((collection) => (

                            <button
                                key={collection.name}
                                className={styles.collectionCard}
                                onClick={() => handleCollectionClick(collection.name)}
                            >
                                <img
                                    src={collection.image}
                                    alt={collection.name}
                                    className={styles.collectionImage}
                                />

                                <div className={styles.collectionOverlay}>

                                    <span className={styles.collectionName}>
                                        {collection.name}
                                    </span>

                                    <span className={styles.arrow}>
                                        →
                                    </span>

                                </div>
                            </button>
                            ))}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Landing;