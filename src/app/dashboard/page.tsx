import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect("/login");

  // Route to the appropriate dashboard
  if (user.role === "SELLER" || user.role === "ADMIN") {
    redirect("/dashboard/seller");
  } else {
    redirect("/dashboard/buyer");
  }
}
