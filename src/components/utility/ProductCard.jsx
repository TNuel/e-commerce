import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  const [productsInCartArray, setProductsInCartArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const addToCartDate = new Date().toLocaleString();

  // ... (rest of the component logic)

  const gotoProductDetailsPage = (productId) => {
    console.log(productId);
    navigate(`/main/product-details/${productId}`);
  };

  useEffect(() => {
    console.log("Updated products in cart:", productsInCartArray);
    localStorage.setItem("cartArray", JSON.stringify(productsInCartArray));
  }, [productsInCartArray]);

  const addToCart = async (product) => {
    product.isDisabled = true;
    console.log("get here =====");
    console.log("get here =====", product);
    console.log(addToCartDate);
    setIsLoading(true);

    try {
      setProductsInCartArray([...productsInCartArray, product]);
      console.log("products in cart=>", productsInCartArray);

      Toast.fire({
        icon: "success",
        title: "Product added to cart successfully",
      });
    } catch (error) {
      console.log("add to cart error =>", error);
      product.isDisabled = false;
      // Handle the error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-10 gap-5 lg:gap-10">
      {products.map((product) => (
        <div
          key={product?.id}
          className="max-w-md bg-white place-self-stretch rounded overflow-hidden"
        >
          <div className="h-80 w-full relative rounded-xl ">
            <div
              onClick={() => gotoProductDetailsPage(product?.id)}
              className="relative w-full cursor-pointer"
            >
              <img
                src={product?.image}
                alt={product?.title}
                className="rounded-xl mx-auto object-cover h-64"
              />
              <div className="absolute inset-0 bg-neutral/10"></div>
            </div>
            <div className="absolute w-full top-0 flex justify-between p-4">
              <div
                className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer bg-textSecondary"
                onClick={() => {
                  product.isFavorite = !product.isFavorite;
                }}
              >
                <svg
                  className={`stroke-white w-5 h-5 text-text-white ${
                    product.isFavorite ??
                    "fill-error transition-opacity duration-50 ease-in-out"
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    stroke
                    d="M10.5166 17.3418C10.2333 17.4418 9.76663 17.4418 9.48329 17.3418C7.06663 16.5168 1.66663 13.0752 1.66663 7.24183C1.66663 4.66683 3.74163 2.5835 6.29996 2.5835C7.81663 2.5835 9.15829 3.31683 9.99996 4.45016C10.8416 3.31683 12.1916 2.5835 13.7 2.5835C16.2583 2.5835 18.3333 4.66683 18.3333 7.24183C18.3333 13.0752 12.9333 16.5168 10.5166 17.3418Z"
                    strokeWidth={`${product.isFavorite ? "0" : "1.5"}`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="min-w-10 px-2 h-6 flex justify-center items-center rounded-sm text-sm lg:text-base font-urbanist leading-9 text-white bg-error">
                {product.rating.rate * 20}%
              </div>
            </div>
          </div>
          <div className="py-4 text-textPrimary">
            <div className="font-bold font-urbanist text-2xl mb-2 inset-0 truncate hover:flex-wrap">
              {product?.title}
            </div>
            <p className="text-sm lg:text-base font-bold font-urbanist">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(product?.price) ?? 0}
              <span className="text-textSecondary/50 text-xs lg:text-sm line-through">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(product?.price / 100) ?? 0}
              </span>
            </p>
          </div>
          <div className="my-2 flex space-x-1">
            {/* ... (Shopping Cart and other icons) ... */}
            <div>
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_16_1520)">
                  <path
                    d="M12.0001 17.27L16.1501 19.78C16.9101 20.24 17.8401 19.56 17.6401 18.7L16.5401 13.98L20.2101 10.8C20.8801 10.22 20.5201 9.12001 19.6401 9.05001L14.8101 8.64001L12.9201 4.18001C12.5801 3.37001 11.4201 3.37001 11.0801 4.18001L9.19007 8.63001L4.36007 9.04001C3.48007 9.11001 3.12007 10.21 3.79007 10.79L7.46007 13.97L6.36007 18.69C6.16007 19.55 7.09007 20.23 7.85007 19.77L12.0001 17.27Z"
                    fill="#323232"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_16_1520">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_16_1520)">
                  <path
                    d="M12.0001 17.27L16.1501 19.78C16.9101 20.24 17.8401 19.56 17.6401 18.7L16.5401 13.98L20.2101 10.8C20.8801 10.22 20.5201 9.12001 19.6401 9.05001L14.8101 8.64001L12.9201 4.18001C12.5801 3.37001 11.4201 3.37001 11.0801 4.18001L9.19007 8.63001L4.36007 9.04001C3.48007 9.11001 3.12007 10.21 3.79007 10.79L7.46007 13.97L6.36007 18.69C6.16007 19.55 7.09007 20.23 7.85007 19.77L12.0001 17.27Z"
                    fill="#323232"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_16_1520">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_16_1520)">
                  <path
                    d="M12.0001 17.27L16.1501 19.78C16.9101 20.24 17.8401 19.56 17.6401 18.7L16.5401 13.98L20.2101 10.8C20.8801 10.22 20.5201 9.12001 19.6401 9.05001L14.8101 8.64001L12.9201 4.18001C12.5801 3.37001 11.4201 3.37001 11.0801 4.18001L9.19007 8.63001L4.36007 9.04001C3.48007 9.11001 3.12007 10.21 3.79007 10.79L7.46007 13.97L6.36007 18.69C6.16007 19.55 7.09007 20.23 7.85007 19.77L12.0001 17.27Z"
                    fill="#323232"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_16_1520">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <svg
                className="w-6 h-6 cursor-pointer"
                // @click="toggleStar"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_16_1520)">
                  <path
                    d="M12.0001 17.27L16.1501 19.78C16.9101 20.24 17.8401 19.56 17.6401 18.7L16.5401 13.98L20.2101 10.8C20.8801 10.22 20.5201 9.12001 19.6401 9.05001L14.8101 8.64001L12.9201 4.18001C12.5801 3.37001 11.4201 3.37001 11.0801 4.18001L9.19007 8.63001L4.36007 9.04001C3.48007 9.11001 3.12007 10.21 3.79007 10.79L7.46007 13.97L6.36007 18.69C6.16007 19.55 7.09007 20.23 7.85007 19.77L12.0001 17.27Z"
                    fill="#323232"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_16_1520">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <svg
                className="w-6 h-6 cursor-pointer"
                viewBox="0 0 24 24"
                // @click="toggleStar"
                fill="none"
              >
                <g clipPath="url(#clip0_16_982)">
                  <path
                    d="M19.6501 9.04L14.8101 8.62L12.9201 4.17C12.5801 3.36 11.4201 3.36 11.0801 4.17L9.19007 8.63L4.36007 9.04C3.48007 9.11 3.12007 10.21 3.79007 10.79L7.46007 13.97L6.36007 18.69C6.16007 19.55 7.09007 20.23 7.85007 19.77L12.0001 17.27L16.1501 19.78C16.9101 20.24 17.8401 19.56 17.6401 18.7L16.5401 13.97L20.2101 10.79C20.8801 10.21 20.5301 9.11 19.6501 9.04ZM12.0001 15.4L8.24007 17.67L9.24007 13.39L5.92007 10.51L10.3001 10.13L12.0001 6.1L13.7101 10.14L18.0901 10.52L14.7701 13.4L15.7701 17.68L12.0001 15.4Z"
                    fill="#323232"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_16_982">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={product.isDisabled}
            className="w-full px-6 py-1 lg:py-3 flex cursor-pointer disabled:bg-gray-300 disabled:text-gray-700 disabled:border-gray-300 justify-center items-center group rounded-md hover:bg-secondary/50 hover:text-white hover:scale-105 border-2 border-secondary/50 text"
          >
            <div className="flex items-center space-x-4">
              Add to Cart
              <span className="ml-2">
                {/* ... (Shopping Cart SVG icon) ... */}
                <svg
                  className="w-6 h-6 fill-secondary group-disabled:fill-gray-500 group-hover:fill-white"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_30_357)">
                    <path d="M15 4.99984H13.3334C13.3334 3.15817 11.8417 1.6665 10 1.6665C8.15837 1.6665 6.66671 3.15817 6.66671 4.99984H5.00004C4.08337 4.99984 3.33337 5.74984 3.33337 6.6665V16.6665C3.33337 17.5832 4.08337 18.3332 5.00004 18.3332H15C15.9167 18.3332 16.6667 17.5832 16.6667 16.6665V6.6665C16.6667 5.74984 15.9167 4.99984 15 4.99984ZM8.33337 8.33317C8.33337 8.7915 7.95837 9.1665 7.50004 9.1665C7.04171 9.1665 6.66671 8.7915 6.66671 8.33317V6.6665H8.33337V8.33317ZM10 3.33317C10.9167 3.33317 11.6667 4.08317 11.6667 4.99984H8.33337C8.33337 4.08317 9.08337 3.33317 10 3.33317ZM13.3334 8.33317C13.3334 8.7915 12.9584 9.1665 12.5 9.1665C12.0417 9.1665 11.6667 8.7915 11.6667 8.33317V6.6665H13.3334V8.33317Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_30_357">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
