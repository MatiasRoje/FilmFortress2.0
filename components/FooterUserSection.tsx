"use client";

import Link from "next/link";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";

function FooterUserSection() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    ""
  ) : (
    <Button href="/login">Join the community</Button>
  );
}

export default FooterUserSection;
