"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { DataTable } from "./DataTable";
import {
  ColumnDef,
} from "@tanstack/react-table";

interface ITransaction {
  id: number;
  date: Date;
  quantity: number;
  type: string;
  productId: number;
}

interface ITransactionTable {
  id: number;
  date: string;
  quantity: number;
  type: string;
  productId: number;
  productName: string;
  actions: VoidFunction;
}

interface IProduct {
  id: number;
  name: string;
  brand: string;
  observation: string;
  image: string;
}

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const columns: ColumnDef<ITransactionTable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down-up ml-2"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
            />
          </svg>
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down-up ml-2"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
            />
          </svg>
        </Button>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantidade
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down-up ml-2"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
            />
          </svg>
        </Button>
      );
    },
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produto
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down-up ml-2"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
            />
          </svg>
        </Button>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return <>{row.original?.actions()}</>;
    },
  },
];

export default function ShowTransaction({
  latestTransaction,
  products,
}: {
  latestTransaction: ITransaction[];
  products: IProduct[];
}) {
  const router = useRouter();
  const deleteApi = api.productTransaction.deleteOne.useMutation({
    onSuccess: () => {
      router.refresh();
      console.log("A DALVA BEBE PORRA");
    },
  });

  function deleteTransaction(id: number) {
    if (confirm("Você realmente deseja apagar este item?")) {
      deleteApi.mutate({ id });
    }
  }

  const newTransaction = (type: string) =>
    latestTransaction
      .filter((t) => t.type === type)
      .map((transaction) => ({
        ...transaction,
        date: transaction.date.toLocaleDateString("pt-BR", options),
        productName:
          products.find((product) => +product.id === +transaction.productId)
            ?.name ?? "",
        actions: () => (
          <Button
            variant={"destructive"}
            onClick={() => deleteTransaction(transaction.id)}
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
        ),
      }));

  return (
    <div className="mt-4 rounded border-b-4 border-t-4 border-blue-400 p-4">
      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white">
        Todas as transações
      </h1>
      <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-green-600 md:text-2xl dark:text-green-900">
        Entrada
      </h2>
      <DataTable columns={columns} data={newTransaction("in")} />

      <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-red-600 md:text-2xl dark:text-green-900">
        Saída
      </h2>
      <DataTable columns={columns} data={newTransaction("out")} />
    
    </div>
  );
}
