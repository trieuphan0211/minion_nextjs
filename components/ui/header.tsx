import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import SigninButton from "../auth/signin-button";

const links = [
  {
    label: "Home",
    icon: "",
    url: "/",
    menu: [
      //   { label: "Home", icon: "", url: "/" },
      //   { label: "About", icon: "", url: "/about" },
    ],
  },
  {
    label: "Components",
    icon: "",
    url: null,
    menu: [
      {
        label: "Slider",
        icon: "",
        url: "/components/slider",
        description: "Many design options about slide",
      },
      {
        label: "button",
        icon: "",
        url: "/components/button",
        description: "Many design options about button",
      },
    ],
  },
];

export default function Header() {
  return (
    <header className="h-14 py-2 px-7">
      <nav className="flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <Image src={logo} alt="Logo Minion" className="h-12 w-auto" />
          </Link>
        </div>
        <div className="flex gap-8 items-center">
          {links.map((link, index) =>
            link.menu.length !== 0 ? (
              <div
                key={index}
                className="flex items-center relative group h-full"
              >
                <button className="flex items-center gap-2 font-semibold group-hover:text-yellow-500 cursor-pointer p-1 h-full">
                  {link.icon && <Image src={link.icon} alt={link.label} />}
                  {link.label}
                  <FaAngleDown className="group-hover:rotate-180 transition-all" />
                </button>
                <div
                  className="hidden absolute top-8 -left-24 z-10 w-screen max-w-md overflow-hidden rounded-3xl 
                bg-white shadow-lg ring-1 ring-gray-900/5 group-hover:animate-show-menu group-hover:block"
                >
                  <div className="p-4">
                    {link.menu.map((item, index) => (
                      <div
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                        key={index}
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          {item.icon && (
                            <Image
                              className="h-6 w-6 text-gray-600 group-hover:text-yellow-600"
                              src={item.icon}
                              alt={item.label}
                            />
                          )}
                        </div>
                        <div className="flex-auto">
                          <Link
                            href={item.url}
                            className="block font-semibold text-gray-900"
                          >
                            {item.label}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50"></div>
              </div>
            ) : (
              <Link
                href={link.url || "/"}
                className="flex items-center gap-2 font-semibold hover:text-yellow-500 "
                key={index}
              >
                {link.icon && <Image src={link.icon} alt={link.label} />}
                {link.label}
              </Link>
            )
          )}
        </div>

        <SigninButton>
          <button className="flex items-center font-bold gap-1 hover:text-green-600 group">
            Login
            <RiLoginCircleLine className="group-hover:translate-x-1 transition-all" />
          </button>
        </SigninButton>
      </nav>
    </header>
  );
}
