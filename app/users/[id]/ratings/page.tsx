"use client";

import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function UserRatingsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  return <div>Ratings</div>;
}

export default UserRatingsPage;
