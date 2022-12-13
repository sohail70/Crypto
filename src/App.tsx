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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
    //Tell the useState what type to expect - deghat kun useState default esh be undefined hast pas benvis null to parantez onvaght age ternary paeen dar cryptos? ro nazari typescript mige object is possibly null ama age null ro nazari typescript mige possibly null or undefined
    const [cryptos, setCryptos] = useState<Crypto[] | null>(null); // to say that Crypto is the type and [] to say that its an array. null ham gozashtim ta begim agar chzi return nashod null hast-->in va export type Crypto bala ro nazari nemitoni .map bezani ro crypto
    const [selected, setSelected] = useState<Crypto | null>(); //null bezari to deafult value khate setSelecte(c) eror mide
    const [data, setData] = useState<ChartData<'line'>>(); //jaye line mitoni har chi dost dari bezari
    const [options, setOptions] = useState<ChartOptions<'line'>>({
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            }
        }
    });
    useEffect(() => {
        const url =
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'; // Type infer mishe be string!
        axios.get(url).then((response) => {
            // console.log(response.data); // no need for the second then and no need for return response.json and we can use response.data
            setCryptos(response.data);
        });
    }, []); // Execute once on startup
    return (
        <>
            <div className="App">
                <select
                    onChange={(e) => {
                        // console.log(e.target.value); //value hamooni hast ke dar tag e option gozashti --> alabte age value ro nazari chi? tebghe site https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select dar paragraph ghabl az section attributes gofte ke ke age value nazari default text e ke toye tag hast mire dakhele value dar e.target.value yani crypto.name e ke content tag option hast mire toye e.target.value
                        const c = cryptos?.find((x) => x.id === e.target.value); // To get the object of the thing that you selected in the dropp down --> from id to the object
                        // console.log(c);
                        setSelected(c);
                        axios
                            .get(
                                `https://api.coingecko.com/api/v3/coins/${c?.id}/market_chart?vs_currency=usd&days=30&interval=daily`
                            )
                            .then((response) => {
                                console.log(response.data); //agar dar conslode check kuni mibin ye object mide ke tosh ye prices array hast ke har elementesh do ta value timestamp a price ro dare
                                setData({ // content in json ro az https://react-chartjs-2.js.org/examples/line-chart gereftim 
                                    labels: response.data.prices.map((price: number[])=>{
                                        return price[0];
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
                            });
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
            </div>
            {selected ? <CryptoSummary crypto={selected} /> : null}
            {data ?<div style={{width:600}}> <Line options={options} data={data} /> </div> : null} {/* data is gonna come from coins API but we harcode the options as a default value in the above state */}
            
        </>
    );
}

export default App;
