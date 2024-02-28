"use client";

import clsx from "clsx";
import { useState } from "react";

export function Slider1() {
  const [slides, setSlides] = useState([
    {
      src: "bg-[url(/images/bg1.jpg)]",
      title: "Context1",
      content: "This is image",
    },
    {
      src: "bg-[url(/images/bg2.jpg)]",
      title: "Context2",
      content: "This is image",
    },
    {
      src: "bg-[url(/images/bg3.jpg)]",
      title: "Context3",
      content: "This is image",
    },
    {
      src: "bg-[url(/images/bg4.jpg)]",
      title: "Context4",
      content: "This is image",
    },
    {
      src: "bg-[url(/images/bg5.jpg)]",
      title: "Context5",
      content: "This is image",
    },
    {
      src: "bg-[url(/images/bg6.jpg)]",
      title: "Context6",
      content: "This is image",
    },
  ]);
  const [index, setIndex] = useState(0);
  const nextIndex = () => {
    const newSlides = [...slides];
    const first = newSlides[0];
    newSlides.shift();
    newSlides.push(first);
    setSlides(newSlides);
  };
  const prevIndex = () => {
    const newSlides = [...slides];
    const last = newSlides[newSlides.length - 1];
    newSlides.pop();
    newSlides.unshift(last);
    setSlides(newSlides);
  };
  return (
    <div className="mx-10 w-[800px] h-[480px] relative shadow-2xl">
      <div>
        {slides.map((slide, i) => (
          <div
            className={clsx(`${slide.src} absolute bg-center bg-cover`, {
              "top-1/2 -translate-y-1/2 rounded-2xl shadow-2xl  inline-block transition-all w-[156px] h-[250px]":
                i !== index || i !== 1,
              "top-0 left-0 w-full h-full": i == index,
              "left-1/2": i === 2,
              "left-[calc(50%+210px)]": i === 3,
              "left-[calc(50%+430px)]": i === 4,
              "left-[calc(50%+650px)]": i === 5,
            })}
            key={i}
          >
            <div
              className={clsx(
                "absolute top-1/2 left-[100px] w-[300px] text-center -translate-y-1/2 text-white",
                {
                  "hidden  ": i !== 1,
                }
              )}
            >
              <h2 className="text-4xl uppercase font-bold opacity-0 animate-slide-context">
                {slide.title}
              </h2>
              <p className="mt-2 mb-5 opacity-0 animate-slide-p">
                {slide.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute -bottom-20">
        <button className="btn" onClick={prevIndex}>
          Pre
        </button>
        <button className="btn" onClick={nextIndex}>
          Next
        </button>
      </div>
    </div>
  );
}
