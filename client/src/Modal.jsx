import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


const Modal = (props) => {

  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(0);
  const [caseId, setCaseId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [donateCaseId, setDonateCaseId] = useState(null);

  const handleClose = () => {
    props.onClose();
  };

  const handleCreateCase = () => {
    props.createCase(description, goal);
    setDescription("");
    setGoal(0);
    handleClose();
    handleClose();
  };

  const handleDonate = () => {
    props.donateCase(donateCaseId, amount);
    setDonateCaseId(null);
    setAmount(0);
    handleClose();
  };

  const handleGetCase = () => {
    props.getCase(caseId);
    setCaseId(0);
    handleClose();
  };

  let title, content;

  switch (props.type) {
    case "create":
      title = "Crear caso";
      content = (
        <>
          <p>Ingrese la información requerida para crear un nuevo caso:</p>
          <div className={styles.formGroup}>
            <label htmlFor="description">Descripción:</label>
            <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ingrese una descripción..." />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="goal">Objetivo:</label>
            <input type="number" id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Ingrese un objetivo..." />
          </div>
          <div className={styles.formGroup}>
            <button onClick={handleCreateCase}>Crear caso</button>
          </div>
        </>
      );
      break;
    case "donate":
      title = "Donar";
      content = (
        <>
          <p>Ingrese la información requerida para realizar una donación:</p>
          <div className={styles.formGroup}>
            <label htmlFor="caseIdDonate">ID del caso:</label>
            <input type="number" id="caseIdDonate" name="donateIDCase" value={donateCaseId} onChange={(e) => setDonateCaseId(e.target.value)} placeholder="Ingrese el ID del caso..." />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="amount">Cantidad:</label>
            <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Ingrese la cantidad a donar..." />
          </div>
          <div className={styles.formGroup}>
            <button onClick={handleDonate}>Donar</button>
          </div>
        </>
      );
      break;
    case "getCase":
      title = "Consultar caso";
      content = (
        <>
          <p>
            Introduzca el ID del caso que desea consultar:
          </p>
          <div className={styles.formGroup}>
            <label htmlFor="caseId">ID del caso:</label>
            <input type="number" id="caseId" name="getIDCase" value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Ingrese el ID del caso..." />
          </div>
          <div className={styles.formGroup}>
            <button onClick={handleGetCase}>Buscar</button>
          </div>
        </>
      );
      break;
    default:
      title = "";
      content = props.modalContent;
  }

  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div
          className={styles.modalBackground}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <IconButton
              edge="end"
              color="inherit"
              aria-label="close"
              onClick={handleClose}
              style={{ alignSelf: "flex-end" }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
            <h2>{title}</h2>
            <div>{content}</div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
