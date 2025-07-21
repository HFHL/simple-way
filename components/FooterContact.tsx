import React from "react";
import { Link } from "@heroui/link";

import { contactList } from "./list/ContactList";

export default function FooterContact() {
  return (
    <footer className="w-full bg-gradient-to-t from-gray-50 to-white border-t border-default-200 pt-10 pb-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col gap-0 sm:flex-row sm:justify-between sm:items-start px-2 sm:px-4">
          {contactList.map((item, idx) => (
            <div
              key={idx}
              className={`
                flex items-center gap-4
                mb-4 sm:mb-0
                bg-white shadow rounded-xl px-4 py-4
                sm:bg-transparent sm:shadow-none sm:rounded-none sm:px-0 sm:py-0
                w-full sm:w-auto
                max-w-xs mx-auto
              `}
            >
              {item.isImage ? (
                <img
                  alt={item.title}
                  className="w-16 h-16 rounded object-contain"
                  src={item.icon}
                />
              ) : (
                <span className="text-3xl">{item.icon}</span>
              )}
              <div className="flex flex-col">
                <div className="font-semibold text-base sm:text-base text-gray-800 text-center sm:text-left">
                  {item.title}
                </div>
                <div className="text-sm sm:text-sm text-gray-500 text-center sm:text-left">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full text-center text-xs text-gray-400 pt-6 mt-2">
          <Link
            isExternal
            className="gap-1 text-current"
            href="https://www.simpleway.xyz"
            title="Simple Way homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary font-semibold">Simple Way</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
