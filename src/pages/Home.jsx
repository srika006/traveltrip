import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div>
          <h1 className="text-5xl font-extrabold text-blue-900 leading-tight mb-6">
            Travel. <br />
            Relax. <br />
            Memories.
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            With travel trip you can experience new travel and the best tourist
            destinations.
          </p>
          <Link
            to="/book-a-new-trip"
            className="bg-blue-900 text-white px-6 py-3 rounded-md shadow hover:bg-blue-800 transition"
          >
            Book a New Trip
          </Link>
        </div>

      
        <div className="flex justify-center">
          <img
            src="https://www.vicpakconsultant.com/wp-content/uploads/2025/05/banner.png"
            alt="Traveler"
            className="max-h-[500px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
