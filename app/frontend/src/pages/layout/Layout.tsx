import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import dna_logo from "../../assets/powered_dna_blanco.png";
import styles from "./Layout.module.css";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

import { AppUser, useAppContext } from "../../AppContext";
interface UserAvatarProps {
    user: AppUser;
}

const Layout = () => {
    const [selectedFeedback, setSelectedFeedback] = useState("Feedback"); // Inicialmente, se selecciona "Feedback"

    const feedbackOptions = ["Report a problem", "Make a suggestion", "Propose a new idea"];

    const handleFeedbackChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        // Abre un modal de Swal cuando se selecciona "Make a suggestion"
        if (selectedValue === "propose_a_new_idea") {
            window.open("https://forms.office.com/r/KjzBHsDjmX");
        } else if (selectedValue === "make_a_suggestion") {
            window.open("https://forms.office.com/r/2FiSfUmcTz");
        } else if (selectedValue === "report_a_problem") {
            window.open("https://forms.office.com/r/02LMi34ihP");
        }
        // Establecer "Feedback" como la opción seleccionada nuevamente
        setSelectedFeedback("Feedback");
    };

    const app = useAppContext();
    const user = app.user || { displayName: "", email: "" };

    return (
        // <AuthenticatedTemplate>
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    {/* IMAGEN DE DEV*/}
                    <ul className={styles.headerNavLeftMargin}>
                        <img src={dna_logo} alt="DnAlogo" aria-label="Link to DnA AI Apps" height="400px" className={styles.githubLogo} />
                    </ul>

                    <h3 className={styles.typing}>Grupo Bimbo ChatGPT</h3>
                    <AuthenticatedTemplate></AuthenticatedTemplate>

                    <UnauthenticatedTemplate></UnauthenticatedTemplate>
                    {/* Botón de Feedback */}
                    <h4 className={styles.headerRightText}>Version BETA</h4>

                    <div>
                        <select
                            value={selectedFeedback}
                            onChange={handleFeedbackChange}
                            onInput={handleFeedbackChange}
                            className={`${styles.feedbackSelect}`}
                            style={{ textAlign: "center" }} // Aplicar estilo de centrado al texto
                        >
                            <option value="Feedback" disabled hidden selected style={{ fontSize: "2vh" }}>
                                Feedback
                            </option>
                            {feedbackOptions.map(option => (
                                <option
                                    key={option}
                                    className={`${styles.feedbackSelectOption}`}
                                    value={option.toLowerCase().replace(/\s/g, "_")} // Convierte en minúsculas y reemplaza espacios
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <AuthenticatedTemplate>
                        <div>
                            <ul>
                                <div>
                                    Welcome:
                                    <br />
                                    {user.displayName}
                                    {/**{user.email} */}
                                </div>
                                <div>
                                    <button onClick={app.signOut!} style={{ marginLeft: "50px" }}>
                                        Sign Out
                                    </button>
                                    <br />
                                </div>
                            </ul>
                        </div>
                    </AuthenticatedTemplate>
                </div>
            </header>

            <Outlet />
        </div>
        // </AuthenticatedTemplate>
    );
};

export default Layout;

{
    /**
import { Button, Container } from "react-bootstrap";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { useAppContext } from "./AppContext";

export default function Welcome() {
    const app = useAppContext();

    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <Container fluid>
                <h1>Chat GPT </h1>
                <p className="lead">This sample app shows how to use the Microsoft Graph API to access a user's data from React</p>
                <AuthenticatedTemplate>
                    <div>
                        <h4>Welcome {app.user?.displayName || ""}!</h4>
                        <p>Use the navigation bar at the top of the page to get started.</p>
                    </div>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <Button color="primary" onClick={app.signIn!}>
                        Click here to sign in
                    </Button>
                </UnauthenticatedTemplate>
            </Container>
        </div>
    );
}
*/
}
