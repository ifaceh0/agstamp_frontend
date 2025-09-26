// import React, { useState } from "react";
// import ReCAPTCHA from 'react-google-recaptcha';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
// import { contactus } from "../../assets/image";

// const ContactUs: React.FC = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
//   const [loading, setLoading] = useState(false);
//   const [captchaValue, setCaptchaValue] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCaptchaChange = (value: string | null) => {
//     setCaptchaValue(value);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!captchaValue) {
//       alert("Please verify the CAPTCHA");
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       alert("Form submitted successfully!");
//       setLoading(false);
//     }, 2000);
//   };

//   const contactData = [
//     { subcategory: "Email", name: "info@agstamp.com" },
//     // { subcategory: "Phone", name: "+1 234 567 890" },
//     { subcategory: "Location", name: "San Francisco, CA" },
//   ];

//   return (
//     <div className="min-h-screen overflow-x-hidden">
//       {/* Header Section */}
//       <div
//         className="w-full h-48 sm:h-64 bg-cover bg-center flex justify-center items-center shadow-lg bg-no-repeat"
//         style={{ backgroundImage: `url(${contactus})` }}
//       >
//         <h1 className="text-white text-3xl sm:text-4xl font-bold drop-shadow-lg">Contact Us</h1>
//       </div>

//       {/* Main Section */}
//       <div className=" mx-auto flex flex-col justify-center items-center bg-white py-8 px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
//           {/* Left Column */}
//           <div className="flex flex-col justify-center bg-blue-500 text-white p-6 sm:p-8 rounded-lg shadow-lg">
//             {/* <h2 className="text-center text-xl sm:text-2xl font-bold mb-6">RC Tennis Academy</h2> */}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block font-bold mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full rounded-md border-gray-300 p-2 text-black focus:outline-none bg-white focus:ring-2 focus:ring-blue-300"
//                   onInput={(e) => {
//                     e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, '');
//                   }}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="email" className="block font-bold mb-2">
//                   E-mail
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full rounded-md border-gray-300 p-2 text-black focus:outline-none bg-white focus:ring-2 focus:ring-blue-300"
//                   pattern="^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
//                   title="Email should start with a letter and follow a valid format (e.g., example123@domain.com)"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="subject" className="block font-bold mb-2">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   className="w-full rounded-md border-gray-300 p-2 text-black focus:outline-none bg-white focus:ring-2 focus:ring-blue-300"
//                   required
//                 />
//               </div>
//               <div className="mb-6">
//                 <label htmlFor="message" className="block font-bold mb-2">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows={3}
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="w-full rounded-md border-gray-300 p-2 text-black focus:outline-none bg-white focus:ring-2 focus:ring-blue-300"
//                   required
//                 />
//               </div>
//               <div className="mb-6">
//                 <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleCaptchaChange} />

//               </div>
//               {/* <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
//               >
//                 {loading ? 'Submitting...' : 'Submit'}
//               </button> */}
//               <div className="flex justify-center items-center">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="!bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-6 text-lg rounded-md transition duration-300"
//                 >
//                   {loading ? 'Submitting...' : 'Submit'}
//                 </button>
//               </div>
//             </form>

//             {/* Contact Info */}
            
//               <div className="mt-6  flex flex-col  items-start">
//                   {contactData &&
//                   (
//                     <>
//                         <>
//                             <p className="text-lg sm:text-xl mb-2">
//                               <div className='flex justify-center'><div className='!text-gray-900 mr-3 font-bold'>Email:</div> <div>{contactData.find(item => item.subcategory === "Email")?.name || "Not available"}</div></div>
//                             </p>
//                             {/* <p className="text-lg sm:text-xl mb-2">
//                             <div className='flex justify-center'><div className='!text-gray-900 mr-3 font-bold'>Phone:</div> <div>{contactData.find(item => item.subcategory === "Phone")?.name || "Not available"}</div></div>
//                             </p> */}
//                             <p className="text-lg sm:text-xl mb-4">
//                             <div className='flex justify-center items-center'><div className='!text-gray-900 mr-3 font-bold'>Based In:</div> <div>{contactData.find(item => item.subcategory === "Location")?.name || "Not available"}</div></div>
//                             </p>
//                         </>
//                     </>
//                   )
                    
                      
//                   }
//                 <div className="flex justify-center space-x-4">
//                   <a href="#" className="text-white hover:text-red-300 transition">
//                       <FontAwesomeIcon icon={faFacebook} size="2x" />
//                   </a>
//                   <a href="#" className="text-white hover:text-red-300 transition">
//                       <FontAwesomeIcon icon={faInstagram} size="2x" />
//                   </a>
//                   <a href="#" className="text-white hover:text-red-300 transition">
//                     <FontAwesomeIcon icon={faTwitter} size="2x" />
//                   </a>
//                 </div>
//             </div>
            
//           </div>

//           {/* Right Column */}
//           {/* <div className="flex justify-center items-center rounded-lg overflow-hidden shadow-lg">
//             <iframe
//               title="Google Map"
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509232!2d-122.41941568468138!3d37.77492977975996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5d8ca3e1%3A0x333adf1c5b6c1e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1692890274742!5m2!1sen!2sus"
//               className="w-full h-full"
//               style={{ border: 'none', minHeight: '350px' }}
//               allowFullScreen
//               loading="lazy"
//             ></iframe>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

import React, { useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { contactus } from "../../assets/image";
import { useContactusMutation } from "../../Redux/Api/userApi";
import { toast } from "react-toastify";


const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [contact] = useContactusMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!captchaValue) {
        alert("Please verify the CAPTCHA");
        return;
      }
      setLoading(true);
      const res = await contact(formData);
      setLoading(false);
      toast.success(res.data?.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactData = [
    { subcategory: "Email", name: "info@agstamp.com" },
    { subcategory: "Location", name: "San Francisco, CA" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header Section */}
      <div
        className="w-full h-48 sm:h-64 bg-cover bg-center flex justify-center items-center shadow-lg bg-no-repeat"
        style={{ backgroundImage: `url(${contactus})` }}
      >
        <h1 className="text-white text-3xl sm:text-4xl font-bold drop-shadow-lg">Contact Us</h1>
      </div>

      {/* Main Section - Centered and Wider */}
      <div className="mx-auto flex justify-center items-center bg-white py-8 px-4">
        <div className="w-full max-w-3xl"> {/* Increased width */}
          <div className="flex flex-col justify-center bg-blue-500 text-white p-6 sm:p-10 rounded-lg shadow-lg"> {/* Increased padding */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2 text-lg">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 p-3 text-black focus:outline-none bg-white focus:ring-2 focus:ring-blue-300" 
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, '');
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold mb-2 text-lg"> {/* Larger text */}
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 p-3 text-black focus:outline-none bg-white focus:ring-2 focus:ring-blue-300" 
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Email should start with a letter and follow a valid format (e.g., example123@domain.com)"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block font-bold mb-2 text-lg"> {/* Larger text */}
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 p-3 text-black focus:outline-none bg-white focus:ring-2 focus:ring-blue-300" 
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block font-bold mb-2 text-lg"> {/* Larger text */}
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 p-3 text-black focus:outline-none bg-white focus:ring-2 focus:ring-blue-300" 
                  required
                />
              </div>
              <div className="mb-6">
                <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleCaptchaChange} />
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="!bg-gray-900 hover:bg-blue-700 text-white font-bold py-3 px-8 text-lg rounded-md transition duration-300" 
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="mt-8"> {/* Increased margin */}
              {contactData.map((item, index) => (
                <p key={index} className="text-lg sm:text-xl mb-3"> {/* Larger text */}
                  <span className="font-bold text-gray-900 mr-3">{item.subcategory}:</span>
                  <span>{item.name}</span>
                </p>
              ))}
              <div className="flex justify-center space-x-6 mt-4"> {/* Increased spacing */}
                <a href="#" className="text-white hover:text-red-300 transition">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="#" className="text-white hover:text-red-300 transition">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a href="#" className="text-white hover:text-red-300 transition">
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
