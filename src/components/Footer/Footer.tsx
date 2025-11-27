export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6">

        <div className="flex flex-col md:flex-row justify-between items-center">

          {/* LEFT SIDE */}
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} PatientNode. All rights reserved.
          </p>

          {/* RIGHT SIDE */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-700 hover:text-primary text-sm font-medium transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-primary text-sm font-medium transition-colors"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-primary text-sm font-medium transition-colors"
            >
              Contact
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}