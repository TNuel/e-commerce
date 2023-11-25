import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  // const productStore = useProductStore();
  // const cartStore = useCartStore();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [productQuantity, setProductQuantity] = useState(1);
  const [disableLowerCount, setDisableLowerCount] = useState(false);
  const [disableUpperCount, setDisableUpperCount] = useState(false);
  const [productQuantityUpperLimit, setProductQuantityUpperLimit] = useState(0);
  const [productQuantityLowerLimit, setProductQuantityLowerLimit] = useState(1);
  const [addToCartDate] = useState(new Date().toLocaleString());

  const addToCart = async (cartId) => {
    setIsLoading(true);
    const addToCartData = {
      userId: 5,
      date: addToCartDate,
      products: [
        {
          productId: cartId,
          quantity: 1,
        },
      ],
    };
    try {
      const res = await axios.post(
        `https://fakestoreapi.com/products`,
        addToCartData
      );
      console.log("add to cart response =>", res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("add to cart error =>", error);
      throw error;
    }
  };

  const validateQuantity = (newQuantity) => {
    if (newQuantity < 1) {
      setProductQuantity(1);
    } else if (newQuantity > productQuantityUpperLimit) {
      setProductQuantity(productQuantityUpperLimit);
    }
  };

  useEffect(() => {
    const getProductDetails = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        console.log("product details response =>", res);
        setProductDetails(res.data);
        setProductQuantityUpperLimit(res.data.rating.count);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("product details error =>", error);
        throw error;
      }
    };

    getProductDetails();
  }, [id]);

  useEffect(() => {
    validateQuantity(productQuantity);
  });

  return (
    <div className="px-4 lg:my-20 bg-white overflow-hidden my-8 w-full">
      {isLoading ? (
        <div className="text-center w-full">
          <span className="font-bold font-urbanist text-textSecondary ml-6 text-lg mb-2 lg:text-[36px] italic">
            Fetching Data ...
          </span>
          <svg
            aria-hidden="true"
            className="mx-auto w-8 h-8 text-gray-200 inline-flex items-center animate-spin dark:text-gray-600 fill-secondary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative flex justify-center items-center">
            <img
              className="rounded-[8px] object-cover h-96"
              src={productDetails.image}
              alt={productDetails.title}
            />
            <div className="absolute inset-0 bg-neutral/10"></div>
          </div>
          <div className="text-textPrimary flex flex-col text-center md:text-start lg:space-y-32 px-10">
            <div className="flex flex-col my-4 space-y-2 lg:space-y-4">
              <div className="font-bold font-urbanist text-lg mb-2 lg:text-[36px]">
                {productDetails.title}
              </div>
              <p className="text-base font-semibold lg:text-[36px] font-urbanist">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(productDetails.price) ?? 0}
                <span className="text-textSecondary/50 text-xs lg:text-sm ml-3 line-through">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(productDetails.price / 100) ?? 0}
                </span>
              </p>
              <p className="text-sm lg:text-base text-secondary font-urbanist">
                {productDetails.description}
              </p>
              <div className="flex space-x-4 mx-auto md:mx-0 text-sm lg:text-lg font-semibold font-urbanist leading-9">
                <h1>Quantity:</h1>
                <div className="w-24 h-8 flex justify-between items-center mx-auto md:mx-0 px-2 rounded-lg text-sm lg:text-lg font-semibold font-urbanist leading-9 bg-textSecondary/10">
                  <button
                    className="mr-4 cursor-pointer disabled:text-gray-300"
                    disabled={disableLowerCount}
                    onClick={() => setProductQuantity(productQuantity - 1)}
                  >
                    -
                  </button>{" "}
                  {productQuantity}{" "}
                  <button
                    className="ml-4 cursor-pointer disabled:text-gray-300"
                    disabled={disableUpperCount}
                    onClick={() => setProductQuantity(productQuantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 px-6 py-3 flex justify-center cursor-pointer bg-secondary/80 group rounded-xl mt-2 md:mt-0 lg:mt-20 hover:bg-secondary text-white hover:scale-105 border-2 border-secondary80">
              <button
                onClick={() => addToCart(productDetails.id)}
                className="text-base lg:text-lg"
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="hidden place-self-end mx-auto md:mx-0 space-x-4 lg:mr-4 justify-between items-center">
            <p className="text-error font-urbanist text-sm lg:text-base">
              Remove Item
            </p>
            <span>
              <img src="../../../assets/delete_forever.svg" alt="delete icon" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
