import navLogo from "../assets/navLogo2.svg";
import { NAVBAR_MEDIA_LINKS } from "../constants";

const Navbar = () => {
    return (
        <nav className="mb-20 flex items-center justify-between py-6">
            <div className="flex flex-shrink-0 items-center">
                <img className="mx-2 w-10" src={navLogo} alt="navbar-image" />
            </div>
            <div className="m-8 flex items-center justify-center gap-4 text-2xl">
                {NAVBAR_MEDIA_LINKS.map((link, index) => (
                    <a
                        href={link.href}
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.icon}{" "}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
