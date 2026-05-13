import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vielen Dank | Rohrreinigung Kraft",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
