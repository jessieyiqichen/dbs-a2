import type { Metadata } from "next";
import { Libre_Franklin, Old_Standard_TT } from "next/font/google";
import { PlateDefs } from "@/components/dawn/PlateArt";
import { DAWN_FOCUS_CSS } from "@/components/dawn/ds/tokens";
import { TrailsProvider } from "./state";
import { TopBar } from "./TopBar";
import { Colophon } from "./Colophon";

const display = Old_Standard_TT({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--dw-display" });
const ui = Libre_Franklin({ subsets: ["latin"], weight: ["400", "600"], variable: "--dw-ui" });

export const metadata: Metadata = {
  title: "Twelve Trails",
  description: "Twelve famous walks of the world, set like a box of old travel prints.",
};

export default function TrailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={`${display.variable} ${ui.variable} min-h-screen overflow-x-clip font-[family-name:var(--dw-ui)] text-dw-ink [font-variant-numeric:lining-nums]`}
      style={{ background: "linear-gradient(180deg, var(--color-dw-page) 0%, var(--color-dw-page-mid) 45%, var(--color-dw-page-low) 100%)" }}
    >
      <PlateDefs />
      <style>{DAWN_FOCUS_CSS}</style>
      <TrailsProvider>
        <TopBar />
        {children}
      </TrailsProvider>
      <Colophon />
    </main>
  );
}
