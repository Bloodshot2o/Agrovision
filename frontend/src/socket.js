// socket.js
import { io } from "socket.io-client";


const socket = io("http://agrovision-6cl7.onrender.com", {
  autoConnect: false,
  auth: {
    token: localStorage.getItem("token"),
  },
});

export default socket;
