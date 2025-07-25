import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useUserAllStampsQuery } from "../../Redux/Api/userApi";
import { FaBars, FaTimes, FaArrowUp, FaSearch, FaTimesCircle } from "react-icons/fa";

const RetailSales: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showFloatingSearch, setShowFloatingSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const res = useUserAllStampsQuery();
  const products = res.data?.stamps;

  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const scrollTimeoutRef = useRef<number | undefined>(undefined);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check for category in URL params on component mount
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(decodeURIComponent(categoryFromUrl));
    }
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolling(true);
      setShowScrollButton(scrollY > 100);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 2000);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (showFloatingSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showFloatingSearch]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const baseCategories = [
    "All",
    "Russia 1858-1918",
    "Russia 1919-1941",
    "Russia 1941-2000",
    "Russia Airmails",
    "Russia Semi-postal",
    "Local Issues",
    "Offices Abroad",
    "Foreign Issues",
  ];

  const productCategories = products?.map((p) => p.categories) || [];
  const categories = [...new Set([...baseCategories, ...productCategories])];

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.categories === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsSidebarOpen(false);
    // Update URL when category is selected
    if (category === "All") {
      searchParams.delete('category');
    } else {
      searchParams.set('category', encodeURIComponent(category));
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row relative">
      {/* Sticky Mobile Header */}
      <div className="md:hidden sticky top-0 z-30 bg-white shadow-sm px-3 py-2">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-bold text-gray-800">Stamp Collection</h1>
          <button
            ref={menuButtonRef}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-gray-800 p-1"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-200 ease-in-out
          w-56 bg-blue-600 shadow-lg p-3 overflow-y-auto 
          fixed md:static h-full z-10 text-white
        `}
        style={{
          top: isMobile ? (isScrolling ? "88px" : "104px") : "0",
          height: isMobile
            ? isScrolling
              ? "calc(100vh - 88px)"
              : "calc(100vh - 104px)"
            : "100vh",
        }}
      >
        <h2 className="text-lg font-bold mb-3 border-b border-blue-500 pb-2">
          Categories
        </h2>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategorySelect(category)}
                className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-700 text-white"
                    : "text-white hover:bg-blue-500"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 p-2 md:mt-0"
        style={{ marginTop: isMobile ? (isScrolling ? "88px" : "104px") : "0" }}
      >
        {/* Desktop Search */}
        <div className="hidden md:block max-w-2xl mx-auto mb-3 sticky top-0 bg-gray-100 pt-2 z-10">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Title */}
        {selectedCategory !== "All" && (
          <div className="mb-4 text-center md:text-left">
            <h2 className="text-xl font-bold text-gray-800">
              Category: {selectedCategory}
            </h2>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-1 max-w-7xl mx-auto px-1">
          {filteredProducts?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-sm shadow-xs overflow-hidden hover:shadow-sm transition-shadow duration-150 flex flex-col h-full border border-gray-200"
            >
              <div className="relative pt-[80%] bg-gray-50">
                <img
                  src={
                    product?.images[0]?.publicUrl || "/placeholder-image.jpg"
                  }
                  alt={product?.name}
                  className="absolute top-0 left-0 w-full h-full object-contain p-1"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder-image.jpg";
                  }}
                />
              </div>
              <div className="p-1 flex flex-col flex-grow">
                <div className="flex-grow flex items-center justify-center min-h-[32px]">
                  <h3 className="text-[0.65rem] font-medium text-gray-800 text-center line-clamp-2 leading-tight">
                    {product?.name}
                  </h3>
                </div>
                <div className="flex justify-between items-center mt-0.5 mb-1">
                  <span className="text-[0.65rem] font-bold text-blue-600">
                    ${product?.price?.toFixed(2)}
                  </span>
                  {/* <span
                    className={`text-[0.5rem] px-0.5 py-0.5 rounded-full ${
                      product?.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product?.stock > 0 ? "Stock" : "Sold"}
                  </span> */}
                </div>
                <Link to={`/product/${product?._id}`} className="block w-full">
                  <button className="w-full py-0.5 text-[0.6rem] bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-20"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={18} />
        </button>
      )}

      {/* Floating Search Icon/Input */}
      {/* <div className={`fixed top-4 right-4 z-50 transition-all duration-100 ease-in-out ${(isScrolling || showFloatingSearch) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ top: '105px' }}>
        {!showFloatingSearch ? (
          <button
            onClick={() => setShowFloatingSearch(true)}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            aria-label="Show search"
          >
            <FaSearch className="text-amber-950 text-lg " />
          </button>
        ) : (
          <div className="relative bg-white rounded-full shadow-lg">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              className="pl-4 pr-10 py-2 text-sm border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => setTimeout(() => setShowFloatingSearch(false), 100)}
              autoFocus
            />
            <FaTimesCircle 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
              onClick={() => setShowFloatingSearch(false)}
            />
          </div>
        )}
      </div> */}

       {/* Floating Search Icon/Input */}
      {/* <div className={`fixed top-4 right-4 z-50 transition-all duration-100 ease-in-out ${(isScrolling || showFloatingSearch) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ top: '105px' }}> */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-100 ease-in-out`}
        style={{ top: '105px' }}>

        {!showFloatingSearch ? (
          <button
            onClick={() => setShowFloatingSearch(true)}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            aria-label="Show search"
          >
            <FaSearch className="text-blue-500 text-lg " />
          </button>
        ) : (
          <div className="relative bg-white rounded-full shadow-lg">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              className="pl-4 pr-10 py-2 text-sm border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => setTimeout(() => setShowFloatingSearch(false), 100)}
              autoFocus
            />
            <FaTimesCircle 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
              onClick={() => setShowFloatingSearch(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailSales;