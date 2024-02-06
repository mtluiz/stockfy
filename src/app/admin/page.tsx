import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { CreateProduct } from "../_components/create-post";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return redirect("/");

  const latestProduct = await api.product.getLatest.query();

  return (
    <div className="border-box min-h-[100vh] w-full bg-[#ffffff] p-6 antialiased">
      <header className="border-box flex items-center rounded-xl bg-[#0f084b] p-6">
        <Link href="/">
          <Image
            src={"/image.png"}
            width={100}
            height={180}
            alt="logo"
            className="rounded"
          ></Image>
        </Link>

        <ul className="ml-12 flex gap-4">
          <li>
            <Link href={"/api/auth/signin"}>
              <Button>Produtos</Button>
            </Link>
          </li>
          <li>
            <Link href={"/api/auth/signin"}>
              <Button>Produtos</Button>
            </Link>
          </li>
        </ul>
      </header>
      {latestProduct ? (
        <p className="truncate">
          Your most recent product: {latestProduct.name}
        </p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreateProduct />
    </div>
  );
}

export default CrudShowcase;
