import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function Changelog() {
  return (
    <div>
      <Navbar current="/introduction" />
      <Sidebar
        links={[
          { name: "Getting Started", link: "/introduction" },
          { name: "What's New", link: "/introduction/changelog" },
          { name: "Feedback", link: "/introduction/feedback", active: true },
        ]}
      />
      <div className="pl-[280px] w-2/3 pt-20 font-inter">
        <div className="font-bold text-black text-4xl pt-16">Feedback</div>
        <div className="text-[#464168] text-xl pt-5 pb-10 font-normal">
          Need an additional component? Can't find something? Please let us know
          and we'll try to update our documentation as fast as possible.
        </div>
        <div className="text-[#464168] pt-5 pb-10 font-normal flex flex-col gap-4">
            <div className="flex flex-row gap-4">
                <input className="w-full h-14 bg-[#F2F2F7] rounded-xl px-4 outline-none" placeholder="Name" />
                <input className="w-full h-14 bg-[#F2F2F7] rounded-xl px-4 outline-none" placeholder="Email" />
            </div>
            <textarea className="w-full h-36 bg-[#F2F2F7] rounded-xl px-4 py-4 outline-none" placeholder="Message"></textarea>
            <button className="w-full h-14 bg-[#4400FF] rounded-xl px-4 py-4 outline-none text-white font-semibold">Send</button>
        </div>
      </div>
    </div>
  );
}
