import React, { useEffect , useState} from 'react';
import './App.css';
import axios from 'axios';

export type Crypto = {
  ath: number;
  atl: number;
  current_price: number;
  id: string;
  name: string;
  symbol: string; 
  high_24h: number;
  low_24h: number;
}



function App() {
  //Tell the useState what type to expect - deghat kun useState default esh be undefined hast pas benvis null to parantez onvaght age ternary paeen dar cryptos? ro nazari typescript mige object is possibly null ama age null ro nazari typescript mige possibly null or undefined
  const [cryptos , setCryptos] = useState<Crypto[] | null>(null); // to say that Crypto is the type and [] to say that its an array. null ham gozashtim ta begim agar chzi return nashod null hast-->in va export type Crypto bala ro nazari nemitoni .map bezani ro crypto
  useEffect(()=>{
    const url= 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'; // Type infer mishe be string!
    axios.get(url).then((response)=>{
      // console.log(response.data); // no need for the second then and no need for return response.json and we can use response.data
      setCryptos(response.data);
    });
  },[]); // Execute once on startup
  return (
    <div className="App">
      {cryptos ? // nokte khoobe typescript ine ke age in ternary ro ham nazari momkene error bede typescript
       cryptos.map((crypto)=>{
         return <p>{crypto.name + ' $'+crypto.current_price}</p>; //deghat kun name ro agar namee benvisi type script error mide ke khoobe yani property ee ke vojod nadare ro error mide
       })
      :null}
    </div>
  );
}

export default App;
