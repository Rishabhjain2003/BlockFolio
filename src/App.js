import  Axios  from 'axios';
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [listofcoins, setlistofcoins] = useState([]);
  const [searchWord, setsearchWord] = useState([]);

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setlistofcoins(response.data.coins);
      }
    );
  }, []);

  const filteredCoins = listofcoins.filter((coin)=>{
    return coin.name.toString().toLowerCase().includes(searchWord.toString().toLowerCase());
  });

  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible&display=swap" rel="stylesheet"></link>
      <div className='cryptoheader'>
        <h1>BlockFolio</h1>
        <input type='text' placeholder='Bitcoin...' onChange={(event)=>{setsearchWord(event.target.value)}}></input>
      </div>
      <div className='containers'>
        <div className='coin-cont'>
          <tr>
            <th style={{width:200}}>Coin</th>
            <th>Price</th>
            <th style={{width:150}}>Market Cap</th>
            <th>1h</th>
            <th>24h</th>
            <th className='vol'>Volume</th>
          </tr>
          <div className='cryptodisplay'>{filteredCoins.map((coin)=>{
            const p1 = coin.priceChange1d;
            const p2 = coin.priceChange1h;
            return(
                <tr className='coincard'>
                  <td style={{width:200}}>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                      <img src={coin.icon} width={30} height={30} alt='img'></img>
                      <div className='name-sym'>
                        <small>{coin.symbol}</small>
                        <t>{coin.name}</t>
                      </div>
                    </div>
                  </td>
                  <td >
                    $ {(coin.price*100).toFixed(2)}
                  </td>
                  <td style={{width:150, textAlign:'center'}} className='mrktcap'>
                    $ {(coin.marketCap/1000000000).toFixed(2)} B
                  </td>
                  <td style={{color:p1>0?'#3cde7f': '#ff6d5d'}}>{coin.priceChange1d}</td>
                  <td style={{color:p2>0?'#3cde7f': '#ff6d5d'}}>{coin.priceChange1h}</td>
                  <td className='vol' style={{color:'#319592'}}>{coin.volume}</td>
                </tr>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
