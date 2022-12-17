import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen w-screen bg-[#1b1b1b] flex flex-col items-center justify-center font-inter gap-5">
      <img src="/favicon.png" alt="logo" className="w-10 h-10" />
      <div className="text-white font-bold text-2xl">
        {/* @ts-ignore */}
        {error.status === 404 ? "Page Not Found" : "There's a bug in the site"}
      </div>
      <div className="text-[#cccccc] text-sm text-center">
        {/* @ts-ignore */}
        {error.status === 404
          ? "The page you are looking for does not exist."
          : "An internal error occured in the page. Report this on GitHub."}
        <br />
        Looking to improve user retention?
      </div>
      <a
        href="/"
        className="text-white bg-[#0099ff] rounded-lg px-6 py-2 font-semibold text-sm"
      >
        Try Forum3
      </a>
    </div>
  );
}
