"use client";

import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function UserReviewsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  return <div>Reviews</div>;
}

export default UserReviewsPage;
