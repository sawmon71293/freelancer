"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formIsValid = validate();
    if (!formIsValid) {
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include", // ✅ important: send cookies cross-origin
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        toast(`${errorData.message}`);
        return;
      }
      toast("Login Successful!");
    } catch (error) {
      console.log(error);
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.email) newErrors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required!";
    else if (formData.password.length < 6)
      newErrors.password = "Password is too short!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="p-2 flex items-center justify-center flex-col w-full max-w-md"
      >
        <div className="w-full">
          <div className="mb-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
          </div>
          <input
            type="text"
            placeholder="Please enter email"
            className="border border-gray-300 focus:border-blue-500 p-2 rounded mb-2 w-full"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email}</span>
          )}
        </div>

        <div className="w-full">
          <div className="mb-2">
            <label htmlFor="password">Password</label>
          </div>
          <div className="w-full">
            <input
              name="password"
              type="password"
              placeholder="Please enter password"
              className="border border-gray-300 focus:border-blue-500 p-2 rounded w-full"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password}</span>
            )}
          </div>
          <div className="flex items-center w-full">
            <button
              type="submit"
              className="border border-gray-300 p-2 rounded-md focus:border-blue-500 mt-4 w-full"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
