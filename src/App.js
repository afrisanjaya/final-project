import logo from './logo.svg';
import './App.css';
import{useConnect , useAccount , InjectedConnector, chain, useContractRead, useContractWrite} from 'wagmi';
import {useState} from 'react';
import {hrABI, contractAddress} from './ABI/contractABI';

const metamaskConnector = new InjectedConnector({chain:[chain.kovan],});

function App() {
  const [connectResult, connect] = useConnect();
  const [accountResult, disconnect] = useAccount();
  const [error , setError] = useState("");
  const [buyProductResult , buyProduct] = useContractRead({addressOrName:contractAddress, contractInterface:hrABI},'buyProduct');
  const[addProductResult , addProduct] = useContractWrite({addressOrName:contractAddress, contractInterface:hrABI},'addProduct');
  const [getProductResult , getProduct] = useContractRead({addressOrName:contractAddress, contractInterface:hrABI},'getProduct');
  const [getBalanceResult , getBalance] = useContractRead({addressOrName:contractAddress, contractInterface:hrABI},'getBalance');


  const connectToMetamask = async () => {
    try {
      const result = await connect(metamaskConnector);
      if(result.data.chain.unsupported){
        throw new Error("Unsupported chain");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      {connectResult.data.connected ?
        <div>
          <p>Buy Product</p>
          <p>Product ID : <input type="text"/></p>
          <p>Amount : <input type="text"/></p>
          <button onClick={()=>{
            buyProduct({id:1,amount:1});
          }}>Buy</button>
          <hr/>
          <p>Add Product</p>
          <p>Product ID : <input type="text"/></p>
          <p>Price : <input type="text"/></p>
          <p>Amount : <input type="text"/></p>
          <p>Name : <input type="text"/></p>
          <button onClick={()=>{
            addProduct({id:1,price:1,amount:1,name:"test"});
          }}>Add</button>
          <hr/>
          <p>Get Product</p>
          <p>Product ID : <input type="text"/></p>
          <button onClick={()=>{
            getProduct({id:1});
          }}>Get</button>
          <hr/>
          <p>Error : {error ? error : "No error"}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div> :
        <button onClick={connectToMetamask}>Connect to Metamask</button>
      }
    </div>
  );
}

export default App;
