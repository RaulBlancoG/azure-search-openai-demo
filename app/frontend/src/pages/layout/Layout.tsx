import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import dna_logo from "../../assets/powered_dna_blanco.png";
import styles from "./Layout.module.css";
import Swal from 'sweetalert2';

const Layout = () => {
  const [selectedFeedback, setSelectedFeedback] = useState("Feedback"); // Inicialmente, se selecciona "Feedback"

  const feedbackOptions = ["Report a problem", "Make a suggestion", "Share an idea"];

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    console.log("Opción seleccionada:", selectedValue);
  
    // Abre un modal de Swal cuando se selecciona "Make a suggestion"
    if (selectedValue === "make_a_suggestion"  || selectedValue === "share_an_idea" || selectedValue === "report_a_problem") {
      Swal.fire({
        title: 'Make a suggestion',
        html: `
          <iframe width="640px" height="480px" src="https://forms.office.com/Pages/ResponsePage.aspx?id=IKg7l1hKRkKEvxcOULMVKgaikAIJ2B9IlnsanlMdSlpUNkNZNkIxNzVXSThLR0pQUUg2RE9ZOVNJQS4u&embed=true" frameborder="0" marginwidth="0" marginheight="0" style="border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>
        `,
        preConfirm: function () {
          // Aquí puedes obtener los valores de los campos de entrada
          // const problemDescription = document.getElementById('problem-description').value;
        }
      });
    }
    // Establecer "Feedback" como la opción seleccionada nuevamente
    setSelectedFeedback("Feedback");
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header} role={"banner"}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.headerTitleContainer}>
            <h3 className={styles.headerTitle}>Grupo Bimbo ChatGPT | Demo</h3>
          </Link>
          <nav>
            <ul className={styles.headerNavList}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink
                  }
                >
                  Chat
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink
                  }
                >
                  Chat PRUEBA
                </NavLink>
              </li>
              <li className={styles.headerNavLeftMargin}>
                <NavLink
                  to="/qa"
                  className={({ isActive }) =>
                    isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink
                  }
                >
                  Ask a question
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* Botón de Feedback */}
          <div className={styles.feedbackContainer}>
            <select
            value={selectedFeedback}
            onChange={handleFeedbackChange}
            onInput={handleFeedbackChange}
            className={`${styles.feedbackSelect}`}
            >
              <option value="Feedback" disabled selected>
                Feedback
              </option>
              {feedbackOptions.map((option) => (
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
          <h4 className={styles.headerRightText}>DEV Version</h4>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default Layout;
