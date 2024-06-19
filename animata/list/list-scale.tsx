export default function ListScale() {
  const items = [
    "mushrooms",
    "peppers",
    "onions",
    "olives",
    "extra cheese",
    "tomatoes",
  ];
  return (
    <ul className={`text-black dark:text-white`}>
      {items.map((item, index) => (
        <li
          key={index}
          className="cursor-pointer py-1 duration-300 ease-in-out hover:scale-110"
        >
          <span className="hover:text-orange-500">{item}</span>
        </li>
      ))}
    </ul>
  );
}
