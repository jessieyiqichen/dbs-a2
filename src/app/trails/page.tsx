import type { Metadata } from "next";
import { Libre_Franklin, Old_Standard_TT } from "next/font/google";
import { PlateDefs } from "@/components/dawn/PlateArt";
import { DAWN_FOCUS_CSS } from "@/components/dawn/ds/tokens";
import TrailsApp from "./TrailsApp";

const DRAWER_CSS = "@keyframes dw-drawer-in{from{transform:translateX(28px);opacity:0}to{transform:none;opacity:1}}";

const display = Old_Standard_TT({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--dw-display" });
const ui = Libre_Franklin({ subsets: ["latin"], weight: ["400", "600"], variable: "--dw-ui" });

export const metadata: Metadata = {
  title: "Twelve Trails",
  description: "Twelve famous walks of the world, set like a box of old travel prints.",
};

export default function TrailsPage() {
  return (
    <main
      className={`${display.variable} ${ui.variable} min-h-screen font-[family-name:var(--dw-ui)] text-[#22333a] [font-variant-numeric:lining-nums]`}
      style={{ background: "linear-gradient(180deg, #e6edeb 0%, #eaf0ee 45%, #f0f5f3 100%)" }}
    >
      <PlateDefs />
      <style>{DAWN_FOCUS_CSS + DRAWER_CSS}</style>
      <TrailsApp />
    </main>
  );
}
