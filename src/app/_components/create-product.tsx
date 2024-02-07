"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";

export function CreateProduct() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    brand: "",
    observation: "",
    image: "",
  });

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setData({
        name: "",
        brand: "",
        observation: "",
        image: "",
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createProduct.mutate(data);
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Nome do produto"
        value={data.name}
        onChange={(e) => setData((val) => ({ ...val, name: e.target.value }))}
        className="w-[400px] rounded px-4 py-2 text-black bg-blue-100"
      />

      <input
        type="text"
        placeholder="Marca do produto"
        value={data.brand}
        onChange={(e) => setData((val) => ({ ...val, brand: e.target.value }))}
        className="w-[400px] rounded px-4 py-2 text-black bg-blue-100"
      />

      <input
        type="text"
        placeholder="Imagem"
        value={data.image}
        onChange={(e) => setData((val) => ({ ...val, image: e.target.value }))}
        className="w-[400px] rounded px-4 py-2 text-black bg-blue-100"
      />

      <textarea
        placeholder="Observação"
        value={data.observation}
        onChange={(e) => setData((val) => ({ ...val, observation: e.target.value }))}
        className="w-[400px] rounded px-4 py-2 text-black bg-blue-100"
      ></textarea>

      <Button
        type="submit"
        className="px-10 py-3 font-semibold transition hover:bg-white/20 w-28"
        disabled={createProduct.isLoading}
      >
        {createProduct.isLoading ? "Criando..." : "Criar Produto"}
      </Button>
    </form>
  );
}
