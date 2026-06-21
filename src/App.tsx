import { AsciiArt } from "@/components/ui/ascii-art";
import dadImage from "../assets/dad.jpg";

export function App() {
  return (
    <main className="page">
      <h1>happy fathers day !</h1>
      <AsciiArt
        src={dadImage}
        resolution={120}
        charset="standard"
        color="#f8fafc"
        backgroundColor="transparent"
        animated={true}
        animationStyle="fade"
        animationDuration={1.1}
        className="ascii-card"
        objectFit="contain"
      />
    </main>
  );
}
