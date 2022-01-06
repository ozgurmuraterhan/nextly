import Link from 'next/link';


const Defaut = () => {

    return (

        <>
            <Link href="/profile"><a className="w-full py-3 border-b float-left hover:pl-1  transform-all">Profile</a></Link>
            <Link href="/profile/address"><a className="w-full py-3 border-b float-left hover:pl-1  transform-all">Addreses</a></Link>
            <Link href="/profile/orders"><a className="w-full py-3 border-b float-left hover:pl-1  transform-all">Orders</a></Link></>

    );
}

export default Defaut;
