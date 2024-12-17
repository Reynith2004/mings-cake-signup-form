"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import MainLayouts from "@/components/layout/MainLayouts";

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();

      if (!res.ok) {
        setMessage("Login failed: " + text);
        return;
      }

      const data = JSON.parse(text);
      setMessage("Logged in successfully!");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Login error:", error);
      setMessage("Unexpected error occurred.");
    }
  };

  return (
    <MainLayouts>
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnQlMjBwbGFubmluZ3xlbnwwfHwwfHx8MA%3D%3D")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 bg-white bg-opacity-90 p-10 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Log In
              </button>
            </div>
          </form>
          {message && (
            <p className="text-center text-sm text-red-500 mt-4">{message}</p>
          )}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-indigo-600 hover:underline"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </MainLayouts>
  );
};

export default LoginPage;
