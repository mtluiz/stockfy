"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";

interface IProduct {
  id: number;
  name: string;
  brand: string;
  observation: string;
  image: string;
}

export function CreateTransaction({ products }: { products: IProduct[] }) {
  const router = useRouter();
  const [data, setData] = useState({
    date: new Date(),
    quantity: 1,
    type: "",
    productId: "",
  });

  const createTransaction = api.productTransaction.create.useMutation({
    onSuccess: () => {
      setData({
        date: new Date(),
        quantity: 1,
        type: "",
        productId: "",
      });
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTransaction.mutate({...data, productId: +data.productId});
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="datetime-local"
        placeholder="Nome do produto"
        value={data.date.toISOString().slice(0,16)}
        onChange={(e) => {
          const now = new Date(e.target.value);
          now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
          setData((val) => ({ ...val, date: now}))
        }}
        className="w-[400px] rounded bg-blue-100 px-4 py-2 text-black"
        required
      />

      <input
        type="number"
        placeholder="Marca do produto"
        value={data.quantity}
        onChange={(e) =>
          setData((val) => ({ ...val, quantity: +e.target.value }))
        }
        className="w-[400px] rounded bg-blue-100 px-4 py-2 text-black"
        required
      />

      <select
        value={data.productId}
        onChange={(e) => setData((val) => ({ ...val, productId: e.target.value }))}
        className="w-[400px] rounded bg-blue-100 px-4 py-2 text-black"
        required
      >
        <option value={""} disabled>Selecione o Produto</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>{product.name}</option>
        ))}
      </select>

      <select
        value={data.type}
        onChange={(e) => setData((val) => ({ ...val, type: e.target.value }))}
        className="w-[400px] rounded bg-blue-100 px-4 py-2 text-black"
        required
      >
        <option value={""}>Tipo de Transacao</option>
        <option value="in">Entrada</option>
        <option value="out">Saida</option>
      </select>


      <Button
        type="submit"
        className="w-28 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createTransaction.isLoading}
      >
        {createTransaction.isLoading ? "Criando..." : "Criar Transação"}
      </Button>
    </form>
  );
}
