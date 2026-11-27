import { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { Loader, ScrollExtras, ResumeViewer, CommandPalette, Analytics, HashScroll } from "@/components/GlobalUI";
import { I18nProvider } from "@/lib/i18n";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const BlogList = lazy(() => import("@/pages/Blog").then((m) => ({ default: m.BlogList })));
const BlogPostPage = lazy(() => import("@/pages/Blog").then((m) => ({ default: m.BlogPostPage })));
const SplashCursor = lazy(() => import("@/components/SplashCursor"));

/** Fluid cursor effect — on for every device with a mouse/trackpad (laptops & desktops).
 *  Skipped only on touch-only phones/tablets, where there is no cursor to track. */
function useFancyCursor() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(any-pointer: fine)");
    const update = () => setOn(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return on;
}

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects/:slug" component={ProjectDetail} />
        <Route path="/blog" component={BlogList} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  const fancyCursor = useFancyCursor();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <Loader />
        {fancyCursor && (
          <Suspense fallback={null}>
            <SplashCursor
              DENSITY_DISSIPATION={3.5}
              VELOCITY_DISSIPATION={2}
              PRESSURE={0.1}
              CURL={3}
              SPLAT_RADIUS={0.2}
              SPLAT_FORCE={6000}
              COLOR_UPDATE_SPEED={10}
              SHADING
              RAINBOW_MODE={false}
              COLOR="#A855F7"
            />
          </Suspense>
        )}
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          <ScrollExtras />
          <Navbar />
          <Router />
          <Footer />
        </div>
        <ChatBot />
        <ResumeViewer />
        <CommandPalette />
        <Analytics />
        <HashScroll />
        <Toaster />
      </I18nProvider>
    </QueryClientProvider>
  );
}