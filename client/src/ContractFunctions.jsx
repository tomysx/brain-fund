import React, { useState } from "react";
import styles from './styles.module.css';

const ContractFunctions = (props) => {
    const [description, setDescription] = useState("");
    const [goal, setGoal] = useState(0);
    const [caseId, setCaseId] = useState(0);
    const [amount, setAmount] = useState(0);
    const [donateCaseId, setDonateCaseId] = useState(null);

    const handleCreateCase = async () => {
        try {
            await props.contract.methods.createCase(description, goal).send({ from: props.accounts[0] });
            alert('¡Caso creado correctamente!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDonate = async () => {
        try {
            await props.contract.methods.donate(donateCaseId).send({ from: props.accounts[0], value: amount });
            alert('¡Donación realizada correctamente!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleGetCase = async () => {
        try {
            const result = await props.contract.methods.getCase(caseId).call();
            window.alert(`Case ID: ${result.id}\nDescription: ${result.description}\nGoal: ${result.goal}\nAmount Raised: ${result.amountRaised}\nFunded: ${result.funded}`);
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className={styles.container}>
            <h2>Crear un nuevo caso</h2>
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

            <h2>Obtener información de un caso</h2>
            <div className={styles.formGroup}>
                <label htmlFor="caseId">ID del caso:</label>
                <input type="number" id="caseId" name="getIDCase" value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Ingrese el ID del caso..." />
            </div>
            <div className={styles.formGroup}>
                <button onClick={handleGetCase}>Buscar</button>
            </div>

            <h2>Realizar donación a un caso</h2>
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
        </div>
    );
};

export default ContractFunctions;
