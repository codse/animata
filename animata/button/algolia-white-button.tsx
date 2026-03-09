export default function AlgoliaWhiteButton() {
  return (
    <button className="algolia-white-btn inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded border-0 bg-[#FCFCFD] px-4 font-mono leading-none text-slate-800 no-underline transition duration-150 ease-in-out hover:-translate-y-0.5 active:translate-y-0.5">
      <style>{`
        .algolia-white-btn {
          box-shadow: rgba(45,35,66,0.4) 0 2px 4px, rgba(45,35,66,0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
        }
        .algolia-white-btn:hover {
          box-shadow: rgba(45,35,66,0.4) 0 4px 8px, rgba(45,35,66,0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
        }
        .algolia-white-btn:focus {
          box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45,35,66,0.4) 0 2px 4px, rgba(45,35,66,0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
        }
        .algolia-white-btn:active {
          box-shadow: #D6D6E7 0 3px 7px inset;
        }
      `}</style>
      Aloglia White
    </button>
  );
}
