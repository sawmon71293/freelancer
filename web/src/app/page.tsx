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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
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
          </div>
        </div>
      </form>
    </div>
  );
}
