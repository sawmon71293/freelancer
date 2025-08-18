"use client";
import { useRouter } from "next/navigation";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("auth-tokent");
    if (!token) router.push("/");
  }, []);

  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
