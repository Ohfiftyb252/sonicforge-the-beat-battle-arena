import React from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { RetroAudioPlayer } from "@/components/RetroAudioPlayer";
type AppLayoutProps = {
  children: React.ReactNode;
};
export function AppLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="scanline-overlay" />
      <AppHeader />
      <main className="flex-grow pt-24 pb-32">
        {children}
      </main>
      <AppFooter />
      <RetroAudioPlayer />
    </div>
  );
}