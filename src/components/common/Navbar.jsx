import { Link, matchPath, useLocation } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { useEffect, useState } from 'react';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { IoIosArrowDown } from 'react-icons/io';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector('GET', categories.CATEGORIES_API);
      setSubLinks(result.data.data);
      // console.log('printing sublinks : ', result.data.data);
    } catch (error) {
      console.log('Could not fetch catalog list');
    }
  };
  useEffect(() => {
    console.log('printing token ', token);
    fetchSubLinks();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="w-11/12 flex max-w-maxContent items-center justify-between">
        <Link to="/">
          <img
            src={Logo}
            alt="StudyNotion Logo"
            width={160}
            height={42}
            loading="lazy"
          />
        </Link>
        {/* navigation links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === 'Catalog' ? (
                  <div className="relative flex items-center gap-1 cursor-pointer group">
                    <p>{link.title}</p>
                    <IoIosArrowDown />

                    <div className="invisible absolute translate-x-[-50%] top-[150%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 z-[1000] group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute right-[20%] top-[-10%] h-6 w-6 rotate-45 rounded bg-richblack-5"></div>
                      {subLinks.length ? (
                        <div>
                          {subLinks.map((sublink, ind) => (
                            <Link
                              to={sublink.name}
                              key={ind}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            >
                              <p>{sublink.name}</p>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? 'text-yellow-25'
                          : 'text-richblack-25'
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login-signup-dashboard */}

        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log In
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]  text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
