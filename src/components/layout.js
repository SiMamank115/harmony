import Footer from "./footer";
import Navbar from "./navbar";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  fallback:"serif",
  display:"swap"
});
export default function Layout({ children, option }) {
  return (
    <main className={poppins.className}>
      <Navbar {...(option?.navbar ?? "")} />
      {children}
      <Footer {...(option?.footer ?? "")} />
    </main>
  );
}
