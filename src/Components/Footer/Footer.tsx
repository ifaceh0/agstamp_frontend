// import { Link } from "react-router-dom";

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-blue-500 text-white py-4 w-full mt-auto">
//       <div className="flex flex-wrap flex-col sm:flex-row justify-center sm:justify-between items-center px-4 sm:px-6 mx-auto space-y-3 sm:space-y-0">
//         <div className="flex items-center space-x-4 text-[#11295a] font-extrabold">
//           <Link to="/" className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-full text-base border-2 border-black cursor-pointer">
//             AG
//           </Link>
//           <Link to="/" className="text-sm sm:text-base md:text-lg lg:text-xl">
//             AG Stamp
//           </Link>
//         </div>
        
//         <p className="text-xs sm:text-sm md:text-base lg:text-lg font-light text-center sm:text-left">&copy; 2007 AG STAMP. All rights reserved.</p>
        
//         <div className="flex space-x-4">
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="h-8 w-8 sm:h-10 sm:w-10 hover:opacity-80" />
//           </a>
//           <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
//             <img 
//               src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
//               alt="Instagram" 
//               className="h-8 w-8 sm:h-10 sm:w-10 hover:opacity-80" 
//             />
//           </a>

//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//             <img src="data:image/png;base64,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" alt="Twitter" className="h-8 w-8 sm:h-10 sm:w-10 hover:opacity-80" />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import { dealer1, dealer2 } from "../../assets/image";


// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-white text-red-900 py-4 w-full mt-auto">
//       <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 mx-auto">
        
//         {/* Left-aligned content: Image + Paragraph + Image */}
//         <div className="w-full flex justify-center md:justify-center items-center gap-10 md:gap-16">
//             {/* Image before text */}
//             <img 
//               src={dealer1} 
//               alt="dealer1"
//               className="h-16 w-20 md:h-24 md:w-32 object-contain"
//             />

//             {/* Paragraph */}
//             {/* <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light text-center md:text-left">
//               &copy; 2007 AG STAMP.<br className="md:hidden"/> All rights reserved.
//             </p> */}
//             <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-center sm:text-left ">
//                       &copy; 2025 AG STAMP.<br className="md:hidden"/> All rights reserved.
//                     </p>

//             {/* Image after text */}
//             <img 
//               src={dealer2} 
//               alt="dealer2"
//               className="h-16 w-24 md:h-28 md:w-40 object-contain"
//             />
//           </div>


//         {/* Right-aligned social icons */}
//         <div className="flex space-x-4">
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="h-8 w-8 sm:h-10 sm:w-10 hover:opacity-80" />
//           </a>
//           <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
//             <img 
//               src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
//               alt="Instagram" 
//               className="h-8 w-8 sm:h-10 sm:w-10 hover:opacity-80" 
//             />
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//            <img src="data:image/png;base64,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" alt="Twitter" className="h-8 w-8 sm:h-10 sm:w-10 hover:opacity-80" />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { dealer1, dealer2 } from "../../assets/image";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-white text-black py-4 w-full mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 mx-auto">
        
        {/* Left-aligned content: Image + Paragraph + Image */}
        <div className="w-full flex justify-center md:justify-center items-center gap-10 md:gap-16">
            {/* Image before text */}
            <img 
              src={dealer1} 
              alt="dealer1"
              className="h-16 w-20 md:h-24 md:w-32 object-contain"
            />

            {/* Paragraph */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-center sm:text-left ">
              &copy; {currentYear} AG STAMP.<br className="md:hidden"/> All rights reserved.
            </p>

            {/* Image after text */}
            <img 
              src={dealer2} 
              alt="dealer2"
              className="h-16 w-24 md:h-28 md:w-40 object-contain"
            />
        </div>

        {/* Right-aligned social icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="h-8 w-8 sm:h-10 sm:w-10 hover:opacity-80" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
              alt="Instagram" 
              className="h-8 w-8 sm:h-10 sm:w-10 hover:opacity-80" 
            />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="data:image/png;base64,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" alt="Twitter" className="h-8 w-8 sm:h-10 sm:w-10 hover:opacity-80" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

