import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Introduction() {
  return (
    <div>
      <Navbar current="/introduction" />
      <Sidebar
        links={[
          { name: "Getting Started", link: "/introduction", active: true },
          { name: "What's New", link: "/introduction/changelog" },
          { name: "Feedback", link: "/introduction/feedback" },
        ]}
      />
      <div className="pl-[280px] w-2/3 pt-20 font-inter">
        <div className="font-bold text-black text-4xl pt-16">
          Getting Started
        </div>
        <div className="text-[#464168] text-xl pt-5 pb-10 font-normal">
          Everything on this site(including the site itself) is managed and
          published on{" "}
          <a
            className="text-[#4400FF]"
            href="https://github.com/pybash1/forum3"
          >
            GitHub
          </a>
          . This makes using our components a breeze. Want to update some copy?
          Click "Edit Page" and follow the instructions. Want to use a component
          in your own project? Click the "Copy component" button and pase it in
          your project.
        </div>
        <a
          href="https://github.com/pybash1/forum3/blob/cra/src/routes/Introduction.tsx"
          className="bg-[#F2F2F7] rounded-lg px-4 py-2 font-semibold flex flex-row w-fit items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
          Edit Page
        </a>
        <div className="bg-[#eeeeee] my-20 h-[0.5px]"></div>
        <div className="font-bold text-xl">Copy Code</div>
        <div className="text-[#464168] pt-5 pb-10 font-normal">
          You can copy and paste component code across any React project. Every
          component page has a prominent "Copy component" button. Click this and
          you're ready to go. Just paste it on your code and use it.
        </div>
        <img
          className="w-full h-full rounded-lg block object-cover bg-[rgba(0,0,0,0)] object-[50%_50%] shadow-xl"
          src="/demo.gif"
          alt="demo"
        ></img>
        <div className="font-bold text-xl pt-16">Contribute</div>
        <div className="text-[#464168] pt-5 pb-5 font-normal">
          We encourage you to open the source project in{" "}
          <a
            className="text-[#4400FF]"
            href="https://github.com/pybash1/forum3"
          >
            GitHub
          </a>{" "}
          and contribute where you see fit. Any change can be easily published
          by making a pull request. Visit the project on Github to learn more.
        </div>
        <a
          href="https://github.com/pybash1/forum3/blob/cra/src/routes/Introduction.tsx"
          className="bg-[#F2F2F7] rounded-lg px-4 py-2 font-semibold flex flex-row w-fit items-center gap-2 mb-8"
        >
          View on GitHub
        </a>
        <img className="rounded-lg shadow-xl mb-24" src="/gh.png" alt="screenshot" />
      </div>
    </div>
  );
}
