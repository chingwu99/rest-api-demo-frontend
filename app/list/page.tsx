import DataTable from "./components/DataTable";
import axios from "axios";

const List = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DataTable />
    </main>
  );
};

export default List;
