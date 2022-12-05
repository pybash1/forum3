import { Forum } from "./lib";

function App() {
  return (
    <div className="overflow-x-hidden">
      <div className="bg-[url('../public/bg.webp')] bg-cover font-inter h-screen w-screen flex flex-col items-center justify-center text-white">
        <div className="flex flex-row justify-between items-center absolute top-0 left-0 right-0 px-10 py-5">
          <div className="flex flex-row gap-2 items-center font-semibold">
            <img
              className="w-10 h-10"
              src="https://cdn-icons-png.flaticon.com/128/1041/1041916.png"
              alt="logo"
            />
            <div className="[text-shadow:rgb(0_0_0_/_10%)_0px_10px_20px]">
              Forum3
            </div>
          </div>
          <div className="flex flex-row gap-6 items-center font-semibold text-sm">
            <div>Introduction</div>
            <div>Configuration</div>
            <div>Components</div>
            <div className="text-black bg-white px-3 py-2 rounded-lg">
              Try it Out
            </div>
          </div>
        </div>
        <Forum
          context="forum3"
          closedText="Having second thoughts?"
          headerText="Ask the Forum3 community"
        />
        <img
          className="w-24 h-24"
          src="https://cdn-icons-png.flaticon.com/128/1041/1041916.png"
          alt="logo"
        />
        <div className="font-extrabold text-8xl [text-shadow:rgb(0_0_0_/_10%)_0px_10px_20px]">
          Forum3
        </div>
        <div className="font-semibold pt-2 text-lg">
          By the community, for the community
        </div>
      </div>
      <div className="p-48"></div>
    </div>
  );
}

export default App;
