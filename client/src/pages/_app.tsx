import { Navbar } from "@/components/common";
import { TRPCProvider } from "@/providers/trpc-provider";
import "@/styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <TRPCProvider dehydratedState={pageProps.trpcState}>
        <Navbar />
        <div
          className={`flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
        >
          <main className="h-screen pt-[48px] overflow-auto no-scrollbar w-full">
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </main>
        </div>
      </TRPCProvider>
    </SessionProvider>
  );
}
