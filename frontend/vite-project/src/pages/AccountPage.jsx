import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./AccountPage.module.css";

function AccountPage({ setUser }) {
    

    const navigate = useNavigate();

    const [user, setAccountUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {

        const fetchUser = async () => {
            try {

                const response = await fetch(
                    "https://scaling-goldfish-7rvj4rvrxg42wq9r-8084.app.github.dev/user/me",
                    {
                        credentials: "include"
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setAccountUser(data.user);
                } else {
                    navigate("/user/login");
                }

            } catch (error) {

                console.error(error);
                setMessage("Unable to load account details.");

            } finally {

                setLoading(false);

            }
        };

        fetchUser();

    }, [navigate]);


    const handleLogout = async () => {
        try {

            const response = await fetch(
                "https://scaling-goldfish-7rvj4rvrxg42wq9r-8084.app.github.dev/user/logout",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (response.ok) {
                setUser(null);
                navigate("/user/login");
            } else {
                setMessage(data.message);
            }

        } catch (error) {

            console.error(error);
            setMessage("Unable to logout. Please try again.");

        }
    };


    if (loading) {
        return (
            <div className={styles.loading}>
                Loading...
            </div>
        );
    }


    return (
        <div className={styles.page}>

            <Navbar />

            <div className={styles.accountCard}>

                <p className={styles.label}>
                    MY ACCOUNT
                </p>

                {user && (
                    <>
                        <h1 className={styles.name}>
                            {user.name_}
                        </h1>

                        <p className={styles.username}>
                            @{user.username}
                        </p>

                        <div className={styles.divider}></div>

                        <div className={styles.infoSection}>

                            <div className={styles.infoItem}>

                                <span className={styles.infoLabel}>
                                    EMAIL
                                </span>

                                <span className={styles.infoValue}>
                                    {user.email}
                                </span>

                            </div>


                            <div className={styles.infoItem}>

                                <span className={styles.infoLabel}>
                                    PHONE
                                </span>

                                <span className={styles.infoValue}>
                                    {user.phone}
                                </span>

                            </div>

                        </div>

                        <div className={styles.divider}></div>

                        <button
                            className={styles.logoutButton}
                            onClick={handleLogout}
                        >
                            LOG OUT
                        </button>

                        {message && (
                            <p className={styles.message}>
                                {message}
                            </p>
                        )}

                    </>
                )}

            </div>

        </div>
    );
}


export default AccountPage;