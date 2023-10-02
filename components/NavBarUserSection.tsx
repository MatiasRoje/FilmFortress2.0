"use client";

import Link from "next/link";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  UserCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { Menu } from "@headlessui/react";

function NavBarUserSection() {
  const { user, isAuthenticated, logout } = useAuth();

  function handleSignOut(): void {
    logout();
  }

  return isAuthenticated ? (
    <>
      <li className="ml-auto rounded px-3 py-1 hover:bg-neutral-700">
        <Link href={`/users/${user?.id}/watchlist`}>
          <div className="flex gap-1">
            <span>
              <PlusCircleIcon className="h-6 w-6" />
            </span>
            Watchlist
          </div>
        </Link>
      </li>
      <li>
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Button
                className={`flex items-center justify-center gap-1 rounded px-3 py-1 hover:bg-neutral-700 focus:outline-none ${
                  open && "bg-neutral-700"
                }`}
              >
                <span>
                  <UserCircleIcon className="h-6 w-6" />
                </span>
                {user?.username}
                {open ? (
                  <span>
                    <ChevronUpIcon className="h-4 w-4" />
                  </span>
                ) : (
                  <span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </span>
                )}
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-50 mt-2 flex origin-top-right flex-col rounded bg-neutral-700 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`min-w-max rounded px-4 py-2 ${
                        active && "bg-neutral-600"
                      }`}
                      href={`/users/${user?.id}/reviews`}
                    >
                      Your reviews
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`min-w-max rounded px-4 py-2 ${
                        active && "bg-neutral-600"
                      }`}
                      href={`/users/${user?.id}/watchlist`}
                    >
                      Your watchlist
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`min-w-max rounded px-4 py-2 ${
                        active && "bg-neutral-600"
                      }`}
                      href={`/users/${user?.id}/ratings`}
                    >
                      Your ratings
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`min-w-max rounded px-4 py-2 text-left ${
                        active && "bg-neutral-600"
                      }`}
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </>
          )}
        </Menu>
      </li>
    </>
  ) : (
    <>
      <li className="ml-auto rounded px-3 py-1 hover:bg-neutral-700">
        <Link href="/login">
          <div className="flex gap-1">
            <span>
              <PlusCircleIcon className="h-6 w-6" />
            </span>
            Watchlist
          </div>
        </Link>
      </li>
      <li>
        <Button href="/login">Sign in</Button>
      </li>
    </>
  );
}

export default NavBarUserSection;
