import { useEffect, useState } from 'react';
import { Crypto } from '../Types';

export type AppProps = {
    crypto: Crypto;
    updateOwned: (crypto: Crypto , amount: number) => void // to say we expect a function - deghat kun age alan dar App.tsx dar paeen dar ghesmate .map updateOwned ro pass down nakuni error mide chun inja expectesh kardim --> age mikhay optional bashe va error nade dar App.tsx bayad updateOwned? : (crypto...) benvisi va dar paeen ham ke updateOwned ro seda mizani ternary bezari ke age omad on khat code run beshe va age nayomad null run beshe
};

export default function CryptoSummary({ crypto , updateOwned }: AppProps) {

    useEffect(()=>{
        console.log(crypto.name , amount , crypto.current_price *amount);  // sibling component useEffects don't see each others! like for example 2 cryptos useEffect don't see each other 10:51:50
    }); // no dependency array to update for any state change

    const [amount , setAmount] = useState<number>(0); //because the inputs are type string --> but you can use number to but you have to use parseInt like App.tsx --> default '0' ro nazari parseFloat e bala error mide
    return (
    <div>
        <span>{crypto.name + ' $' + crypto.current_price}</span>
        <input type="number" style={{margin:10}} value={amount} onChange={(e)=>{
            setAmount(parseFloat(e.target.value));
            updateOwned(crypto , parseFloat(e.target.value));
            }}></input> {/* vaghti minvisi type="number" dg toye UI nemitooni char bezari vali e ghabool mishe chun e adade neper hast - zeman jaye parseFloat mitoni az Number ham use kuni*/ }
        <p> {isNaN(amount) ? "$0.00" :  "$"+(crypto.current_price * amount).toLocaleString(undefined , {minimumFractionDigits: 2 , maximumFractionDigits: 2})} </p>
        {/* isNan  bala bekhatere  ine ke age toye input hichi age nazari nan neshoon nade */}
    </div>
    ); //deghat kun name ro agar namee benvisi type script error mide ke khoobe yani property ee ke vojod nadare ro error mide
}
