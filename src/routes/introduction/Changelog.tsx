import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function Changelog() {
  return (
    <div>
      <Navbar current="/introduction" />
      <Sidebar
        links={[
          { name: "Getting Started", link: "/introduction" },
          { name: "What's New", link: "/introduction/changelog", active: true },
          { name: "Feedback", link: "/introduction/feedback" },
        ]}
      />
      <div className="pl-[280px] w-2/3 pt-20 font-inter">
        <div className="font-bold text-black text-4xl pt-16">What's New</div>
        <div className="text-[#464168] text-xl pt-5 pb-10 font-normal">
          We constantly publish improvements and keep track of changes here.
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
        <div className="font-bold text-xl">Unreleased</div>
        <div className="text-[#464168] pt-5 pb-10 font-normal">
          <ul className="list-disc pl-4">
            <li>
              <b>introduction</b>: completed introduction subpages with feedback
              page(without functionality)
            </li>
            <li>
              added introduction page and created new sidebar for docs pages
              with improved dynamic navbar component
            </li>
            <li>added routing and 404 page</li>
            <li>
              <b>animation</b>: improved animation and added staggering
            </li>
            <li>
              <b>meta</b>: improved seo and tags
            </li>
            <li>complete landing page</li>
            <li>improved landing page</li>
            <li>basic landing page design</li>
            <li>
              <b>notifications</b>: added notifications instead of console.logs
            </li>
            <li>added sender address</li>
            <li>
              <b>replies</b>: improved replies ui with link detection and
              styling
            </li>
            <li>added link detection and basic styling options thru html</li>
            <li>added basic reply functionality and ui</li>
            <li>
              <b>reply</b>: added reply ui
            </li>
            <li>
              <b>scroll</b>: added auto scroll to bottom of messages
            </li>
            <li>
              <b>message</b>: now messages can be seen and only sent in custom
              context
            </li>
            <li>added functionality to create posts/messages</li>
            <li>
              <b>forum</b>: forum component with connection functionality
            </li>
            <li>
              <b>init</b>: generated project structure and boilerplate
            </li>
            <li>minor bug fixes, improvements and layout changes</li>
            <li>forgot to add file in previous commit</li>
            <li>updated assets, manifest, and sources</li>
            <li>fixed major ui bug where background was behind other text</li>
            <li>fixed minor bugs and issues and made minor improvements</li>
            <li>more minor bug fixes and improvements</li>
            <li>fix some minor bugs and formatting</li>
            <li>
              <b>colors</b>: now notifications match theme
            </li>
            <li>
              <b>scroll</b>: fixed autoscroll, now it scrolls only once, and
              after each new message sent
            </li>
            <li>fixed bug where context provided as prop was not being used</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
