import Card from "./components/Card";
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
      <div className="p-48">
        <div className="grid grid-cols-3 gap-20">
          <Card
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-rocket-takeoff-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12.17 9.53c2.307-2.592 3.278-4.684 3.641-6.218.21-.887.214-1.58.16-2.065a3.578 3.578 0 0 0-.108-.563 2.22 2.22 0 0 0-.078-.23V.453c-.073-.164-.168-.234-.352-.295a2.35 2.35 0 0 0-.16-.045 3.797 3.797 0 0 0-.57-.093c-.49-.044-1.19-.03-2.08.188-1.536.374-3.618 1.343-6.161 3.604l-2.4.238h-.006a2.552 2.552 0 0 0-1.524.734L.15 7.17a.512.512 0 0 0 .433.868l1.896-.271c.28-.04.592.013.955.132.232.076.437.16.655.248l.203.083c.196.816.66 1.58 1.275 2.195.613.614 1.376 1.08 2.191 1.277l.082.202c.089.218.173.424.249.657.118.363.172.676.132.956l-.271 1.9a.512.512 0 0 0 .867.433l2.382-2.386c.41-.41.668-.949.732-1.526l.24-2.408Zm.11-3.699c-.797.8-1.93.961-2.528.362-.598-.6-.436-1.733.361-2.532.798-.799 1.93-.96 2.528-.361.599.599.437 1.732-.36 2.531Z" />
                <path d="M5.205 10.787a7.632 7.632 0 0 0 1.804 1.352c-1.118 1.007-4.929 2.028-5.054 1.903-.126-.127.737-4.189 1.839-5.18.346.69.837 1.35 1.411 1.925Z" />
              </svg>
            }
            title={"Getting Started"}
            description={
              "Learn how to use these documentation pages in combination with Framer to start building new projects in no-time."
            }
            button={"Read"}
          />
          <Card
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-gear"
                viewBox="0 0 16 16"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
            }
            title={"Configuration"}
            description={
              "Learn how to configure contexts, etc. and use our Forum and Page components for several purposes."
            }
            button={"Read"}
          />
          <Card
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-box-seam"
                viewBox="0 0 16 16"
              >
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
              </svg>
            }
            title={"Components"}
            description={
              "Check out the available components along with their live demo. A live demo is running in the bottom corner too."
            }
            button={"Live Demo"}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
