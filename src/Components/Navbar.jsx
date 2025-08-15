// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const location = useLocation();

//   const linkClasses = (path) =>
//     location.pathname === path
//       ? "text-white font-semibold underline"
//       : "text-white hover:underline";

//   return (
//     <nav className="bg-blue-600 text-white p-4 fixed top-0 w-full shadow z-50">
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
//         <h1 className="text-xl font-bold">Shreenath Drone</h1>
//         <div className="flex flex-wrap justify-center gap-4 md:gap-6">
//           <Link to="/" className={`${linkClasses("/")} text-sm md:text-base`}>
//             Dashboard
//           </Link>
//           <Link to="/entries" className={`${linkClasses("/entries")} text-sm md:text-base`}>
//             Logs
//           </Link>
//           <Link to="/add" className={`${linkClasses("/add")} text-sm md:text-base`}>
//             Add Entry
//           </Link>
//           <Link to="/analytics" className={`${linkClasses("/analytics")} text-sm md:text-base`}>
//             Analytics
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;