import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import dna_logo from "../../assets/powered_dna_blanco.png";
import styles from "./Layout.module.css";
import Swal from "sweetalert2";

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

    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    {/* IMAGEN DE DEV*/}
                    <li className={styles.headerNavLeftMargin}>
                        <img src={dna_logo} alt="DnAlogo" aria-label="Link to DnA AI Apps" height="400px" className={styles.githubLogo} />
                    </li>

                    <h3 className={styles.typing}>Grupo Bimbo ChatGPT</h3>

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
                </div>
            </header>

            <Outlet />
        </div>
    );
};

export default Layout;
