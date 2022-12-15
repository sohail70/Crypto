import { useEffect, useState } from 'react';
import { Crypto } from '../Types';

export type AppProps = {
    crypto: Crypto;
};

export default function CryptoSummary({ crypto }: AppProps) {

    useEffect(()=>{
        console.log(crypto.name , amount , crypto.current_price * parseFloat(amount));  // sibling component useEffects don't see each others! like for example 2 cryptos useEffect don't see each other 10:51:50
    }); // no dependency array to update for any state change

    const [amount , setAmount] = useState<string>('0'); //because the inputs are type string --> but you can use number to but you have to use parseInt like App.tsx --> default '0' ro nazari parseFloat e bala error mide
    return (
    <div>
        <span>{crypto.name + ' $' + crypto.current_price}</span>
        <input type="number" style={{margin:10}} value={amount} onChange={(e)=>{setAmount(e.target.value)}}></input> {/* vaghti minvisi type="number" dg toye UI nemitooni char bezari vali e ghabool mishe chun e adade neper hast*/ }
        <p>${(crypto.current_price * parseFloat(amount)).toLocaleString(undefined , {minimumFractionDigits: 2 , maximumFractionDigits: 2})}</p>
    </div>
    ); //deghat kun name ro agar namee benvisi type script error mide ke khoobe yani property ee ke vojod nadare ro error mide
}
