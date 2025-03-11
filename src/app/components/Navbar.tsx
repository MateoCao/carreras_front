import { NavBarMain } from "./NavBarMain"

export const Navbar = () => {
    return (
       <nav className="flex flex-col gap-5 h-lvh p-5 bg-linear-to-b from-gray-900 to-red-600  text-white w-60">
        <h1 className="text-3xl text-center">TC 2000</h1>
           <NavBarMain />
       </nav> 
    )
}