"use client";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-6 ">
     
        <div className="text-center text-gray-400 text-sm flex justify-between">
          <p>© {currentYear} Game Info. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            Build by :{" "}
            <Link
              href="
            https://github.com/sanketpathare"
              target="_blank"
            className="underline"
            >
                Sanket Pathare
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
