// import React, { useState } from "react";
// import { img1, img2, img3, img4, img5, img6 } from "../assets/image"; // Import the top image
// import StampCarousel from "./StampCarousel";
// import WaveAnimation from "../Components/WaveAnimation/WaveAnimation";

// const Home: React.FC = () => {
//   const [email, setEmail] = useState("");
//   // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   const handleSubscribe = () => {
//     if (!email) {
//       alert("Please enter a valid email address!");
//       return;
//     }
//     alert(`Subscribed with: ${email}`);
//     setEmail(""); // Clear input field after subscribing
//   };

//   const stampCategories = [
//     { name: "Imperial Russia Stamps", image: img1 },
//     { name: "RSFSR Stamps", image: img2 },
//     { name: "USSR Stamps", image: img3 },
//     { name: "Zemstvo Stamps", image: img4 },
//     { name: "Postal History", image: img5 },
//   ];

//   return (
//     <div className="flex flex-col items-center w-full min-h-screen bg-blue-500 text-white text-center px-6 py-8">
//        {/* </div> <div className="relative w-full h-full overflow-hidden"> */}
//        <div className="relative w-full h-80 overflow-hidden">
//           <WaveAnimation imageUrl={img6} /> {/* Pass the local image URL */}
//         </div>
//       {/* Header Section */}
//       <header className="w-full flex flex-col items-center text-center mt-5">
//         <h1 className="text-4xl font-bold text-red-300">AG STAMP</h1>
//         <p className="text-lg font-medium mt-2">Specializing in philately of Russia & Area</p>
//       </header>

//       {/* Main Content */}
//       <main className="flex flex-col items-center w-full max-w-3xl mt-6 text-center">
//         <p className="text-lg font-medium">
//           We specialize in selling Russian stamps, including Imperial, RSFSR, USSR, Zemstvo stamps, and Postal History.
//           At AG STAMP, we are passionate about philately, specializing in the collection and sale of Russian stamps and postal history. Our inventory includes a wide range of stamps from different historical periods.
//         </p>

//         {/* eBay Sales Section */}
//         <h2 className="text-2xl font-bold text-red-300 mt-10">Our Sales Platform</h2>

//         <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-4">
//           {/* eBay Logo */}
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg"
//             alt="eBay Logo"
//             className="w-24 md:w-32"
//           />

//           {/* eBay Sales Announcement */}
//           <p className="text-lg text-center md:text-left">
//             Most of our sales take place on{" "}
//             <a
//               href="https://ebay.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-blue-700 border border-blue-400 rounded-lg px-3 py-1 text-yellow-300 font-bold inline-block"
//             >
//               eBay
//             </a>, where we organize two exclusive sales events every month. These sales feature carefully selected stamps and postal artifacts for collectors of all levels.
//           </p>
//         </div>

//         <p className="mt-2">
//           Follow our{" "}
//           <a
//             href="https://ebay.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-blue-700 border border-blue-400 rounded-lg px-3 py-1 text-yellow-300 font-bold inline-block"
//           >
//             eBay link
//           </a>{" "}
//           to view current offerings.
//         </p>

//         <p className="mt-2">
//           For sale announcements, contact us via{" "}
//           <a
//             href="mailto:info@example.com"
//             className="bg-blue-700 border border-blue-400 rounded-lg px-3 py-1 text-yellow-300 underline inline-block"
//           >
//             email
//           </a>.
//         </p>
//       </main>

//       {/* Contact Section */}
//       <h2 className="text-2xl font-bold text-red-300 mt-10">Contact Us</h2>
//         <p className="text-lg font-medium max-w-3xl text-center px-4 mt-2">
//           For inquiries, sales announcements, or specific stamp requests, feel free to reach out to us via{" "}
//           <a
//             href="/contact-us"
//             className="bg-blue-700 border border-blue-400 rounded-lg px-3 py-1 text-yellow-300 font-bold inline-block"
//           >
//             Contact Us
//           </a>. We are always happy to assist fellow collectors!
//         </p>

//       {/* Stamp Categories Section */}
//       <h2 className="text-2xl font-bold text-red-300 mt-10">Displaying Different Stamp Categories</h2>
//       {/* <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4 px-4">
//         {stampCategories.map((stamp, index) => (
//           <div
//             key={index}
//             className={`bg-blue-700 rounded-lg shadow-lg overflow-hidden text-center p-4 transition-transform duration-300 ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}
//             onMouseEnter={() => setHoveredIndex(index)}
//             onMouseLeave={() => setHoveredIndex(null)}
//           >
//             <img src={stamp.image} alt={stamp.name} className="w-full h-40 object-cover rounded-md" />
//             <h3 className="text-lg font-semibold mt-3">{stamp.name}</h3>
//           </div>
//         ))}
//       </div> */}
//       {/* Caresoul*/}
//       {/* <h2 className="text-2xl font-bold text-red-300 mt-10">Option-2</h2> */}
//       <div className="w-full px-[10%] text-sm">
//       <StampCarousel stampCategories={stampCategories} />
//       </div>

//       {/* Subscription Section */}
//       <div className="mt-16 flex flex-col md:flex-row items-center bg-blue-800 py-3 rounded-xl justify-center lg:justify-around w-full gap-4 px-4">
//         {/* Subscription Text */}
//         <div className="text-sm md:text-lg lg:text-xl w-full lg:w-2/5 text-center font-medium text-gray-100 leading-normal">
//           Please <span className="text-blue-400">subscribe to our mailing list!</span>
//         </div>

//         {/* Input & Button */}
//         <div className="flex md:gap-4 bg-blue-900 px-4 py-3 items-center rounded-xl w-full lg:w-3/5 justify-between">
//           <input
//             className="bg-transparent text-gray-100 font-semibold lg:text-lg text-sm px-4 py-2 outline-none w-full placeholder-gray-300"
//             placeholder="Email@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button
//             className="rounded-lg lg:text-lg text-xs font-serif bg-gray-900 text-white px-6 py-3 cursor-pointer hover:bg-gray-700 transition"
//             onClick={handleSubscribe}
//           >
//             Subscribe
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



// import React, { useState } from "react";
// import StampCarousel from "./StampCarousel";
// // import WaveAnimation from "../../Components/WaveAnimation/WaveAnimation";
// import {
//   useGetWaveImgQuery,
//   useSubscribeMailServiceMutation,
// } from "../../Redux/Api/userApi";
// import { useGetAllCarouselsQuery } from "../../Redux/Api/adminApi";
// import { toast } from "react-toastify";

// const Home: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const { data } = useGetWaveImgQuery();
//   const { data: stampCategories } = useGetAllCarouselsQuery();
//   const [subscribeMailService] = useSubscribeMailServiceMutation();

//   const handleSubscribe = async () => {
//     if (!email) {
//       alert("Please enter a valid email address!");
//       return;
//     }

//     try {
//       const res = await subscribeMailService({ email });
//       toast.success(res.data?.message);
//       setEmail("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center w-full min-h-screen bg-white text-black text-center px-6 py-8">
//       {/* WaveAnimation Section */}
//       {/* <div className="relative w-full overflow-hidden">
//         <WaveAnimation imageUrl={data?.wave[0].url as string} /> 
//       </div> */}
//      <div className="relative w-full overflow-hidden bg-gray-100 -mt-3.5">
//   <img
//     src={data?.wave[0].url as string}
//     alt="Wave"
//     className="w-full h-40 sm:h-60 md:h-80 lg:h-96 object-cover rounded-xl"
//   />
// </div>


//       {/* Header Section */}
//       <header className="w-full flex flex-col items-center text-center mt-5">
//         <h1 className="text-4xl font-bold text-blue-800">AG STAMP</h1>
//         <p className="text-lg font-medium mt-2">
//           Specializing in philately of Russia & Area
//         </p>
//       </header>

//       {/* Main Content */}
//       <main className="flex flex-col items-center w-full max-w-3xl mt-6 text-center">
//         <p className="text-lg font-medium">
//           We specialize in selling Russian stamps, including Imperial, RSFSR,
//           USSR, Zemstvo stamps, and Postal History. At AG STAMP, we are
//           passionate about philately, specializing in the collection and sale of
//           Russian stamps and postal history. Our inventory includes a wide range
//           of stamps from different historical periods.
//         </p>

//         {/* eBay Sales Section */}
//         <h2 className="text-2xl font-bold text-blue-800 mt-10">
//           Our Sales Platform
//         </h2>

//         <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-4">
//           {/* eBay Logo */}
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg"
//             alt="eBay Logo"
//             className="w-24 md:w-32"
//           />

//           {/* eBay Sales Announcement */}
//           <p className="text-lg text-center md:text-left font-medium">
//             Most of our sales take place on eBay
//             {/* Most of our sales take place on{" "} */}
//             {/* <a
//               href="https://ebay.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className=" rounded-lg px-3 py-1 text-black font-bold inline-block"
//             >
//               eBay
//             </a> */}
//             , where we organize two exclusive sales events every month. These
//             sales feature carefully selected stamps and postal artifacts for
//             collectors of all levels.
//           </p>
//         </div>

//         <p className="mt-2 font-medium">
//           Follow our{" "}
//           <a
//             href="https://www.ebay.com/sch/i.html?_ipg=300&_sop=1&rt=nc&_ssn=agstamp"
//             rel="noopener noreferrer"
//             className="text-black underline"
//           >
//             eBay link
//           </a>{" "}
//           to view current offerings.
//         </p>

//         <p className="mt-2 font-medium">
//           For sale announcements, contact us via{" "}
//           <a href="mailto:info@example.com" className="text-black underline">
//             email
//           </a>
//           .
//         </p>
//       </main>

//       {/* Contact Section */}
//       <h2 className="text-2xl font-bold text-blue-800 mt-10">Contact Us</h2>
//       <p className="text-lg font-medium max-w-3xl text-center px-4 mt-2">
//         For inquiries, sales announcements, or specific stamp requests, feel
//         free to reach out to us via{" "}
//         <a href="/contact-us" className="text-black underline">
//           Contact Us
//         </a>
//         . We are always happy to assist fellow collectors!
//       </p>

//       {/* Stamp Categories Section */}
//       <h2 className="text-2xl font-bold text-blue-800 mt-10">
//         Displaying Different Stamp Categories
//       </h2>
//       <div className="w-full px-[10%] text-sm">
//         <StampCarousel stampCategories={stampCategories?.Carousels!} />
//       </div>

//       {/* Subscription Section */}
//       <div className="mt-16 flex flex-col md:flex-row items-center bg-blue-800 py-3 rounded-xl justify-center lg:justify-around w-full gap-4 px-4">
//         {/* Subscription Text */}
//         <div className="text-sm md:text-lg lg:text-xl w-full lg:w-2/5 text-center font-medium text-gray-100 leading-normal">
//           Please{" "}
//           <span className="text-white">subscribe to our mailing list!</span>
//         </div>

//         {/* Input & Button */}
//         <div className="flex md:gap-4 bg-white px-4 py-3 items-center rounded-xl w-full lg:w-3/5 justify-between">
//           <input
//             className="bg-transparent font-semibold lg:text-lg text-sm px-4 py-2 outline-none w-full placeholder-black"
//             placeholder="Email@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button
//             className="rounded-lg text-sm md:text-base font-serif bg-blue-800 text-white cursor-pointer hover:bg-gray-700 transition px-3 py-1.5 whitespace-nowrap"
//             onClick={handleSubscribe}
//           >
//             Subscribe Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import StampCarousel from "./StampCarousel";
import {
  useGetWaveImgQuery,
  useSubscribeMailServiceMutation,
} from "../../Redux/Api/userApi";
import { useGetAllCarouselsQuery } from "../../Redux/Api/adminApi";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { data } = useGetWaveImgQuery();
  const { data: stampCategories } = useGetAllCarouselsQuery();
  const [subscribeMailService] = useSubscribeMailServiceMutation();

  const paragraphClass = "text-base text-gray-800 mt-2";

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter a valid email address!");
      return;
    }

    try {
      const res = await subscribeMailService({ email });
      toast.success(res.data?.message);
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white text-center px-6 py-8">
      {/* Wave Image */}
      <div className="relative w-full overflow-hidden bg-gray-100 -mt-3.5">
        <img
          src={data?.wave[0]?.url as string || "mfkdfmdc"}
          alt="Wave"
          className="w-full h-40 sm:h-60 md:h-80 lg:h-96 object-cover rounded-xl"
        />
      </div>

      {/* Header */}
      <header className="w-full flex flex-col items-center text-center mt-5">
        <h1 className="text-4xl font-bold text-blue-800">AG STAMP</h1>
        <p className={paragraphClass}>
          Specializing in philately of Russia & Area
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full max-w-3xl mt-6 text-center">
        <p className={paragraphClass}>
          We specialize in selling Russian stamps, including Imperial, RSFSR,
          USSR, Zemstvo stamps, and Postal History. At AG STAMP, we are
          passionate about philately, specializing in the collection and sale of
          Russian stamps and postal history. Our inventory includes a wide range
          of stamps from different historical periods.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10">
          Our Sales Platform
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg"
            alt="eBay Logo"
            className="w-24 md:w-32"
          />
          <p className={`${paragraphClass} text-center md:text-left`}>
            Most of our sales take place on eBay, where we organize One exclusive
            sales event every month. These sales feature carefully selected
            stamps and postal artifacts for collectors of all levels.
          </p>
        </div>

        <p className={paragraphClass}>
          Follow our{" "}
          <a
            href="https://www.ebay.com/sch/i.html?_ipg=300&_sop=1&rt=nc&_ssn=agstamp"
            rel="noopener noreferrer"
            className="underline"
          >
            eBay link
          </a>{" "}
          to view current offerings.
        </p>

        <p className={paragraphClass}>
          For sale announcements, contact us via{" "}
          <a href="mailto:info@example.com" className="underline">
            email
          </a>
          .
        </p>
      </main>

      {/* Contact Section */}
      <h2 className="text-2xl font-bold text-blue-800 mt-10">Contact Us</h2>
      <p className={`${paragraphClass} max-w-3xl text-center px-4`}>
        For inquiries, sales announcements, or specific stamp requests, feel free
        to reach out to us via{" "}
        <a href="/contact-us" className="underline">
          Contact Us
        </a>
        . We are always happy to assist fellow collectors!
      </p>

      {/* Stamp Categories */}
      {/* <h2 className="text-2xl font-bold text-blue-800 mt-10">
        Displaying Different Stamp Categories
      </h2> */}
      <div className="w-full px-[10%] text-sm">
        <StampCarousel stampCategories={stampCategories?.Carousels!} />
      </div>

      {/* Subscription Section */}
      <div className="mt-16 flex flex-col md:flex-row items-center bg-blue-800 py-3 rounded-xl justify-center lg:justify-around w-full gap-4 px-4">
        <div className="text-sm md:text-lg lg:text-xl w-full lg:w-2/5 text-center font-medium text-gray-100 leading-normal">
          Please <span className="text-white">subscribe to our mailing list!</span>
        </div>
        <div className="flex md:gap-4 bg-white px-4 py-3 items-center rounded-xl w-full lg:w-3/5 justify-between">
          <input
            className="bg-transparent font-semibold lg:text-lg text-sm px-4 py-2 outline-none w-full placeholder-black"
            placeholder="Email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="rounded-lg text-sm md:text-base font-serif bg-blue-800 text-white cursor-pointer hover:bg-gray-700 transition px-3 py-1.5 whitespace-nowrap"
            onClick={handleSubscribe}
          >
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Scroll to Top Button with Icon */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-20"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={18} />
        </button>
      )}
    </div>
  );
};

export default Home;

