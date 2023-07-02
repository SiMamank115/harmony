import Navbar from "./navbar";
import { Raleway } from 'next/font/google'
const raleway = Raleway({ subsets: ['latin'] })
export default function Layout({ children }) {
    return (
        <main className={raleway.className}>
            <Navbar />
            <div className="container mx-auto">{children}</div>
        </main>
    );
}
