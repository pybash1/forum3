interface Link {
  name: string;
  link: string;
  active?: boolean;
}

export default function Sidebar({ links }: { links: Link[] }) {
  return (
    <aside className="py-24 pt-48 mx-12 font-semibold flex flex-col gap-8 fixed left-0 overflow-hidden w-36 overflow-wrap">
      {links.map((link: Link) => {
        return (
          <a
            href={link.link}
            className="hover:text-[#4400FF] transition ease-in-out"
            style={{ color: link.active ? "#4400FF" : "" }}
          >
            {link.name}
          </a>
        );
      })}
    </aside>
  );
}
