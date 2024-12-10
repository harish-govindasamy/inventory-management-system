import React from "react";
import { Link, NavLink } from "react-router-dom";

import { FaBlog, FaSleigh } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";

import { LuShoppingBag } from "react-icons/lu";
import { MdCategory } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { BsCollectionFill } from "react-icons/bs";

import { FcAdvertising } from "react-icons/fc";
import { RiCoupon2Fill } from "react-icons/ri";

import { IoIosSettings } from "react-icons/io";
import { FcRatings } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";
import { BiCart, BiLocationPlus, BiUser } from "react-icons/bi";
import LogoutButton from "./LogoutButton";

function SideNavbar() {
  const quickLinks = {
    title: "QUICK LINKS",
    links: [
      { link: "", name: "Dashboard", icon: <IoMdHome />, end: true },
      {
        link: "/products/new",
        name: "New Product",
        icon: <AiFillProduct />,
        end: true,
      },
      {
        link: "/brands/new",
        name: "New Brand",
        icon: <FaBlog />,
        end: true,
      },
      {
        link: "/locations/new",
        name: "New Location",
        icon: <BiLocationPlus />,
        end: true,
      },
    ],
  };
  const catalogLinks = {
    title: "CATALOG",
    links: [
      {
        link: "/products",
        name: "Products",
        icon: <LuShoppingBag />,
        end: false,
      },
      { link: "/brands", name: "Brands", icon: <SiBrandfolder />, end: false },
      {
        link: "/locations",
        name: "Locations",
        icon: <BiLocationPlus />,
        end: false,
      },
      { link: "/users", name: "User Management", icon: <BiUser />, end: false },
    ],
  };

  const links = [quickLinks, catalogLinks];
  return (
    <div className="h-full flex flex-col pr-1 overflow-y-scroll  scrollbar scroll-smooth ">
      {links.map((link, index) => (
        <div key={index} className="my-4">
          <h3 className="px-4 text-sm font-semibold text-slate-700">
            {link.title}
          </h3>
          <div className="flex flex-col flex-grow gap-1 mt-2">
            {link.links.map((_link, idx) => (
              <NavLink
                end={_link.end}
                key={idx}
                to={_link.link}
                className={(prop) =>
                  `${
                    prop.isActive
                      ? "text-teal-600 border-l-4 border-l-teal-600 rounded-sm bg-slate-50"
                      : "hover:bg-slate-50 hover:text-teal-800"
                  } pl-6 py-2 font-semibold text-slate-700 flex items-center gap-3`
                }
              >
                {_link.icon}
                <span>{_link.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}

      <LogoutButton />
    </div>
  );
}

export default SideNavbar;

{
  /* <div className="align-bottom left-0 w-full bottom-0">
          <Link
            to=""
            className={
              " pl-6 py-2 font-semibold text-slate-700 flex items-center gap-3 bg-white "
            }
          >
            <IoIosSettings />
            <span>Settings</span>
          </Link>
        </div>
      </div> */
}
