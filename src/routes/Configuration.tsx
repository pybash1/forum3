import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Configuration() {
  return (
    <div>
      <Navbar current="/configuration" />
      <Sidebar
        links={[
          { name: "Configuration", link: "/configuration", active: true },
          { name: "Environment Variables", link: "/configuration/environment" },
          { name: "Style", link: "/configuration/style" },
        ]}
      />
      <div className="pl-[280px] w-2/3 pt-20 font-inter">
        <div className="font-bold text-black text-4xl pt-16">Configuration</div>
        <div className="text-[#464168] text-xl pt-5 pb-10 font-normal">
          Forum3 can be customized and configured in several ways. They are
          mentioned here.
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
        <div className="font-bold text-xl">Using component props</div>
        <div className="text-[#464168] pt-5 pb-10 font-normal">
          The most simplest and easiest way to configure the components are
          using their props. For example, you can easily change what context
          Forum3 uses by changing the `context` prop in the components.
          <pre className="px-6 py-4 bg-[#F2F2F7] rounded-xl mt-4">
            {'<Forum3 context="custom" ...otherProps />'}
          </pre>
        </div>
        <div className="font-bold text-xl">Using environment variables</div>
        <div className="text-[#464168] pt-5 pb-10 font-normal">
            Coming soon...
        </div>
      </div>
    </div>
  );
}
