import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  href: string;
  label: string;
};

export default function BackButton({
  href,
  label,
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm font-bold text-zinc-300 transition duration-300 hover:-translate-x-0.5 hover:border-red-700 hover:bg-red-950/20 hover:text-white"
    >
      <ArrowLeft
        size={17}
        className="text-red-500 transition-transform duration-300 group-hover:-translate-x-1"
      />

      {label}
    </Link>
  );
}