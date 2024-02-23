import DataTable from "./components/DataTable";

const List = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className=" text-2xl mb-5">已簽到成員</h1>
      <DataTable />
    </main>
  );
};

export default List;
