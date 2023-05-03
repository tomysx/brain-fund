import React, { useState } from "react";
import styles from "./styles.module.css";
import Modal from "./Modal";
import { Typography, LinearProgress, Box, Paper } from "@mui/material";


const ContractFunctions = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [createCaseModal, setCreateCaseModal] = useState(false);
  const [donateModal, setDonateModal] = useState(false);
  const [getCaseModal, setGetCaseModal] = useState(false);


  const handleCreateCase = () => {
    setCreateCaseModal(true);
  };

  const handleDonate = () => {
    setDonateModal(true);
  };

  const handleGetCase = () => {
    setGetCaseModal(true);
  };

  const createCase = async (description, goal) => {
    try {
      await props.contract.methods.createCase(description, goal).send({ from: props.accounts[0] });
      updateModalContent(
        <div>
          <h3>¡Caso creado con éxito!</h3>
          <p>
            Se ha creado un nuevo caso con la descripción "{description}" y un
            objetivo de {goal}.
          </p>
        </div>
      );
    } catch (error) {
      console.error(error);
    }
  };

  const donateCase = async (donateCaseId, amount) => {
    try {
      await props.contract.methods.donate(donateCaseId).send({ from: props.accounts[0], value: amount });
      updateModalContent(
        <div>
          <h3>¡Donación realizada con éxito!</h3>
          <p>
            Se ha realizado una nueva donación de {amount}ETH para el caso {donateCaseId}.
          </p>
        </div>
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getCase = async (caseId) => {
    try {
      const result = await props.contract.methods.getCase(caseId).call();
      updateModalContent(
        <Paper sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
          <Typography variant="h4" gutterBottom>
            Información del caso
          </Typography>
          <Typography variant="h6">
            ID Caso: {result.id}
          </Typography>
          <Typography variant="h6">
            Descripción: {result.description}
          </Typography>
          <Typography variant="h6">
            Objetivo: {result.goal}
          </Typography>
          <Typography variant="h6">
            Cantidad recaudada: {result.amountRaised}
          </Typography>
          <Typography variant="h6">
            Completado: {result.funded ? "Sí" : "No"}
          </Typography>
          <Box sx={{ marginTop: 3 }}>
            <LinearProgress
              variant="determinate"
              value={(result.amountRaised / result.goal) * 100}
              sx={{ height: 20 }}
            />
          </Box>
        </Paper>
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateModalContent = (content) => {
    setModalContent(content);
    handleModalOpen();
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <div className={styles.cardContainer}>
        <div className={styles.card} onClick={handleCreateCase}>
          <span className={styles.cardIcon}>📝</span>
          <h2 className={styles.cardTitle}>Crear caso</h2>
          <p className={styles.cardDescription}>
            Crea un nuevo caso de financiación para el cerebro.
          </p>
        </div>

        <div className={styles.card} onClick={handleDonate}>
          <span className={styles.cardIcon}>💰</span>
          <h2 className={styles.cardTitle}>Donar</h2>
          <p className={styles.cardDescription}>
            Realiza una donación a un caso existente.
          </p>
        </div>

        <div className={styles.card} onClick={handleGetCase}>
          <span className={styles.cardIcon}>🔍</span>
          <h2 className={styles.cardTitle}>Consultar caso</h2>
          <p className={styles.cardDescription}>
            Consulta la información de un caso existente.
          </p>
        </div>
      </div>

      {/* Create Case Modal */}
      <Modal
        isOpen={createCaseModal}
        onClose={() => setCreateCaseModal(false)}
        type="create"
        handleCreateCase={handleCreateCase}
        createCase={createCase}
      />

      {/* Donate Modal */}
      <Modal
        isOpen={donateModal}
        onClose={() => setDonateModal(false)}
        type="donate"
        handleDonate={handleDonate}
        donateCase={donateCase}
      />

      {/* Get Case Modal */}
      <Modal
        isOpen={getCaseModal}
        onClose={() => setGetCaseModal(false)}
        type="getCase"
        handleGetCase={handleGetCase}
        getCase={getCase}
      />

      {/* Result Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        type={modalContent ? "custom" : null}
        modalContent={modalContent}
        createCase={createCase}
        donateCase={donateCase}
        getCase={getCase}
      />
    </div>
  );
};

export default ContractFunctions;
