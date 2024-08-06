import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Operant Pharmacy Federation
          </h3>
          <p>Advancing pharmacy through research and innovation.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/research">Research</Link>
            </li>
            <li>
              <Link href="/innovations">Innovations</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p>123 Pharmacy Street</p>
          <p>Research City, RC 12345</p>
          <p>contact@operantpharmacy.com</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            {/* Add social media icons/links here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
