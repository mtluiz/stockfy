import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreateTransaction } from "@/app/_components/create-transaction";
import ShowTransaction from "@/app/_components/show-transaction";

async function Transactions() {
  const session = await getServerAuthSession();
  if (!session?.user) return redirect("/");

  const latestTransaction = await api.productTransaction.getAll.query();
  const products = await api.product.getAll.query()

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
            <Link href={"/admin"}>
              <Button>Produtos</Button>
            </Link>
          </li>
          <li>
            <Link href={"/admin/transactions"}>
              <Button>Transações</Button>
            </Link>
          </li>
        </ul>
      </header>

      <div className="mt-4 rounded border-b-4 border-t-4 border-blue-400 p-4 bg-gray-100">
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white">
          Criar transação
        </h1>
        <CreateTransaction products={products} />
      </div>

      {latestTransaction ? (
        <ShowTransaction products={products} latestTransaction={latestTransaction} />
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}

export default Transactions;
