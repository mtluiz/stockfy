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
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ITransaction {
  id: number;
  date: Date;
  quantity: number;
  type: string;
  productId: number;
}

interface IProduct {
  id: number;
  name: string;
  brand: string;
  observation: string;
  image: string;
}

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};


export default function ShowTransaction({
  latestTransaction,
  products
}: {
  latestTransaction: ITransaction[];
  products: IProduct[]
}) {
  const router = useRouter();
  const deleteApi = api.productTransaction.deleteOne.useMutation({
    onSuccess: () => {
      router.refresh();
      console.log("A DALVA BEBE PORRA");
    },
  });
  function deleteProduct(id: number) {
    if (confirm("Você realmente deseja apagar este item?")) {
      deleteApi.mutate({ id });
    }
  }

  return (
    <div className="mt-4 rounded border-b-4 border-t-4 border-blue-400 p-4">
      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white">
        Todas as Transações
      </h1>
      <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-green-600 md:text-2xl dark:text-green-900">
        Entrada
      </h2>

      <Table className="my-4">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Produto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestTransaction.filter((t) => t.type === "in").map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {transaction.id}
              </TableCell>
              <TableCell className="font-medium">
                {transaction.date.toLocaleDateString('pt-BR', options)}
              </TableCell>
              <TableCell>{transaction.quantity}</TableCell>
              <TableCell className="w-[300px]">
                {(products.find((product) => +product.id === +transaction.productId))?.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-red-600 md:text-2xl dark:text-green-900">
        Saída
      </h2>


      <Table className="my-4">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Produto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestTransaction.filter((t) => t.type === "out").map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {transaction.id}
              </TableCell>
              <TableCell className="font-medium">
                {transaction.date.toLocaleDateString('pt-BR', options)}
              </TableCell>
              <TableCell>{transaction.quantity}</TableCell>
              <TableCell className="w-[300px]">
                {(products.find((product) => +product.id === +transaction.productId))?.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
