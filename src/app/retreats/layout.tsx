import { Instrument_Serif } from "next/font/google";

// The retreat pages borrow the flyer's tall editorial serif; it only loads on these pages.
const instrumentSerif = Instrument_Serif({
  variable: "--font-retreat-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export default function RetreatsLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${instrumentSerif.variable} retreat-theme`}>{children}</div>;
}
