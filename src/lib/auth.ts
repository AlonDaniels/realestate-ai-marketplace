import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export async function getDbUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { clerkId: userId },
  });

  return user;
}

export async function requireDbUser() {
  const user = await getDbUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireSeller() {
  const user = await requireDbUser();
  if (user.role !== "SELLER" && user.role !== "ADMIN") {
    throw new Error("Seller access required");
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireDbUser();
  if (user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }
  return user;
}
