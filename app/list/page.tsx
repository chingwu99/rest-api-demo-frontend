import type { Metadata } from "next";
import DataTable from "./components/DataTable";

export const metadata: Metadata = {
  title: "會議簽到系統｜已簽到成員",
  description: "會議簽到系統｜已簽到成員",
};

const List = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <DataTable />
    </main>
  );
};

export default List;
