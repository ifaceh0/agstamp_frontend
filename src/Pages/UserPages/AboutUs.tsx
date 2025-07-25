// import React from "react";
// import { useNavigate } from "react-router-dom";

// const AboutUs: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-blue-500 min-h-screen flex flex-col items-center justify-start pt-10 -mt-10">
//       <div className="max-w-5xl bg-blue-500 rounded-2xl p-6">
//         <h1 className="text-3xl font-bold text-center text-red-300 mb-4">
//           About Us
//         </h1>

//         <p className="text-lg text-white leading-relaxed text-center mb-4">
//           With over 40 years of experience as a dedicated collector of Russian
//           stamps and more than 25 years as a professional dealer, I’ve built a
//           reputation rooted in passion, knowledge, and trust. We specialize in
//           Russian philately, including the broader Russian Area, but we are also
//           happy to assist with material from other countries upon request.
//         </p>
//         <p className="text-lg text-white leading-relaxed text-center mb-4">
//           AG STAMP is a dealer member of the American Philatelic Society (APS),
//           the International Federation of Stamp Dealers Associations (IFSDA),
//           the National Stamp Dealer Association (NSDA), and the American
//           Philatelic Expertizing Service (APEX). We hold monthly sales on eBay –
//           follow the link here – where you’ll find a carefully selected offering
//           of both common and rare Russian stamps.
//         </p>
//         <p className="text-lg text-white leading-relaxed text-center mb-4">
//           Our inventory includes an extensive stock of Russian material, and we
//           welcome want lists from collectors and dealers alike. If you're
//           looking for something specific, don’t hesitate to reach out.
//         </p>
//         <p className="text-lg text-white leading-relaxed text-center mb-4">
//           We invite you to subscribe to our mailing list subscribe here to
//           receive updates on upcoming eBay sales and occasional announcements
//           when especially rare or noteworthy items become available. We promise
//           not to clutter your inbox – only sending emails when there’s something
//           truly worth sharing.
//         </p>
//         <p className="text-lg text-white leading-relaxed text-center mb-4">
//           Feel free to contact us with any philatelic questions, whether you're
//           seeking expert advice, looking for specific items, or considering
//           selling your collection. We’re happy to offer appraisals or make a
//           cash offer if you’re interested in selling. Also, see our
//           advertisement in Scott and Scott Specialized catalogs.
//         </p>

//         {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
//             <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
//             <p className="text-gray-700 mt-2">
//               We aim to connect collectors, historians, and enthusiasts by providing valuable resources, expert insights, 
//               and a platform to explore and appreciate rare and significant postal items.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
//             <h2 className="text-2xl font-semibold text-gray-900">Why Choose Us?</h2>
//             <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2 text-left">
//               <li>Curated collections of rare and historical stamps.</li>
//               <li>Detailed research and insights on postal history.</li>
//               <li>A vibrant community for philatelists worldwide.</li>
//               <li>Authenticity and trust in every item we showcase.</li>
//             </ul>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
//             <h2 className="text-2xl font-semibold text-gray-900">Join Our Community</h2>
//             <p className="text-gray-700 mt-2">
//               Whether you're a seasoned collector or just beginning your journey, we invite you to explore, learn, and 
//               share your passion for stamps and postal history with us.
//             </p>
//           </div>
//         </div> */}

//         <div className="mt-6 text-center">
//           <button
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
//             onClick={() => navigate("/contact-us")}
//           >
//             Get in Touch
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCertificate, FaHandshake, FaEnvelopeOpenText, FaHistory } from "react-icons/fa";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-start pt-16 px-4 pb-10">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-24 h-24 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>

      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border border-white/20 z-10">
        {/* Header with decorative stamp icon */}
        <div className="flex flex-col items-center mb-8">
          {/* <div className="bg-blue-600 p-4 rounded-full mb-4">
            <FaStamp className="text-white text-4xl" />
          </div> */}
          <h1 className="text-4xl font-bold text-center text-yellow-300 mb-2 font-serif">
            About AG Stamp
          </h1>
          <div className="w-24 h-1 bg-yellow-400 rounded-full"></div>
        </div>

        {/* Content sections */}
        <div className="space-y-8">
          <Section
            icon={<FaHistory className="text-yellow-300 text-xl" />}
            title="Our Heritage"
          >
            <p className="text-white/90 leading-relaxed">
              With over <span className="font-bold text-yellow-300">40 years</span> of experience as a dedicated collector
              of Russian stamps and more than <span className="font-bold text-yellow-300">25 years</span> as a professional dealer,
              we've built a reputation rooted in passion, knowledge, and trust.
            </p>
          </Section>

          <Section
            icon={<FaCertificate className="text-yellow-300 text-xl" />}
            title="Our Expertise"
          >
            <p className="text-white/90 leading-relaxed">
              We specialize in Russian philately, including the broader Russian Area, but are also
              happy to assist with material from other countries upon request. AG STAMP is a dealer
              member of prestigious organizations:
            </p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {["American Philatelic Society (APS)", "International Federation of Stamp Dealers (IFSDA)",
                "National Stamp Dealer Association (NSDA)", "American Philatelic Expertizing (APEX)"]
                .map((org, i) => (
                <div key={i} className="bg-blue-800/40 p-3 rounded-lg text-center">
                  <span className="text-white/90 text-sm">{org}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section
            icon={<FaHandshake className="text-yellow-300 text-xl" />}
            title="Our Offerings"
          >
            <div className="space-y-4">
              <FeatureItem
                title="Monthly eBay Sales"
                description="We hold monthly sales featuring carefully selected offerings of both common and rare Russian stamps."
              />
              <FeatureItem
                title="Extensive Inventory"
                description="Our inventory includes an extensive stock of Russian material, and we welcome want lists from collectors and dealers alike."
              />
              <FeatureItem
                title="Expert Appraisals"
                description="We offer professional appraisals and cash offers for those interested in selling their collections."
              />
            </div>
          </Section>

          <Section
            icon={<FaEnvelopeOpenText className="text-yellow-300 text-xl" />}
            title="Stay Connected"
          >
            <p className="text-white/90 leading-relaxed">
              Subscribe to our mailing list to receive updates on upcoming sales and announcements
              when especially rare items become available. We respect your inbox and only send
              emails when there's something truly worth sharing.
            </p>
            <div className="mt-4">
              <button
                // onClick={() => navigate("/")}
                onClick={() => navigate("/", { state: { scrollToSubscribe: true } })}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold py-2 px-6 rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg"
              >
                Subscribe Now
              </button>
            </div>
          </Section>
        </div>

        {/* CTA Section */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center">
          <p className="text-white/80 mb-6 italic">
            "Feel free to contact us with any philatelic questions - whether you're seeking expert advice,
            looking for specific items, or considering selling your collection."
          </p>
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-xl hover:from-blue-400 hover:to-blue-500 transition-all transform hover:scale-105"
            onClick={() => navigate("/contact-us")}
          >
            Get in Touch
          </button>
          <p className="mt-4 text-white/70 text-sm">
            Also see our advertisements in Scott and Scott Specialized catalogs
          </p>
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({
  icon, title, children
}) => (
  <div className="bg-blue-800/20 p-6 rounded-xl border border-blue-700/30">
    <div className="flex items-center mb-4">
      <div className="bg-blue-700 p-2 rounded-full mr-3">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    {children}
  </div>
);

// Reusable Feature Item Component
const FeatureItem: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="flex">
    <div className="mr-3 mt-1">
      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
    </div>
    <div>
      <h3 className="font-semibold text-yellow-300">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  </div>
);

export default AboutUs;