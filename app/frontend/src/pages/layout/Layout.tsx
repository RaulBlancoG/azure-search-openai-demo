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
    if (selectedValue === "make_a_suggestion") {
      window.open(
        "https://forms.office.com/Pages/DesignPageV2.aspx?subpage=design&FormId=IKg7l1hKRkKEvxcOULMVKgaikAIJ2B9IlnsanlMdSlpUQU9TWjhGUVQyVkoyVTgxM0NVNEE2NTVKOC4u"
      );
    }
    else if(selectedValue === "share_an_idea"){
      window.open(
        "https://forms.office.com/Pages/DesignPageV2.aspx?subpage=design&FormId=IKg7l1hKRkKEvxcOULMVKgaikAIJ2B9IlnsanlMdSlpUQjVMNVU0VUg4M0xFWDVaR05aRURSVlpGQS4u"
      );
    }
    else if(selectedValue === "report_a_problem"){
      window.open(
        "https://forms.office.com/Pages/DesignPageV2.aspx?subpage=design&FormId=IKg7l1hKRkKEvxcOULMVKgaikAIJ2B9IlnsanlMdSlpUOEJXSksyUFBENDBRTlo5NVJHNEJXRllPQS4u"
      );
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
              <img
                src={dna_logo}
                alt="DnAlogo"
                aria-label="Link to DnA AI Apps"
                height="400px"
                className={styles.githubLogo}
              />
          </li>

          <Link to="/" className={styles.headerTitleContainer}>
            <h3 className={styles.headerTitle}>Grupo Bimbo ChatGPT</h3>
          </Link>

          {/* Botón de Feedback */}
          <h4 className={styles.headerRightText}>Version BETA</h4>

          <div>
            <select
              value={selectedFeedback}
              onChange={handleFeedbackChange}
              onInput={handleFeedbackChange}
              className={`${styles.feedbackSelect}`}
              style={{ textAlign: 'center' }} // Aplicar estilo de centrado al texto
            >
              <option value="Feedback" disabled selected className=''>
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
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default Layout;
