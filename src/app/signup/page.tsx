// app/signup/page.tsx
"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import MainLayouts from "@/components/layout/MainLayouts";
import { signIn } from "next-auth/react";  // Import signIn from NextAuth

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
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
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setMessage("Signup failed.");
        return;
      }

      setMessage("User signup successful!");
      router.push("/login");
    } catch (error: unknown) {
      setMessage("An unexpected error occurred.");
    }
  };

  // Google login handler using NextAuth
  const handleGoogleLogin = () => {
    signIn("google");  // This triggers Google login and account picker
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
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="border p-2 w-full mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="border p-2 w-full mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 w-full mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 w-full mb-2"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>

          {message && (
            <p className="text-center text-sm text-red-500 mt-4">{message}</p>
          )}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              className="text-indigo-600 hover:underline"
              onClick={() => router.push("/login")}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </MainLayouts>
  );
};

export default SignupPage;
