"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../ReduxToolKit/hooks";
import { addCart, removeCart } from "../ReduxToolKit/Slices/cartFunc";
import Link from "next/link";

interface IDishes {
  id: number;
  name: string;
  price: number;
}
export default function Mycomp() {
  const cartData = useAppSelector((state) => state.list);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isform, setIsform] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const handleRemoveCart = (id: number, name: string, price: number) => {
    // Dispatch action to remove from todo
    dispatch(removeCart(id));
    console.log("removed");
  };
  const handleAddToCart = (dish: IDishes) => {
    dispatch(addCart(dish));
    console.log("clicked");
  };
  const calculateTotalAmount = () => {
    const total = cartData.reduce((acc, item) => acc + item.price, 0);
    setTotalAmount(total);
  };
  const handleform = () => {
    setIsform(!isform);
  }
  const handleSplitClick = () => {
    if (inputRef.current) {
      const numberInput = Number(inputRef.current.value);
      if (!isNaN(numberInput)) {
        console.log("Entered number:", numberInput);
        setTotalAmount(totalAmount/numberInput);
      } else {
        console.error("Invalid input: Please enter a number.");
      }
    }
  };

  useEffect(() => {
    setDomLoaded(true);
    calculateTotalAmount();
  }, [calculateTotalAmount]);
  return (
    <>
      <div className="p-10">
        <h1 className="text-4xl font-bold text-center p-5">Cart</h1>
        {cartData.length !== 0 && domLoaded ? (
          <div className="grid gap-5 md:grid-cols-3 justify-center align-middle items-center">
            {cartData.map((item) => (
              <div
                key={item.id}
                className="bg-blue-200 p-4 flex flex-col justify-center text-center align-middle"
              >
                <p className="text-xl">Name: {item.name}</p>
                <p className="text-lg">Price: {item.price}</p>
                <div className="flex gap-2 flex-wrap justify-center align-middle items-center">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="p-2 bg-blue-700 text-white"
                  >
                    ADD MORE
                  </button>
                  <button
                    onClick={() =>
                      handleRemoveCart(item.id, item.name, item.price)
                    }
                    className="p-2 bg-red-700 text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Cart is empty</p>
        )}
        <Link href={"/"}>
          <button className="p-2 bg-blue-700 text-white my-4">
            Back to Menu
          </button>
        </Link>
        {
          isform?
          <>
          <div>
            <label htmlFor="numberInput" >Enter number of people:</label>
            <input type="number" id="numberInput" ref={inputRef} className="border border-black"/>
            <button onClick={handleSplitClick} className="p-2 bg-blue-700 text-white">Submit</button>
          </div>
          </>:null
        }
        
      </div>
      <footer className="fixed bottom-0 w-full bg-gray-100 py-6 dark:bg-gray-800">
      <div className="container mx-auto px-4">
      <div className="flex justify-evenly">
          <p className="text-xl font-bold mr-2">Total Amount:={totalAmount}</p>
          <button className="p-2 bg-blue-700 text-white" onClick={handleform}>Split bill</button>
      </div>
      </div>
    </footer>
    </>
  );
}
