import { ReactNode } from "react";

export default function Card({
  href,
  icon,
  title,
  description,
  button,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  button: string;
}) {
  return (
    <div className="flex flex-col gap-5 font-inter anim">
      <div className="text-[#591dff]">{icon}</div>
      <div className="font-bold text-xl">{title}</div>
      <div className="text-[1rem] text-gray-600">{description}</div>
      <a
        href={href}
        className="rounded-lg bg-gray-200 w-fit px-3 py-2 font-semibold"
      >
        {button}
      </a>
    </div>
  );
}
