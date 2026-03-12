import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import socket from "../../../socket";

import {
  Thermometer,
  Droplet,
  Leaf,
  CloudSun,
  RefreshCcw,
  Server,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent } from "../../../components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function UserDashboard() {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    moisture: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [connected, setConnected] = useState(false);

  const deviceStatus = [
    { name: "Temperature Sensor", type: "Temperature", status: "Offline" },
    { name: "Humidity Sensor", type: "Humidity", status: "Offline" },
    { name: "Soil Moisture Probe", type: "Moisture", status: "Offline" },
  ];

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("sensorData", (data) => {
      setSensorData(data);

      setChartData((prev) => [
        ...prev.slice(-19),
        {
          time: new Date().toLocaleTimeString(),
          ...data,
        },
      ]);
    });

    return () => socket.disconnect();
  }, []);

  const handleRefresh = () => {
    socket.emit("requestSensorData");
  };

  return (
    <main className="bg-gray-50 min-h-screen pt-24 pb-10 px-6 space-y-10">

      {/* DASHBOARD HEADER */}

      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Farm Monitoring Dashboard
          </h1>

          <p className="text-gray-500">
            Real-time environmental sensor overview
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700"
        >
          <RefreshCcw size={18} />
          Refresh Data
        </motion.button>

      </div>

      {/* SYSTEM STATUS */}

      <Card className="max-w-7xl mx-auto shadow-md border border-gray-200">

        <CardContent className="flex items-center justify-between p-6">

          <div className="flex items-center gap-3">
            <Server className="text-gray-600" />
            <span className="font-semibold text-gray-700">
              System Connection
            </span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              connected
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {connected ? "Connected" : "Disconnected"}
          </span>

        </CardContent>

      </Card>

      {/* SENSOR CARDS */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >

        <SensorCard
          label="Temperature"
          value={`${sensorData.temperature}°C`}
          icon={Thermometer}
        />

        <SensorCard
          label="Humidity"
          value={`${sensorData.humidity}%`}
          icon={Droplet}
        />

        <SensorCard
          label="Soil Moisture"
          value={sensorData.moisture}
          icon={Leaf}
        />

      </motion.div>

      {/* CHART */}

      <Card className="max-w-7xl mx-auto shadow-lg border border-gray-200">

        <CardContent className="p-6">

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Sensor Activity
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="moisture"
                stroke="#10b981"
                strokeWidth={3}
              />

            </LineChart>
          </ResponsiveContainer>

        </CardContent>

      </Card>

      {/* DEVICE STATUS */}

      <Card className="max-w-7xl mx-auto shadow-lg border border-gray-200">

        <CardContent className="p-6">

          <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <AlertTriangle size={18} />
            Device Status
          </h2>

          <table className="min-w-full text-left">

            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2">Device</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {deviceStatus.map((d, i) => (
                <tr key={i} className="border-b">

                  <td className="py-3">{d.name}</td>
                  <td>{d.type}</td>

                  <td>
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                      Offline
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </CardContent>

      </Card>

      {/* WEATHER + TIP */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">

        <Card className="shadow-md">

          <CardContent className="p-6 flex items-center gap-4">

            <CloudSun className="text-yellow-500" size={35} />

            <div>
              <p className="font-semibold text-gray-700">Today's Weather</p>
              <p className="text-gray-500">Sunny · 32°C · Humidity 58%</p>
            </div>

          </CardContent>

        </Card>

        <Card className="shadow-md">

          <CardContent className="p-6">

            <p className="font-semibold text-gray-700 mb-1">
              Farming Tip
            </p>

            <p className="text-gray-500">
              Water crops early in the morning to reduce evaporation
              and improve soil absorption.
            </p>

          </CardContent>

        </Card>

      </div>

    </main>
  );
}

/* SENSOR CARD */

function SensorCard({ label, value, icon: Icon }) {
  return (
    <Card className="shadow-md border border-gray-200 hover:shadow-xl transition">

      <CardContent className="p-6 flex items-center justify-between">

        <div>
          <p className="text-gray-500">{label}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>

        <Icon className="text-gray-600" size={35} />

      </CardContent>

    </Card>
  );
}