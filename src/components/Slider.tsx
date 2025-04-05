// components/DynamicSlider.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  images: string[];
}

export default function Slider({ images }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return <div>No images</div>;

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-2xl shadow-lg">
      {images.map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: current === index ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className="object-fill w-full h-full rounded-2xl"
          />
        </motion.div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
