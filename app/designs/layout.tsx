import type { Metadata } from "next";
import {
  David_Libre,
  IBM_Plex_Sans_Hebrew,
  Karantina,
  Rubik,
  Suez_One,
} from "next/font/google";
import "./designs.css";
import StudioBar from "./StudioBar";

const ledgerDisplay = Suez_One({
  weight: "400",
  subsets: ["hebrew", "latin"],
  variable: "--font-ledger-display",
  display: "swap",
});

const ledgerBody = IBM_Plex_Sans_Hebrew({
  weight: ["300", "400", "500", "600"],
  subsets: ["hebrew", "latin"],
  variable: "--font-ledger-body",
  display: "swap",
});

const mirrorDisplay = David_Libre({
  weight: ["400", "500", "700"],
  subsets: ["hebrew", "latin"],
  variable: "--font-mirror-display",
  display: "swap",
});

const roomsDisplay = Karantina({
  weight: ["400", "700"],
  subsets: ["hebrew", "latin"],
  variable: "--font-rooms-display",
  display: "swap",
});

const roomsBody = Rubik({
  weight: ["400", "500", "700"],
  subsets: ["hebrew", "latin"],
  variable: "--font-rooms-body",
  display: "swap",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "סטודיו עיצוב Goldrock",
};

export default function DesignsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${ledgerDisplay.variable} ${ledgerBody.variable} ${mirrorDisplay.variable} ${roomsDisplay.variable} ${roomsBody.variable}`}
    >
      <StudioBar />
      {children}
    </div>
  );
}
