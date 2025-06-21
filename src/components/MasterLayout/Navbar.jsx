import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

gsap.registerPlugin(useGSAP);
export default function Navbar() {
  const navWrappers = useRef([]);
  const links = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: "pi-home",
    },

    {
      name: "Projects",
      link: "/projects",
      icon: "pi-chart-pie",
    },
  ];

  const animateNavLink = (index, expand) => {
    let el = navWrappers.current[index];
    gsap.to(el, {
      width: expand ? "70%" : 0,
      backgroundColor: "#9f67ff",
      duration: 0.2,
      ease: "power2",
    });
  };

  return (
    <nav className="">
      {/* 🚨 Mobile screen  */}
      <section className=" [ lg:hidden absolute bottom-10 w-[90%] left-[50%] translate-x-[-50%] rounded-full  bg-[#2C2C2C] ] z-50 ">
        <section className="flex justify-between items-center  px-8  h-14">
          {links.map((item) => {
            return (
              <NavLink
                to={item.name}
                key={item.name}
                className={({ isActive }) =>
                  isActive ? "text-secondary" : "text-white"
                }
              >
                <div className=" ">
                  <i className={`pi ${item.icon} text-2xl h-full    `}></i>
                </div>
              </NavLink>
            );
          })}
        </section>
      </section>

      {/* 🚨 Large screen  */}
      <section className="[ lg:flex hidden ] justify-between ">
        <h1>LOGO</h1>

        <div className="uppercase flex gap-x-8 items-center">
          {links.map((navItems, index) => {
            const { name, link } = navItems;
            return (
              <div
                key={name}
                className="relative"
                onMouseEnter={() => animateNavLink(index, true)}
                onMouseLeave={() => animateNavLink(index, false)}
              >
                <NavLink
                  to={link}
                  className={({ isActive }) =>
                    isActive ? "font-semibold text-white" : "text-gray-400"
                  }
                >
                  <div
                    ref={(el) => (navWrappers.current[index] = el)}
                    className="right-[-10px] top-[-4px] h-full absolute w-0 z-[-1] py-4"
                  ></div>

                  <p className="font-medium">{name}</p>
                </NavLink>
              </div>
            );
          })}
        </div>

        <div>Logout</div>
      </section>
    </nav>
  );
}
