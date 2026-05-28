import { User } from "@/generated/prisma/browser";
import {SidebarTrigger} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import SearchBar from "@/components/global/upper-info-bar/upper-info-searchbar";
import ThemeSwitcher from "@/components/global/mode-toggle/index";
import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewProjectButton from "./new-project-button";

type Props = {
    user: User
    children?: React.ReactNode
}

const UpperInfoBar = ({ user, children }: Props) => {
  return (
    <header className="sticky top-0 z-10 flex shrink-0 flex-wrap items-center gap-2 border-b bg-background p-4 justify-between">
      <SidebarTrigger />
      <Separator 
      orientation="vertical"
      className="mr-2 h4"/>

      <div className="w-full max-w-7xl flex items-center justify-between gap-4 flex-wrap">
        <SearchBar />
        <ThemeSwitcher />
        <div className="flex flex-wrap gap-4 items-center justify-end">
          <Button className="bg-primary-80 rounded-lg hover:bg-background-80 text-primary font-semibold">
          <DownloadIcon className="h-4 w-4" />
          Import
        </Button>
        <NewProjectButton user={user} />
        </div>
      </div>

    </header>
  )
}

export default UpperInfoBar;