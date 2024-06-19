export default function TextFlip() {
  const FlippedWords = ({ text }: { text: string }) => (
    <span className="animate-flipWords h-[100%]">{text}</span>
  );

  const words = ["fantastic", "love", "fire", "awesome", "fantastic"];

  return (
    <div className="box-content flex h-8 rounded-lg p-20 text-3xl font-semibold">
      <p>Coding is</p>
      <div className="flex flex-col overflow-hidden pl-4 font-semibold text-blue-400">
        {words.map((word, index) => (
          <FlippedWords key={index} text={word} />
        ))}
      </div>
    </div>
  );
}
