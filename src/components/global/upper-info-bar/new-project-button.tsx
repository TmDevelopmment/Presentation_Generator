"use client"

import { Button } from "@/components/ui/button";
import { User } from "@/generated/prisma/browser";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const NewProjectButton = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <Button
      size={"lg"}
      className="rounded-lg font-semibold"
      disabled={!user.subscription}
      onClick={() => router.push("/create-page")}
    >
      <PlusIcon className="h-4 w-4" />
      New Project
    </Button>
  );
};

export default NewProjectButton;
