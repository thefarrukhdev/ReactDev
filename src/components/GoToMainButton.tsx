"use client";

import { useRouter } from "next/navigation";
import React from "react";

const GoToMainButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/Components")} // to'g'ridan-to'g'ri sahifaga yo'naltiradi
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
    >
      Go to Components
    </button>
  );
};

export default GoToMainButton;
