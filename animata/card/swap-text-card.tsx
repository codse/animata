import SwapText from "@/animata/text/swap-text";

interface FlipTextCardProps {
  initialText: string;
  finalText: string;
}

export default function SwapTextCard({ initialText, finalText }: FlipTextCardProps) {
  return (
    <div className="flex h-64 w-[480px] flex-col justify-between rounded-md border-2 bg-gray-200 p-4 md:w-[500px]">
      <h5 className="text-gray-500">Animata</h5>
      <div className="flex h-20 flex-col justify-between md:w-72">
        <div className="md:hidden">
          <div className="text-lg font-semibold text-black">{initialText}</div>
          <div className="text-sm font-medium text-gray-500">{finalText}</div>
        </div>
        <div className="hidden h-full md:flex">
          <SwapText
            initialText={initialText}
            finalText={finalText}
            className="h-full"
            initialTextClassName="text-lg font-semibold text-black w-full"
            finalTextClassName="text-sm font-medium text-gray-500 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
