import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CryptoSummary from './components/CryptoSummary';
import { Crypto } from './Types';

import type { ChartData, ChartOptions } from 'chart.js';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
    //Tell the useState what type to expect - deghat kun useState default esh be undefined hast pas benvis null to parantez onvaght age ternary paeen dar cryptos? ro nazari typescript mige object is possibly null ama age null ro nazari typescript mige possibly null or undefined
    const [cryptos, setCryptos] = useState<Crypto[] | null>(null); // to say that Crypto is the type and [] to say that its an array. null ham gozashtim ta begim agar chzi return nashod null hast-->in va export type Crypto bala ro nazari nemitoni .map bezani ro crypto
    const [selected, setSelected] = useState<Crypto[]>([]); //null bezari to deafult value khate setSelecte(c) eror mide

    const [range , setRange] = useState<number>(30); //30 days as the default

    /*
    const [data, setData] = useState<ChartData<'line'>>(); //jaye line mitoni har chi dost dari bezari
    const [options, setOptions] = useState<ChartOptions<'line'>>({
        responsive: true,
        plugins: {
            legend: {
                // position: 'top' as const ,
                display: false // age mikhay legedn dashte bashi balae ro uncomment kun va in khat ro hazf kun
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            }
        }
    });
    */
    useEffect(() => {
        const url =
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'; // Type infer mishe be string!
        axios.get(url).then((response) => {
            // console.log(response.data); // no need for the second then and no need for return response.json and we can use response.data
            setCryptos(response.data);
        });
    }, []); // Execute once on startup

/*
    useEffect(()=>{
            if (!selected) return; // chera? chun in useEffect dar load avalie page ke drop down roye choose an optino hast load mishe va console error mide ke chizi nabood get kune pas vase hamin in if ro gozashtim --> zeman in khat jelooye in error ro ham migire ke ghabl inke choose bokoni 7 days ya 1 day ro select kuni ke agar in khat nabashe ba ham netwrok error mide
                        axios
                            .get(
                                `https://api.coingecko.com/api/v3/coins/${selected?.id}/market_chart?vs_currency=usd&days=${range}&${range===1 ? 'interval=hourly' : 'interval=daily'}`
                            )
                            .then((response) => {
                                console.log(response.data); //agar dar conslode check kuni mibin ye object mide ke tosh ye prices array hast ke har elementesh do ta value timestamp a price ro dare
                                setData({ // content in json ro az https://react-chartjs-2.js.org/examples/line-chart gereftim 
                                    labels: response.data.prices.map((price: number[])=>{
                                        return moment.unix(price[0]/1000).format(range===1 ? "HH:MM" : "MM-DD-YYYY"); // two digit month like 06 and two digit days like 15
                                    }), //map faghat roye array kar mikune va data ham object hast ke tosh array e price darim
                                    datasets: [
                                        {
                                            label: 'Dataset 1',
                                            data: response.data.prices.map((price: number[])=>{
                                              return price[1];
                                            }),
                                            borderColor: 'rgb(255, 99, 132)',
                                            backgroundColor: 'rgba(255, 99, 132, 0.5)'
                                        }
                                    ]
                                });
                        

                        setOptions({
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            // position: 'top' as const,
                                            display: false // age mikhay legend dashte bashi display false o hazf kun va balae ro uncomment kun
                                        },
                                        title: {
                                            display: true,
                                            text: `${selected?.name} Price Over Last ` + range + (range===1 ? ' Day.': ' Days.')
                                        }
                                    }
                                })
                            });
    },[selected , range]); // har vaght state e selected or range taghir kard in useEffect run mishe
*/

    useEffect(()=>{
        console.log("SELECTEd" , selected);
    },[selected]);

    function updateOwned(crypto: Crypto , amount: number){
        // console.log('updateOwned' , crypto, amount);
        // console.log(selected);
        let temp = [...selected];
        let tempObj = temp.find((c)=> c.id===crypto.id) // c ro return kun age id esh ba id e crypto yeki bood
        if(tempObj){
            tempObj.owned = amount;  //age if e bala ro nazari error typescript mide in khat va age nazari if ro va bekhay az "?" use kuni ham ye error dg mide
            setSelected(temp); //update selected with the new updated object
        }
        
    }

    return (
        <>
            <div className="App">
                <select
                    onChange={(e) => {
                        // console.log(e.target.value); //value hamooni hast ke dar tag e option gozashti --> alabte age value ro nazari chi? tebghe site https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select dar paragraph ghabl az section attributes gofte ke ke age value nazari default text e ke toye tag hast mire dakhele value dar e.target.value yani crypto.name e ke content tag option hast mire toye e.target.value
                        const c = cryptos?.find((x) => x.id === e.target.value) as Crypto; // To get the object of the thing that you selected in the dropp down --> from id to the object
                        // as Crypto bala bara chie? to define a type ke error paeen dar setSelected bartaraf beshe --> alabte type e selected ham dar bala bayad dar usestate esh dorost beshe ke [] bashe va null ham remove she az oon khat
                        // console.log(c);
                        setSelected([...selected, c]); //already selected cryptos plus the current selection
                    }}
                    defaultValue="default"
                >
                    <option value="default">Choose an option</option>
                    {cryptos // nokte khoobe typescript ine ke age in ternary ro ham nazari momkene error bede typescript
                        ? cryptos.map((crypto) => {
                              return (
                                  <option key={crypto.id} value={crypto.id}>
                                      {crypto.name}
                                  </option>
                              );
                          })
                        : null}
                </select>
                {/* <select onChange={(e)=>{
                    setRange(parseInt(e.target.value)); // agar parseInt ro nazari error mide chun e.target.value string mide biroon age mikhay string e bashe value haye paeen ro string bede va useState vase range ro ham string bede  na number
                }}>
                          <option value={30}>30 Days</option>
                          <option value={7}>7 Days</option> 
                          <option value={1}>1 Day</option>
                </select> */}
            </div>
            
            {/* {selected ? <CryptoSummary crypto={selected} /> : null} */}
            {selected.map((s)=>{return <CryptoSummary crypto={s} updateOwned={updateOwned}/>}) } {/* farghesh ba khate bala ine ke alan chun array darim bayad map bezanim */ }


            {/* {data ?<div style={{width:600}}> <Line options={options} data={data} /> </div> : null} //data is gonna come from coins API but we harcode the options as a default value in the above state */}
            {selected? "Your portfolio is worth: $"+selected.map((s)=>{
                if(isNaN(s.owned)){
                    return 0;
                }
                return  s.current_price * s.owned;
            }).reduce((prev , current)=>{
                // console.log("prev-current",prev , current);
                return prev+current;
            },0).toLocaleString(undefined,{minimumFractionDigits: 2 , maximumFractionDigits: 2}) :null}
        </>
    );
}

export default App;
