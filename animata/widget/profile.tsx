import { Dribbble, Facebook, Linkedin, X } from "lucide-react";

export default function Profile() {
  return (
    <div className="group flex min-h-52 w-52 flex-col items-center justify-center rounded-lg bg-gray-200 p-3 shadow-sm transition-all duration-700 hover:shadow-black/25">
      <img
        src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
        className="h-16 w-16 transform rounded-full transition-transform duration-700 ease-in group-hover:scale-110"
      />
      <div className="mt-2 flex flex-col items-center justify-center">
        <h3 className="font-sans font-semibold">Avatar Aang</h3>
        <p className="text-sm font-light text-gray-600">The last air bender</p>
      </div>
      <div className="group mt-2 flex w-full flex-row justify-evenly rounded-3xl bg-gray-50 p-2">
        <a href="https://x.com/?lang=en&mx=2">
          <X size={18} className="hover:scale-125" />
        </a>
        <a href="https://linkedin.com/">
          <Linkedin size={16} className="hover:scale-125" />
        </a>
        <a href="https://dribbble.com/">
          <Dribbble size={16} className="hover:scale-125" />
        </a>
        <a href="https://facebook.com/">
          <Facebook size={16} className="hover:scale-125" />
        </a>
      </div>
    </div>
  );
}
