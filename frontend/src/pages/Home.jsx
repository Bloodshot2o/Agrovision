import {BarChart3, Droplets, Thermometer } from "lucide-react";
import farmBg from "../components/bg-image/image2.jpg";

const Home = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen text-white"
      style={{ backgroundImage: `url(${farmBg})` }}
    >
      <div className="bg-black/60 min-h-screen">

        {/* HERO SECTION */}
        <div className="flex flex-col justify-center items-center text-center px-6 pt-40 pb-24">

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            🌿 AgroVision
          </h1>

          <p className="text-xl md:text-2xl max-w-2xl text-green-100 mb-8">
            Smart agriculture monitoring system powered by IoT sensors.
            Track temperature, humidity and soil moisture in real-time.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <a
              href="/dashboard/user"
              className="bg-green-600 px-8 py-3 rounded-full hover:bg-green-700 transition shadow-xl"
            >
              Open Dashboard
            </a>

            <a
              href="/about"
              className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8">

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-center hover:scale-105 transition">
            <Thermometer size={40} className="mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-bold mb-2">Temperature Tracking</h3>
            <p className="text-green-100">
              Monitor environmental temperature in real time to maintain ideal crop conditions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-center hover:scale-105 transition">
            <Droplets size={40} className="mx-auto mb-4 text-blue-400" />
            <h3 className="text-2xl font-bold mb-2">Soil Moisture</h3>
            <p className="text-green-100">
              Get accurate soil moisture readings to optimize irrigation and water usage.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-center hover:scale-105 transition">
            <BarChart3 size={40} className="mx-auto mb-4 text-green-400" />
            <h3 className="text-2xl font-bold mb-2">Live Data Analytics</h3>
            <p className="text-green-100">
              View historical and real-time sensor data from your smart farm dashboard.
            </p>
          </div>

        </div>

        {/* CTA SECTION */}
        <div className="text-center pb-20 px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Monitoring Your Farm Today 🌱
          </h2>

          <a
            href="/login"
            className="bg-gradient-to-r from-green-500 to-yellow-500 px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            Get Started
          </a>
        </div>

      </div>
    </div>
  );
};

export default Home;