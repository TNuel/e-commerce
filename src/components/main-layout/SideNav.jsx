// import axios from "axios";
import React, { useEffect, useState } from "react";
import Clear from "../../assets/clear.svg";
import Delete from "../../assets/delete_forever.svg";

const SideNav = ({ isOpen, toggleSideNav }) => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [productsInCartArray, setProductsInCartArray] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [vat, setVat] = useState(0);

  const [isSideNavOpen, setIsSideNavOpen] = useState(isOpen);
  useEffect(() => {
    // Update the state when the isOpen prop changes
    setIsSideNavOpen(isOpen);
    // console.log("Updated products in cart:", productsInCartArray);
  }, [isOpen]);

  useEffect(() => {
    getProductsInCart();
  });

  let storedArray = localStorage.getItem("cartArray");
  storedArray = JSON.parse(storedArray) || [];
  console.log(storedArray);

  // useEffect(() => {
  //   let storedArray = localStorage.getItem("cartArray");
  //   storedArray = JSON.parse(storedArray);

  //   setProductsInCartArray(storedArray);
  //   console.log("gets here =========>", productsInCartArray);

  const getProductsInCart = async () => {
    setIsLoading(true);

    const priceTotal = productsInCartArray.map((product) => product.price);
    const calculatedSubTotal = priceTotal.reduce(
      (sum, price) => sum + price,
      0
    );
    setSubTotal(calculatedSubTotal);

    const calculatedVat = calculatedSubTotal / 1000;
    setVat(calculatedVat);

    console.log(
      "get products in cart vat =>",
      calculatedSubTotal,
      calculatedVat
    );
    // }, [productsInCartArray]);
    try {
      setProductsInCartArray(storedArray);
    } catch (error) {
      console.log("get products in cart error =>", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeProductFromCart = (productId) => {
    console.log("trying to remove ===-=-", productId);
    // Remove the product with the given productId from the array
    const updatedArray = storedArray.filter(
      (product) => product.id !== productId.id
    );

    // Update the state with the new array
    setProductsInCartArray(updatedArray);

    // Update localStorage with the new array
    localStorage.setItem("cartArray", JSON.stringify(updatedArray));
  };

  return (
    <div>
      {isSideNavOpen && (
        <div
          className={`sidenav fixed inset-y-0 right-0 w-[300px] md:w-[500px] lg:w-[700px] overflow-y-scroll bg-white transition-left duration-300 ease-in-out z-99 ${
            isSideNavOpen ? "block" : "hidden"
          }`}
          // className={`sidenav fixed top-0 -right-[300px] w-[300px] md:-right-[500px] md:w-[500px] lg:-right-[700px] lg:w-[700px] overflow-y-scroll bg-white transition-left duration-300 ease-in-out ${
          //   isSideNavOpen ?? "sidenav-open"
          // }`}
        >
          <div className="mx-4 lg:my-12">
            <div className="flex justify-between items-center my-6">
              <h1 className="text font-bold text-2xl lg:text-[30px] font-urbanist">
                Your Cart
              </h1>
              <div
                onClick={toggleSideNav}
                className="flex justify-center rounded-sm bg-secondary/25 hover:bg-secondary/30 hover:scale-105 w-12 h-8 items-center links"
              >
                <img src={Clear} alt="close" />
              </div>
            </div>
          </div>
          <div>
            {storedArray.length > 0 ? (
              storedArray.map((item) => (
                <div
                  key={item.id}
                  className="px-4 bg-white overflow-hidden w-full"
                >
                  <div className="border-b-2 grid grid-cols-1 md:grid-cols-3 mt-6 pb-6 border-neutral gap-4 mx-auto">
                    <div>
                      <img
                        className="min-w-[150px] h-48 rounded-[8px] object-cover"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <div className="text-textPrimary flex flex-col text-center md:text-start space-y-2">
                      <div className="font-bold font-urbanist text-lg mb-2">
                        {item.title}
                      </div>
                      <p className="text-sm lg:text-lg font-bold font-urbanist">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(item.price * item.quantity) ?? 0}
                        <span className="text-textSecondary/50 text-xs lg:text-sm ml-3 line-through">
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                          }).format((item.price * item.quantity) / 100) ?? 0}
                        </span>
                      </p>
                      <div className="w-24 h-8 flex justify-between items-center mx-auto md:mx-0 px-2 rounded-lg text-sm lg:text-lg font-semibold font-urbanist leading-9 bg-textSecondary/10">
                        <button
                          className="mr-4 cursor-pointer disabled:text-gray-300"
                          disabled={item.quantity === 1}
                          onClick={() => {
                            item.quantity--;
                          }}
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          className="ml-4 cursor-pointer disabled:text-gray-300"
                          disabled={item.quantity === 10}
                          onClick={() => {
                            item.quantity++;
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div
                      onClick={() => removeProductFromCart(item)}
                      className="flex place-self-end mx-auto md:mx-0 space-x-4 cursor-pointer hover:scale-105 lg:mr-4 justify-between items-center"
                    >
                      <p className="text-error font-urbanist text-sm lg:text-base">
                        Remove Item
                      </p>
                      <span>
                        <img src={Delete} alt="delete icon" />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <span className="font-bold font-urbanist text-textSecondary mx-6 text-lg mb-2 lg:text-[36px] italic">
                  No Item in Cart
                </span>
              </div>
            )}
          </div>
          <div className="px-4 flex flex-col space-y-6 my-10">
            <div className="flex justify-between w-full text-base lg:text-xl text-textSecondary font-urbanist">
              <h1 className="font-bold">Sub-Total</h1>
              <span>
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(subTotal) ?? 0}
              </span>
            </div>
            <div className="flex justify-between w-full text-base lg:text-xl text-textSecondary font-urbanist">
              <h1 className="font-bold">Tax</h1>
              <span>
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(vat) ?? 0}
              </span>
            </div>
            <div className="flex justify-between w-full font-bold text-base lg:text-xl text-textSecondary font-urbanist">
              <h1>Total</h1>
              <span>
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(subTotal + vat) ?? 0}
              </span>
            </div>
            <div className="w-3/4 px-6 py-3 flex justify-center items-center bg-secondary/80 group rounded-md mx-auto hover:bg-secondary text-white hover:scale-105 border-2 border-secondary80">
              <button
                // onClick={addToCart}
                className="flex items-center space-x-4"
              >
                Proceed to checkout
                <span className="ml-2 hidden md:flex">
                  <svg
                    className="w-6 h-6 fill-textPrimary group-hover:fill-white"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M13.3417 9.66665H13.8417V9.16665V7.87428L15.9556 9.99582L13.8417 12.1174V10.8333V10.3333H13.3417H4.16671C3.98452 10.3333 3.83337 10.1822 3.83337 9.99998C3.83337 9.81779 3.98452 9.66665 4.16671 9.66665H13.3417Z"
                      fill="white"
                      stroke="white"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
      {isSideNavOpen && (
        <div
          className="overlay bg-backgroundOverlay/50"
          onClick={toggleSideNav}
        ></div>
      )}
    </div>
  );
};

export default SideNav;
