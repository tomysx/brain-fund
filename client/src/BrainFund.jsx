import React, { useState, useEffect } from "react";
import BrainFundContract from "./contracts/BrainFund.json";
import getWeb3 from "./getWeb3";
import { ContractContext, UserContext } from "./contexts";
import ContractFunctions from "./ContractFunctions";
import styles from './styles.module.css';
import { motion, AnimatePresence } from "framer-motion";



export const getContractInstance = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = BrainFundContract.networks[networkId];
    return new web3.eth.Contract(
        BrainFundContract.abi,
        deployedNetwork && deployedNetwork.address
    );
};

const BrainFund = () => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const init = async () => {
            try {
                // Get web3 instance
                const web3Instance = await getWeb3();
                setWeb3(web3Instance);

                // Get user accounts
                const userAccounts = await web3Instance.eth.getAccounts();
                setAccounts(userAccounts);

                // Get contract instance
                const contractInstance = await getContractInstance(web3Instance);
                setContract(contractInstance);

                // Get account balance
                const balanceInWei = await web3Instance.eth.getBalance(userAccounts[0]);
                const balanceInEth = web3Instance.utils.fromWei(balanceInWei, "ether");
                setBalance(balanceInEth);
            } catch (error) {
                alert(
                    `Failed to load web3, accounts, or contract. Check console for details.`
                );
                console.error(error);
            }
        };

        init();
    }, []);

    if (!web3 || !accounts.length || !contract) {
        return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
        <ContractContext.Provider value={contract}>
            <UserContext.Provider value={accounts[0]}>
                <motion.div
                    className={styles.container}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className={styles.center}>
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 1 }}
                            >
                                <h1>👋 Bienvenido a BrainFund 🧠</h1>
                            </motion.div>
                        </AnimatePresence>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            💰 Account balance: {balance} ETH
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 1 }}
                        >
                            👤 Account address: {accounts[0]}
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 1 }}
                        >
                            📝 Contract address: {contract ? contract._address : 'Cargando...'}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1, duration: 1 }}
                        >
                            <ContractFunctions accounts={accounts} contract={contract} />
                        </motion.div>
                    </div>
                </motion.div>
            </UserContext.Provider>
        </ContractContext.Provider>

    );
};

export default BrainFund;
