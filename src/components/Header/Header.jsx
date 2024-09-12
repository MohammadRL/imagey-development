import React, { useRef } from "react";
import Container from "../Container";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import menuIcon from "../../assets/burger-menu.png";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const menu = useRef(null);
  const navItems = [
    {
      name: "Home",
      slug: "/imagey",
      active: true,
    },
    {
      name: "Login",
      slug: "/imagey/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/imagey/signup",
      active: !authStatus,
    },
    {
      name: "Browse Images",
      slug: "/imagey/browse-images",
      active: authStatus,
    },
    {
      name: "Image Center",
      slug: "/imagey/image-center",
      active: authStatus,
    },
  ];
  const menuClick = () => {
    menu.current.classList.toggle("hidden");
  };
  return (
    <header className="py-3 shadow  bg-[#000000de] fixed top-0 z-50 w-full border-b-2 border-black">
      <Container>
        <nav className="flex relative">
          <div className="mr-4">
            <Link to="/imagey/">
              <Logo />
            </Link>
          </div>
          <div
            className="w-[40px] h-[40px] ml-auto block md:hidden cursor-pointer"
            onClick={menuClick}
          >
            <img src={menuIcon} alt="" className="w-full" />
          </div>
          <ul
            className="hidden absolute top-full right-1 text-center bg-black md:static md:flex md:ml-auto  "
            ref={menu}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      menu.current.classList.toggle("hidden");
                      navigate(item.slug);
                    }}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-[#161616] rounded-full text-slate-50"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
