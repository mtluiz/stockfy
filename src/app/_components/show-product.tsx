"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
import { AppRouter } from "@/server/api/root";

interface IProduct {
  id: number;
  name: string;
  brand: string;
  observation: string;
  image: string;
}

export default function ShowProducts({
  latestProduct,
}: {
  latestProduct: IProduct[];
}) {
  function deleteProduct(id: number) {
    if (confirm("Você realmente deseja apagar este item?")) {
        //api.product.deleteOne({id})
    }
  }

  return (
    <div className="mt-4 rounded border-b-4 border-t-4 border-blue-400 p-4">
      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white">
        Todos os produtos
      </h1>
      <ul className="grid grid-cols-3 gap-4">
        {latestProduct.map((product) => (
          <Card key={product.id} className="max-w relative">
            <p className="absolute right-2 top-2 font-bold">
              ID : {product.id}
            </p>
            <p className="absolute bottom-2 right-2 font-bold">
              <Button
                variant={"destructive"}
                onClick={() => deleteProduct(product.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
              </Button>
            </p>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.observation}</CardDescription>
            </CardHeader>
            <CardFooter>
              <img
                src={product.image}
                width={100}
                height={100}
                className="object-cover"
                alt=""
              />
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
}
