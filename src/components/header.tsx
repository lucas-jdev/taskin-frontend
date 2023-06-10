import Link from "next/link";

export default function Header(){
    return (
        <nav className='bg-dark p-2'>
            <header className="container">
                <Link 
                  href={"/"}
                  className="h2 text-light text-decoration-none"
                >
                    Taskin
                </Link>
            </header>
        </nav>
    )
}