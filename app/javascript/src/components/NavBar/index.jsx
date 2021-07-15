import React from "react";
import NavItem from "./NavItem";
import authApi from "apis/auth";
import { resetAuthTokens } from "src/apis/axios.js";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";

const NavBar = () => {
  const userName = getFromLocalStorage("authUserFirstName");
  // logger.info(userName);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userFirstName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="flex">
              <NavItem name="Polls" path="/" />
              <NavItem
                name="Create"
                iconClass="ri-add-fill"
                path="/polls/create"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <span
              className="inline-flex items-center px-5 pt-1 text-sm font-regular leading-5 text-bb-gray-600
              text-opacity-50 transition duration-150 ease-in-out border-b-2 border-transparent focus:outline-none
              focus:text-bb-gray-700"
            >
              {userName},
            </span>
            <a
              onClick={handleLogout}
              className="inline-flex items-center px-1 pt-1 text-sm
             font-semibold leading-5 text-bb-gray-600 text-opacity-50
             transition duration-150 ease-in-out border-b-2
             border-transparent hover:text-bb-gray-600 focus:outline-none
              focus:text-bb-gray-700 cursor-pointer"
            >
              LogOut
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

// import React from "react";
// import NavItem from "./NavItem";
// import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";
// import authApi from "apis/auth";
// import { resetAuthTokens } from "apis/axios";
// import { Link } from "react-router-dom";

// const NavBar = ({ isLoggedIn }) => {
//   const userName = getFromLocalStorage("authUserFirstName");

//   const handleLogout = async () => {
//     try {
//       await authApi.logout();
//       setToLocalStorage({
//         authToken: null,
//         email: null,
//         userId: null,
//         userFirstName: null,
//       });
//       resetAuthTokens();
//       window.location.href = "/";
//     } catch (error) {
//       logger.error(error);
//     }
//   };

//   return (
//     <nav className="bg-white shadow">
//       <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex px-2 lg:px-0">
//             <div className="hidden lg:flex">
//               <NavItem name="Polls" path="/" />
//               {isLoggedIn ? (
//                 <NavItem
//                   name="Create"
//                   iconClass="ri-add-fill"
//                   path="/polls/create"
//                 />
//               ) : (
//                 ""
//               )}
//             </div>
//           </div>
//           <div className="flex items-center justify-end gap-x-4">
//             <span
//               className="inline-flex items-center px-15 pt-1 text-lg font-bold leading-5 text-bb-gray-600
//               text-opacity-100 transition duration-150 ease-in-out border-b-2 border-transparent focus:outline-none
//               focus:text-bb-gray-700"
//             >
//               POLLY
//             </span>
//           </div>
//           <div className="flex items-center justify-end">
//             {isLoggedIn ? (
//               <>
//                 <a
//                   onClick={handleLogout}
//                   className="inline-flex items-center px-1 pt-1 text-sm
//          font-semibold leading-5 text-bb-gray-600 text-opacity-50
//          transition duration-150 ease-in-out border-b-2
//          border-transparent hover:text-bb-gray-600 focus:outline-none
//           focus:text-bb-gray-700 cursor-pointer"
//                 >
//                   LogOut
//                 </a>
//                 <span
//                   className="inline-flex items-center px-1 pt-1 text-sm
//          font-semibold leading-5 text-bb-gray-600 text-opacity-50
//          transition duration-150 ease-in-out border-b-2
//          border-transparent hover:text-bb-gray-600 focus:outline-none
//           focus:text-bb-gray-700 cursor-pointer"
//                 >
//                   {userName}
//                 </span>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 className="inline-flex items-center px-1 pt-1 text-sm
//          font-semibold leading-5 text-bb-gray-600 text-opacity-50
//          transition duration-150 ease-in-out border-b-2
//          border-transparent hover:text-bb-gray-600 focus:outline-none
//           focus:text-bb-gray-700 cursor-pointer"
//               >
//                 LogIn
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

// // import React from "react";
// // import NavItem from "./NavItem";

// // const NavBar = () => {
// //   return (
// //     <nav className="bg-white shadow">
// //       <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
// //         <div className="flex justify-between h-16">
// //           <div className="flex px-2 lg:px-0">
// //             <div className="hidden lg:flex">
// //               <NavItem name="Polls" path="/dashboard" />
// //               <NavItem
// //                 name="Create"
// //                 iconClass="ri-add-fill"
// //                 path="/polls/create"
// //               />
// //             </div>
// //           </div>
// //           <div className="flex items-center justify-end">
// //             <a
// //               className="inline-flex items-center px-1 pt-1 text-sm
// //              font-semibold leading-5 text-bb-gray-600 text-opacity-50
// //              transition duration-150 ease-in-out border-b-2
// //              border-transparent hover:text-bb-gray-600 focus:outline-none
// //              focus:text-bb-gray-700 cursor-pointer"
// //             >
// //               LogOut
// //             </a>
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default NavBar;
