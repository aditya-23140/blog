export default function page({ params }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Profile Page</h1>
      <h2 className="p-3 bg-green-500 text-black">{params.id}</h2>
    </div>
  );
}
