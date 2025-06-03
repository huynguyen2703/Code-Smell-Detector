import "../globals.css";
import NavBar from "./components/navbar";

export const metadata = {
  title: "AutoSmellsLab",
  description: "Analyze and Refactor Code Smells",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gradient-to-r from-[#D10A50] to-[#402579]">
        <NavBar />
        {children} 
      </body>
    </html>
  );
}