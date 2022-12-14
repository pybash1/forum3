export default function Component({
  name,
  image,
  link
}: {
  name: string;
  image: string;
  link: string;
}) {
  return (
    <a href={link} className="bg-gray-200/60 px-20 py-10 pb-14 flex group items-center anim justify-center rounded-xl relative hover:bg-gray-100/60 transition ease-in-out duration-700">
      <img src={image} alt="component" className="group-hover:opacity-60 transition ease-in-out duration-700" />
      <div className="absolute bottom-3 left-4 text-gray-500 font-semibold group-hover:opacity-60 transition ease-in-out duration-700">{name}</div>
    </a>
  );
}
