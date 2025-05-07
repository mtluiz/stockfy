/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";

export function CreateProduct() {
  const router = useRouter();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({
    name: "",
    brand: "",
    observation: "",
    image: "",
    sector: "",
    shelf: "",
    shed: ""
  });

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setData({
        name: "",
        brand: "",
        observation: "",
        image: "",
        sector: "",
        shelf: "",
        shed: ""
      });
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (file) {
          setUploading(true);

          const response = await fetch("/api/upload",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                filename: file.name,
                contentType: file.type,
              }),
            },
          );

          if (response.ok) {
            const { url, fields } = await response.json();

            const formData = new FormData();
            Object.entries(fields).forEach(([key, value]) => {
              formData.append(key, value as string);
            });
            formData.append("file", file);

            const uploadResponse = await fetch(url, {
              method: "POST",
              body: formData,
            });

            if (uploadResponse.ok) {
              data.image = "https://stockfy.s3.sa-east-1.amazonaws.com/" + fields.key
              data.observation = data.observation || " ";
              createProduct.mutate(data);
            } else {
              console.error("S3 Upload Error:", uploadResponse);
              alert("Falha ao criar produto!");
            }
            return
          } else {
            alert("Failed to get pre-signed URL.");
            return
          }
        } else {
          data.observation = data.observation || " ";
          data.image = " "
          createProduct.mutate(data);
        }
        setUploading(false);
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Nome do produto"
        value={data.name}
        onChange={(e) => setData((val) => ({ ...val, name: e.target.value }))}
        className="w-[400px] rounded bg-blue-100 px-4 py-2 text-black"
      />

      <input
        type="text"
        placeholder="Marca do produto"
        value={data.brand}
        onChange={(e) => setData((val) => ({ ...val, brand: e.target.value }))}
        className="w-[400px] rounded bg-blue-100 px-4 py-2 text-black"
      />

      <input
        type="text"
        placeholder="Setor"
        value={data.sector}
        onChange={(e) => setData((val) => ({ ...val, sector: e.target.value }))}
        className="w-[400px] rounded bg-blue-100 px-4 py-2 text-black"
      />

      <input
        type="text"
        placeholder="Prateleira"
        value={data.shelf}
        onChange={(e) => setData((val) => ({ ...val, shelf: e.target.value }))}
        className="w-[400px] rounded bg-blue-100 px-4 py-2 text-black"
      />

      <input
        type="text"
        placeholder="Galpão"
        value={data.shed}
        onChange={(e) => setData((val) => ({ ...val, shed: e.target.value }))}
        className="w-[400px] rounded bg-blue-100 px-4 py-2 text-black"
      />

      <p>Imagem: </p> <input
        id="file"
        type="file"
        placeholder="Adicionar imagem"
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            setFile(files[0]);
          }
        }}
        accept="image/png, image/jpeg"
      />

      <textarea
        placeholder="Observação"
        value={data.observation}
        onChange={(e) =>
          setData((val) => ({ ...val, observation: e.target.value }))
        }
        className="w-[400px] rounded bg-blue-100 px-4 py-2 text-black"
      ></textarea>

      <Button
        type="submit"
        className="w-28 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createProduct.isLoading}
      >
        {createProduct.isLoading ? "Criando..." : "Criar Produto"}
      </Button>
    </form>
  );
}
