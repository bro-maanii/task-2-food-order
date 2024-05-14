
import Link from "next/link";
import DishList from "./components/DishList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full flex  items-center justify-between font-mono my-6">
        <h1 className="text-2xl md:text-4xl">Resturant App</h1>
        <Link href="/cart" className="bg-red-700 text-white p-2">cart</Link>
      </div>
      <DishList />
    </main>
  );
}
