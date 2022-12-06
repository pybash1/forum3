import { ReactNode } from "react";

export default function Card({
  icon,
  title,
  description,
  button,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  button: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-[#591dff]">{icon}</div>
      <div className="font-semibold text-2xl">{title}</div>
      <div className="text-[1rem] text-gray-600">{description}</div>
      <a
        href="/"
        className="rounded-lg bg-gray-200 w-fit px-3 py-2 font-semibold"
      >
        {button}
      </a>
    </div>
  );
}
