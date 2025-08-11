"use client";

import { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formIsValid = validate();
    if (!formIsValid) {
      return;
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
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="p-2 flex items-center justify-center flex-col w-full max-w-md"
      >
        <div className="w-full">
          <div className="mb-2">
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="text"
            placeholder="Please enter email"
            className="border border-gray-50 p-2 rounded mb-2 w-full"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
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
              className="border border-gray-50 p-2 rounded w-full"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
          </div>
          <div className="flex items-center w-full">
            <button
              type="submit"
              className="border border-gray-50 p-2 rounded-md mt-4 w-full"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
