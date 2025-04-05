import { ShoppingCartIcon } from "@heroicons/react/24/outline"; 
import NavLink from "./navLink";
import { auth } from "@/utils/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth(); 

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cart", path: "/cart" },
    { name: <ShoppingCartIcon className="w-6 h-6" />, path: "/cart" },
    { name: "Profile", path: "/profile" },
  ];

  const nav = [...navItems];
  if (session?.user) nav.push({ name: "Logout", path: "/logout" });
  if (!session?.user) nav.push({ name: "Login", path: "/login" });

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        {nav.map(({ name, path }) => (
          <li key={name}>
            <NavLink name={name} path={path} />
          </li>
        ))}
        {session?.user?.image && (
          <li>
            <Image src={session.user.image} alt="User Image" width={100} height={100}  className=" w-10 h-10 rounded-full" />
          </li>
        )}
      </ul>
    </nav>
  );
}
