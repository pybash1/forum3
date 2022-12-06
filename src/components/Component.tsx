export default function Component({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  return (
    <a href="/" className="bg-gray-200/60 px-20 py-10 pb-14 flex items-center anim justify-center rounded-xl relative hover:bg-gray-100/60 transition ease-in-out duration-700">
      <img src={image} alt="component" />
      <div className="absolute bottom-3 left-4 text-gray-500 font-semibold">{name}</div>
    </a>
  );
}
