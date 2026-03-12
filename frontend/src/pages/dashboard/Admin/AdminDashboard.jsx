import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import socket from "../../../socket";

import {
  Thermometer,
  Droplet,
  Leaf,
  Users,
  RefreshCcw,
  Wifi,
  Zap
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
  ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {

  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    moisture: 0
  });

  const [chartData, setChartData] = useState([]);

  const [connected, setConnected] = useState(false);

  const [userCount, setUserCount] = useState(0);

  const [events, setEvents] = useState([]);

  const [deviceStatus, setDeviceStatus] = useState([
    { name: "Sensor A1", type: "Temperature", status: "Online", time: "-" },
    { name: "Sensor B2", type: "Humidity", status: "Online", time: "-" },
    { name: "Pump C1", type: "Irrigation Pump", status: "Idle", time: "-" }
  ]);



  useEffect(() => {

    socket.connect();

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("sensorData", data => {

      setSensorData(data);

      setChartData(prev => [
        ...prev.slice(-19),
        {
          time: new Date().toLocaleTimeString(),
          ...data
        }
      ]);

      setDeviceStatus(ds =>
        ds.map(d =>
          data.device === d.name
            ? {
                ...d,
                status: data.status,
                time: new Date().toLocaleTimeString()
              }
            : d
        )
      );
    });

    socket.on("eventLog", log =>
      setEvents(prev => [log, ...prev.slice(0, 9)])
    );

    fetch("/api/users/count")
      .then(res => res.json())
      .then(data => setUserCount(data.count))
      .catch(() => setUserCount(0));

    return () => socket.disconnect();

  }, []);



  const handleRefresh = () => {
    socket.emit("requestSensorData");
  };

  const triggerPump = () => {
    socket.emit("triggerPump");
  };



  return (

    <>
      {/* HERO */}
      <section className="relative h-[70vh] flex flex-col justify-center items-center text-white text-center bg-gradient-to-tr from-green-900 via-green-700 to-lime-500">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl font-extrabold mb-6">
            🌾 AgroVision Admin Dashboard
          </h1>

          <p className="text-xl">
            Monitor smart agriculture sensors, devices, users, and farm
            analytics in real time.
          </p>
        </motion.div>

      </section>



      <main className="bg-gray-50 p-10 space-y-16 min-h-screen">


        {/* ADMIN OVERVIEW */}
        <section className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">

          <OverviewCard
            title="System Status"
            value={connected ? "Online" : "Offline"}
            color={connected ? "green" : "red"}
          />

          <OverviewCard
            title="Total Users"
            value={userCount}
            color="purple"
          />

          <OverviewCard
            title="Active Sensors"
            value="3"
            color="blue"
          />

          <OverviewCard
            title="Events Logged"
            value={events.length}
            color="amber"
          />

        </section>



        {/* REFRESH */}
        <div className="flex justify-end max-w-6xl mx-auto">

          <button
            onClick={handleRefresh}
            className="flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 shadow"
          >
            <RefreshCcw size={20} />
            Refresh Sensor Data
          </button>

        </div>



        {/* SENSOR CARDS */}
        <section className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">

          <SensorCard
            label="Temperature"
            value={`${sensorData.temperature} °C`}
            icon={Thermometer}
            color="red"
          />

          <SensorCard
            label="Humidity"
            value={`${sensorData.humidity} %`}
            icon={Droplet}
            color="blue"
          />

          <SensorCard
            label="Soil Moisture"
            value={sensorData.moisture}
            icon={Leaf}
            color="green"
          />

          <SensorCard
            label="Registered Users"
            value={userCount}
            icon={Users}
            color="purple"
          />

        </section>



        {/* SENSOR CHART */}
        <section className="bg-white p-8 rounded-2xl shadow max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-green-700 mb-6">
            📊 Sensor Analytics
          </h2>

          <ResponsiveContainer width="100%" height={400}>

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

        </section>



        {/* FIELD INFORMATION */}
        <section className="bg-white p-8 rounded-2xl shadow max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-green-700 mb-6">
            🌦 Field Environment
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <InfoBox title="Location" value="West Bengal Farm" />

            <InfoBox title="Crop Type" value="Rice 🌾" />

            <InfoBox title="Irrigation Mode" value="Automatic" />

          </div>

        </section>



        {/* DEVICE STATUS */}
        <section className="bg-white p-8 rounded-2xl shadow max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-green-700 mb-6">
            📡 IoT Devices
          </h2>

          <table className="w-full text-left">

            <thead className="bg-green-100">

              <tr>
                <th className="p-3">Device</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Seen</th>
              </tr>

            </thead>

            <tbody>

              {deviceStatus.map((d, i) => (

                <tr key={i} className="border-b">

                  <td className="p-3">{d.name}</td>

                  <td className="p-3">{d.type}</td>

                  <td className="p-3 font-semibold">{d.status}</td>

                  <td className="p-3 text-gray-500">{d.time}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </section>



        {/* USER MANAGEMENT */}
        <section className="bg-white p-8 rounded-2xl shadow max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            👥 User Management
          </h2>

          <table className="w-full">

            <thead className="bg-purple-100">

              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
              </tr>

            </thead>

            <tbody>

              <tr className="border-b">
                <td className="p-3">Example User</td>
                <td className="p-3">user@email.com</td>
                <td className="p-3">User</td>
                <td className="p-3 text-green-600">Active</td>
              </tr>

            </tbody>

          </table>

        </section>



        {/* CONTROL PANEL */}
        <section className="bg-white p-8 rounded-2xl shadow max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-green-700 mb-6">
            🔧 Control Panel
          </h2>

          <div className="flex gap-6">

            <button
              onClick={triggerPump}
              className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700"
            >
              <Zap size={18} />
              Trigger Irrigation Pump
            </button>

            <div className="flex items-center text-gray-600">
              <Wifi size={18} className="mr-2" />
              Devices Connected
            </div>

          </div>

        </section>



        {/* EVENT LOG */}
        <section className="bg-white p-8 rounded-2xl shadow max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-amber-700 mb-6">
            📋 System Events
          </h2>

          <ul className="space-y-3">

            {events.length === 0 && (
              <li className="text-gray-500">
                No system events recorded.
              </li>
            )}

            {events.map((e, i) => (
              <li key={i} className="bg-gray-100 p-3 rounded">
                {e}
              </li>
            ))}

          </ul>

        </section>


      </main>
    </>
  );
}



/* COMPONENTS */

function SensorCard({ label, value, icon: Icon, color }) {
  return (

    <Card className="p-6 text-center shadow">

      <CardContent>

        <Icon size={40} className={`mx-auto mb-3 text-${color}-500`} />

        <h3 className="text-lg font-semibold">{label}</h3>

        <p className={`text-3xl font-bold text-${color}-600`}>
          {value}
        </p>

      </CardContent>

    </Card>

  );
}



function OverviewCard({ title, value, color }) {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h4 className="text-gray-500">{title}</h4>

      <p className={`text-2xl font-bold text-${color}-600`}>
        {value}
      </p>

    </div>

  );

}



function InfoBox({ title, value }) {

  return (

    <div className="bg-green-50 p-6 rounded-xl">

      <h4 className="text-gray-500">{title}</h4>

      <p className="text-xl font-bold">
        {value}
      </p>

    </div>

  );

}