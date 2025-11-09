import { Link } from "react-router-dom";

type Props = {
  name: string;
  desc: string;
  path: string;
};

export function BrandCard({ name, desc, path }: Props) {
  return (
    <Link
      to={path}
      className="bg-gray-800 hover:bg-gray-700 transition-all rounded-2xl shadow-lg p-6 text-center border border-gray-700 hover:scale-105 duration-200"
    >
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-400 text-sm">{desc}</p>
    </Link>
  );
}
