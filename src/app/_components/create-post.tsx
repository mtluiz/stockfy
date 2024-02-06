"use client";

import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";

import { api } from "@/trpc/react";

interface IProduct {
  name: string;
  brand: string;
  observation: string;
  image: string;
}

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
        placeholder="Nome"
        value={data.name}
        onChange={(e) => setData((val) => ({ ...val, name: e.target.value }))}
        className="w-full rounded-full px-4 py-2 text-black"
      />

      <input
        type="text"
        placeholder="Nome"
        value={data.brand}
        onChange={(e) => setData((val) => ({ ...val, name: e.target.value }))}
        className="w-full rounded-full px-4 py-2 text-black"
      />

      <input
        type="text"
        placeholder="Nome"
        value={data.observation}
        onChange={(e) => setData((val) => ({ ...val, name: e.target.value }))}
        className="w-full rounded-full px-4 py-2 text-black"
      />

      <input
        type="text"
        placeholder="Nome"
        value={data.image}
        onChange={(e) => setData((val) => ({ ...val, name: e.target.value }))}
        className="w-full rounded-full px-4 py-2 text-black"
      />

      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createProduct.isLoading}
      >
        {createProduct.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
