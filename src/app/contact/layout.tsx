import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | The Laundry Project",
  description:
    "Get in touch with The Laundry Project. Message us on Facebook Messenger, call, or send an inquiry — we're happy to help with pickup, delivery, and laundry questions.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
