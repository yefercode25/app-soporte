import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Sidebar } from "@/components";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "@/providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "App Soporte",
  description: "Aplicación web para llevar el soporte de las actividades diarias.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  process.env.TZ = "America/Bogota";
  
  return (
    <html lang="es-CO">
      <body className={montserrat.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-200">
            <Sidebar />
            <div className="xl:p-4 xl:ml-80">
              <div className="px-5 py-5 xl:rounded-xl w-full text-gray-800 h-[calc(100lvh-32px)] xl:shadow bg-white overflow-y-auto scrollbar">
                {children}
              </div>
            </div>
            <Toaster
              richColors
              closeButton
              visibleToasts={5}
              position={'bottom-right'}
              duration={3000}
              style={{
                fontFamily: 'Montserrat',
              }}
            />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
