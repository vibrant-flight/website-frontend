import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-300 py-12 px-6 md:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <Image src={"/banner.png"} alt="banne" width={200} height={200}></Image>
          <p className="mt-4 text-sm leading-relaxed max-w-sm">
            Premium clothing & accessories — curated essentials & seasonal drops.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Customer</h3>
          <ul className="space-y-2 text-sm">
            <Link href={"/about-us"}>
              <li className="hover:text-white cursor-pointer">About Us</li>
            </Link>
            <Link href={"/return-or-cancellation"}>
              <li className="hover:text-white cursor-pointer">Returns & cancellation</li>
            </Link>
            <Link href={"/shipping-and-delivery"}>
              <li className="hover:text-white cursor-pointer">Shipping Policy</li>
            </Link>
            <Link href={"/privacy-policy"}>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            </Link>
            <Link href={"/terms-and-conditions"}>
              <li className="hover:text-white cursor-pointer">Terms And Conditions</li>
            </Link>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-sm mb-4">sandeeps21788@gmail.com</p>
          <h3 className="text-xl font-semibold mb-3">Follow</h3>
          <div className="flex items-center space-x-4">
            <Link href={"https://www.instagram.com/vibrant_flight?igsh=N3VycHZybG16c3M1"}>
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-white cursor-pointer">
                <FaInstagram />
              </div>
            </Link>
            <Link href={"https://youtube.com/@vibrant_flight.00?si=tiG3zoWoCefIjqnO"}>
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-white cursor-pointer">
                <FaYoutube />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
        <p>
          © 2025 Vibrant Flight — All rights reserved · Privacy Policy · Refund Policy · Terms & Conditions · <Link href="https://www.linkedin.com/in/vennachandrasekhar" target="_blank">Developed by Sekhar</Link>
        </p>
      </div>
    </footer>
  );
}
