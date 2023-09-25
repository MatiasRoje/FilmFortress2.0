"use client";

import Link from "next/link";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";

function NavBarUserSection() {
  const { user, isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <p>{user?.username}</p>
  ) : (
    <Button>
      <Link href="/login">Sign in</Link>
    </Button>
  );
}

export default NavBarUserSection;
