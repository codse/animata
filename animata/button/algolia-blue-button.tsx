export default function AlgoliaBlueButton() {
  return (
    <button className="algolia-blue-btn relative box-border inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded-md border-0 bg-gradient-to-r from-sky-500 to-blue-600 px-4 font-mono leading-none text-white no-underline transition duration-150 ease-in-out hover:-translate-y-0.5 active:translate-y-0.5">
      <style>{`
        .algolia-blue-btn {
          box-shadow: rgba(45,35,66,0.4) 0 2px 4px, rgba(45,35,66,0.3) 0 7px 13px -3px, rgba(58,65,111,0.5) 0 -3px 0 inset;
        }
        .algolia-blue-btn:hover {
          box-shadow: rgba(45,35,66,0.4) 0 4px 8px, rgba(45,35,66,0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
        }
        .algolia-blue-btn:focus {
          box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45,35,66,0.4) 0 2px 4px, rgba(45,35,66,0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
        }
        .algolia-blue-btn:active {
          box-shadow: #3c4fe0 0 3px 7px inset;
        }
      `}</style>
      Aloglia Blue
    </button>
  );
}
