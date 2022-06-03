import logo from './logo.svg';
import './App.css';
import{useConnect , useAccount , InjectedConnector, chain} from 'wagmi';
import {useState} from 'react';

const metamaskConnector = new InjectedConnector({chain:[chain.kovan],});

function App() {
  const [connectResult, connect] = useConnect();
  const [accountResult, disconnect] = useAccount();
  const [error , setError] = useState("");

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
          <p>Account : {accountResult.data.address}</p>
          <p>Error : {error ? error : "No error"}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div> :
        <button onClick={connectToMetamask}>Connect to Metamask</button>
      }
    </div>
  );
}

export default App;
