"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import useSWR from "swr";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLoginStateContext } from "@/hooks/useLoginStateContext";
import DeleteAlertDialog from "./DeleteAlertDialog";
import { BsFillClipboardCheckFill } from "react-icons/bs";
import { useToast } from "@/components/ui/use-toast";
import { MdAccountCircle } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

export type Payment = {
  id: string;
  username: string;
  email: string;
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true });

export default function DataTable() {
  const router = useRouter();
  const { toast } = useToast();
  const { setLoginState } = useLoginStateContext();
  const [editState, setEditState] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    //取出Token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("HENRY-AUTH="))
      ?.split("=")[1];

    const tokenId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("HENRY-AUTH-ID="))
      ?.split("=")[1];

    if (!token || !tokenId) {
      return router.push("/");
    }
  }, []);

  const {
    data: resData,
    error,
    mutate,
  } = useSWR("https://rest-api-demo.zeabur.app/users", fetcher);

  const data = resData?.data;

  console.log("data", data);
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "username",
      header: "已簽到人員",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("username")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            電子信箱
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },

    {
      accessorKey: "_id",

      header: () => {
        return <div>帳號設定</div>;
      },
      cell: ({ row }) => {
        const router = useRouter();

        //取出Token
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("HENRY-AUTH-ID="))
          ?.split("=")[1];

        const id = row.getValue("_id") as string;

        const handleDelete = async () => {
          try {
            const res = await axios.delete(
              `https://rest-api-demo.zeabur.app/users/${id}`,
              {
                withCredentials: true,
              }
            );

            if (res) {
              document.cookie = "HENRY-AUTH=;";
              document.cookie = "HENRY-AUTH-ID=;";

              router.push("/");

              setLoginState(false);

              toast({
                icon: "success",
                title: "您的帳號已刪除！",
              });
            }

            console.log("res", res);
          } catch (error) {
            console.log("error", error);
          }
        };

        if (token === id)
          return (
            <div className="flex flex-col ">
              <p className="text-green-600 flex items-center pb-2">
                <MdAccountCircle className="mx-2" size={20} />
                我的帳號
              </p>
              <div className="flex  items-center">
                {editState ? (
                  <>
                    <Input
                      placeholder="請輸入新姓名..."
                      className="mx-2"
                      ref={inputRef}
                    />
                    <Button
                      onClick={() => setEditState(false)}
                      className="mx-1"
                    >
                      取消
                    </Button>
                    <Button
                      variant="green"
                      onClick={() => {
                        const inputValue = inputRef.current?.value;
                        console.log("輸入框的值為:", inputValue);

                        if (inputValue) {
                          const patchUsernameHandler = async () => {
                            try {
                              const res = await axios.patch(
                                `https://rest-api-demo.zeabur.app/users/${id}`,
                                {
                                  username: inputValue,
                                },
                                {
                                  withCredentials: true,
                                }
                              );

                              if (res) {
                                mutate();
                                setEditState(false);

                                toast({
                                  icon: "success",
                                  title: "您的姓名已更新！",
                                });
                              }
                            } catch (error) {
                              console.log("error", error);
                            }
                          };

                          patchUsernameHandler();
                        } else {
                          toast({
                            icon: "error",
                            title: "請輸入姓名！",
                          });
                        }
                      }}
                      className="mx-1"
                    >
                      儲存
                    </Button>
                  </>
                ) : (
                  <>
                    <DeleteAlertDialog handleDelete={() => handleDelete()} />
                    <Button onClick={() => setEditState(true)} className="mx-1">
                      編輯姓名
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (error) return <div></div>;
  if (!resData) return <div>loading...</div>;

  return (
    <div className="w-full">
      <div className="flex items-center justify-center w-full mb-5">
        <BsFillClipboardCheckFill size={26} className="mx-2" />
        <h1 className=" text-2xl ">已簽到成員</h1>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="透過電子信箱搜尋..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <IoIosSearch className="mx-2" size={24} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
