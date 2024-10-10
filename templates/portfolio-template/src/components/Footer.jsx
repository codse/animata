import { SOCIAL_MEDIA_LINKS } from "../constants";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="mx-auto mb-8 mt-20">
            <div className="flex flex-col md:flex-row justify-center items-center border-t border-neutral-800 py-4">
                <div className="flex space-x-6 mb-2 ">
                    {SOCIAL_MEDIA_LINKS.map((link, index) => (
                        <motion.a
                            className="mt-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.5 }}
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
