import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "App Soporte",
  description: "Aplicación web para llevar el soporte de las actividades diarias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <div className="min-h-screen bg-gray-200">
          <Sidebar />
          <div className="xl:p-4 xl:ml-80">
            <div className="px-5 py-5 xl:rounded-xl w-full text-gray-800 h-[calc(100lvh-32px)] xl:shadow bg-white overflow-y-auto scrollbar">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
