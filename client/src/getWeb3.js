import Web3 from "web3";

const getWeb3 = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      return web3;
    } catch (error) {
      throw new Error("User denied account access");
    }
  }
  if (window.web3) {
    return new Web3(window.web3.currentProvider);
  }
  throw new Error("No web3 instance injected");
};

export default getWeb3;
