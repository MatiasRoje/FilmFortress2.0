"use client";

import { useSession } from "next-auth/react";
import Button from "./Button";

function FooterUserSection() {
  const { data: session } = useSession();

  return session ? "" : <Button href="/login">Join the community</Button>;
}

export default FooterUserSection;
