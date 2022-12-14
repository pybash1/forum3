import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect } from "react";

export default function ForumComponent() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-in");
      } else {
        entry.target.classList.remove("slide-in");
      }
    });
  });

  useEffect(() => {
    const hiddenElements = document.querySelectorAll(".anim");
    hiddenElements.forEach((element) => {
      observer.observe(element);
    });
  });

  return (
    <div>
      <Navbar current="/components" />
      <Sidebar
        links={[
          { name: "All", link: "/components" },
          { name: "Forum", link: "/components/forum", active: true },
          { name: "ForumPage", link: "/components/forum-page" },
        ]}
      />
      <div className="pl-[280px] w-2/3 pt-20 font-inter">
        <div className="font-bold text-black text-4xl pt-16">Forum</div>
        <div className="text-[#464168] text-xl pt-5 pb-10 font-normal">
          The Forum component is a widget like embeddable component that lies at
          any corner of a page so the user can easily ask without having to
          leave the page.
        </div>
        <div className="flex flex-row gap-4">
          <a
            href="/"
            className="bg-[#4400FF] text-white rounded-lg px-4 py-2 font-semibold flex flex-row w-fit items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-clipboard"
              viewBox="0 0 16 16"
            >
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
            </svg>
            Copy Component
          </a>
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
        </div>
        <div className="bg-[#eeeeee] my-20 h-[0.5px]"></div>
        <div className="font-bold text-xl">Variants</div>
        <div className="text-[#464168] pt-5 pb-10 font-normal">
          The default Forum component has a standard green color. You can switch
          to a dark variant or apply custom colors.
          <div className="w-full p-8 rounded-lg border-[#e8e8e8] border-[0.5px] mt-3 grid grid-cols-2 gap-6">
            <img src="/forum_box.png" alt="light mode" />
            <img src="/forum_box_dark.png" alt="dark mode" />
          </div>
        </div>
      </div>
    </div>
  );
}
