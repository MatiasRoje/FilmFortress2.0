"use client";

import Link from "next/link";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";

function FooterUserSection() {
  const { user, isAuthenticated } = useAuth();

  return isAuthenticated ? (
    ""
  ) : (
    <Button>
      <Link href="/login">Join the community</Link>
    </Button>
  );
}

export default FooterUserSection;
