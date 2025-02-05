"use client";
import { TypeAnimation } from "react-type-animation";
const TypeAnimations = () => {
  return (
    <div>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          'Search "milk"',
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          'Search "bread"',
          1000,
          'Search "sugar"',
          1000,
          'Search "panner"',
          1000,
          'Search "chocolate"',
          1000,
          'Search "curd"',
          1000,
          'Search "rice"',
          1000,
          'Search "egg"',
          1000,
          'Search "chips"',
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
      />
    </div>
  );
};

export default TypeAnimations;
