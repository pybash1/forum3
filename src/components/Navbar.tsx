export default function Navbar({
  landing = false,
  current = "/",
}: {
  landing?: boolean;
  current?: string;
}) {
  return (
    <div className="flex flex-row justify-between items-center top-0 left-0 right-0 px-10 py-5" style={{ borderBottom: landing ? "" : "1px solid #f2f2f7", position: landing ? "absolute" : "fixed", backgroundColor: landing ? "" : "white" }}>
      <div className="flex flex-row gap-2 items-center font-semibold hover:opacity-70 transition ease-in-out duration-500">
        <img className="w-10 h-10" src="/favicon.png" alt="logo" />
        <a
          href="/"
          className="[text-shadow:rgb(0_0_0_/_10%)_0px_10px_20px]"
          style={{ color: landing ? "" : "#4400FF" }}
        >
          Forum3
        </a>
      </div>
      <div className="flex flex-row gap-6 items-center font-semibold text-sm">
        <a
          href="/introduction"
          style={{
            color: !landing && current === "/introduction" ? "#4400FF" : "",
          }}
          className={
            !landing
              ? "transition ease-in-out"
              : "hover:opacity-70 transition ease-in-out"
          }
        >
          Introduction
        </a>
        <a
          href="/configuration"
          style={{
            color: !landing && current === "/configuration" ? "#4400FF" : "",
          }}
          className={
            !landing
              ? "transition ease-in-out"
              : "hover:opacity-70 transition ease-in-out"
          }
        >
          Configuration
        </a>
        <a
          href="/components"
          style={{
            color: !landing && current === "/components" ? "#4400FF" : "",
          }}
          className={
            !landing
              ? "transition ease-in-out"
              : "hover:opacity-70 transition ease-in-out"
          }
        >
          Components
        </a>
        <a
          href="/demo"
          style={{
            backgroundColor: landing ? "" : "#4400FF",
            color: landing ? "" : "#FFFFFF",
          }}
          className="text-black bg-white px-3 py-2 rounded-lg hover:opacity-70 transition ease-in-out"
        >
          Try it Out
        </a>
      </div>
    </div>
  );
}
