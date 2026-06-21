"use client";
import { AsciiArt } from "@/components/ui/ascii-art";
import dadImage from "../../assets/dad.jpg";

export default function AsciiArtDemo() {
  return (
    <AsciiArt
      src={dadImage}
      resolution={120}
      color="#e5e7eb"
      animationStyle="fade"
      animationDuration={1.5}
      animateOnView={false}
      objectFit="contain"
      className="ascii-demo"
    />
  );
}
