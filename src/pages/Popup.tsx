import { useEffect } from 'react';
import "./Popup.css";

export default function () {
  useEffect(() => {
    console.log("Hello from the popup!");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-white">
      <img src="/icon-with-shadow.svg" />
      <h1>vite-plugin-web-extension</h1>
      <p className="text-white">
        Template
      </p>
    </div>
  )
}
