import React from "react";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center">
      <div>{children}</div>
    </section>
  );
}
