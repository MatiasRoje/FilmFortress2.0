"use client";

import Link from "next/link";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Menu } from "@headlessui/react";

function NavBarUserSection() {
  const { user, isAuthenticated, logout } = useAuth();

  function handleSignOut(): void {
    logout();
  }

  return isAuthenticated ? (
    <li>
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Menu.Button
              className={`flex px-3 py-1 gap-1 items-center justify-center rounded focus:outline-none hover:bg-neutral-700 ${
                open && "bg-neutral-700"
              }`}
            >
              <span>
                <UserCircleIcon className="w-6 h-6" />
              </span>
              {user?.username}
              {open ? (
                <span>
                  <ChevronUpIcon className="w-4 h-4" />
                </span>
              ) : (
                <span>
                  <ChevronDownIcon className="w-4 h-4" />
                </span>
              )}
            </Menu.Button>
            <Menu.Items className="origin-top-right absolute mt-2 right-0 z-50 flex flex-col rounded bg-neutral-700 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={`py-2 px-4 rounded min-w-max ${
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
                    className={`py-2 px-4 rounded min-w-max ${
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
                  <Link
                    className={`py-2 px-4 rounded min-w-max ${
                      active && "bg-neutral-600"
                    }`}
                    href={`/users/${user?.id}/lists`}
                  >
                    Your lists
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`py-2 px-4 rounded text-left min-w-max ${
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
  ) : (
    <li>
      <Button>
        <Link href="/login">Sign in</Link>
      </Button>
    </li>
  );
}

export default NavBarUserSection;
