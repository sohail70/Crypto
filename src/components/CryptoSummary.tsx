import { Crypto } from '../Types';

export type AppProps = {
    crypto: Crypto;
};

export default function CryptoSummary({ crypto }: AppProps) {
    return <p>{crypto.name + ' $' + crypto.current_price}</p>; //deghat kun name ro agar namee benvisi type script error mide ke khoobe yani property ee ke vojod nadare ro error mide
}
