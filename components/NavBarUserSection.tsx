"use client";

import Link from "next/link";
import Button from "./Button";
import { useAuth } from "@/providers/AuthContext";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Menu } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useUserWatchlist } from "@/hooks/useUserWatchlist";
import { signOut, useSession } from "next-auth/react";

function NavBarUserSection() {
  const { data: session } = useSession();

  function handleSignOut(): void {
    signOut();
  }

  const { userWatchlist } = useUserWatchlist(session?.user?.id);

  return session?.user ? (
    <>
      <li>
        <Link
          href={`/users/${session.user.id}/watchlist`}
          className="hidden gap-1 rounded px-3 py-1 hover:bg-neutral-700 md:flex"
        >
          <span>
            <PlusCircleIcon className="h-6 w-6" />
          </span>
          Watchlist
          {userWatchlist && <span>—{userWatchlist.movieIds.length}</span>}
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
                {session.user.username}
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
              <Menu.Items className="absolute right-0 z-50 mt-2 flex origin-top-right flex-col rounded bg-neutral-700 shadow-lg focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`min-w-max rounded px-4 py-2 ${
                        active && "bg-neutral-600"
                      }`}
                      href={`/users/${session.user.id}/reviews`}
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
                      href={`/users/${session.user.id}/watchlist`}
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
                      href={`/users/${session.user.id}/ratings`}
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
      <li className="ml-auto hidden rounded px-3 py-1 hover:bg-neutral-700 md:block">
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
