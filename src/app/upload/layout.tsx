import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload | Rohrreinigung Kraft",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
