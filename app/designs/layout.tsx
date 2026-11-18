import type { Metadata } from "next";
// Bundled with the site, so the build never reaches out to Google.
import "@fontsource/suez-one";
import "@fontsource/ibm-plex-sans-hebrew/300.css";
import "@fontsource/ibm-plex-sans-hebrew/400.css";
import "@fontsource/ibm-plex-sans-hebrew/500.css";
import "@fontsource/ibm-plex-sans-hebrew/600.css";
import "@fontsource/david-libre/400.css";
import "@fontsource/david-libre/500.css";
import "@fontsource/david-libre/700.css";
import "@fontsource/karantina/400.css";
import "@fontsource/karantina/700.css";
import "@fontsource-variable/rubik";
import "./designs.css";
import StudioBar from "./StudioBar";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "סטודיו עיצוב Goldrock",
};

export default function DesignsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="design-fonts"
    >
      <StudioBar />
      {children}
    </div>
  );
}
