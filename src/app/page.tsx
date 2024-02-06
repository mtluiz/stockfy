/* eslint-disable @next/next/no-img-element */
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Inter as FontSans } from "next/font/google";
import { CreateProduct } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <main
      className={cn(
        "bg-background min-h-screen font-sans antialiased bg-[#011936] flex justify-center items-center ",
        fontSans.variable,
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <img src="/logo.jpg" alt="" width={300} className="rounded-xl" />
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-white">
            {session && <span>Conectado como <strong className="text-[30px]">{session.user?.name}</strong></span>}
          </p>

          {session && <Link href={"/admin"}><Button>Ver produtos</Button></Link>}

          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
          >
            <Button >{session ? "Desconectar" : "Fazer Login"}</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}


