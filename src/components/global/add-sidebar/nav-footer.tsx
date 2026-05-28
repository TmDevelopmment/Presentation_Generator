"use client"

import { Button } from '@/components/ui/button';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { User } from '@/generated/prisma/browser'
import { UserButton, useUser, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {

    const { isLoaded, isSignedIn, user } = useUser();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if (!isLoaded || !isSignedIn || !user) {
        return null
    }

    const handleUpgrade = () => {
        setLoading(true);
        router.push("/pricing");
    }

  return (
    <SidebarMenu>
        <SidebarMenuItem>
            <div className="flext flex-col gap-y-6 items-center group-data-[collapsible=icon]:hidden">
                {!prismaUser.subscription && (
                    <div className="flex flex-col items-center gap-y-2 p-2 bg-background rounded-lg">
                        <p className="text-sm text-center text-sidebar-primary-foreground">Get
                            <span className="text-vivid"> Creative AI</span>
                        </p>
                        <span className="text-xs text-sidebar-secondary-foreground text-center">
                                Unlock all features including AI-generated slides, templates, and more.
                            </span>
                        <div className="w-full px-4 border-t border-sidebar-primary-80 bg-vivid-gradient pt-4">
                            <Button
                            className="w-full border-vivid bg-background-80 text-vivid hover:bg-background rounded-full"
                            variant="outline"
                            size="lg"
                            onClick={() => {handleUpgrade()}}
                            disabled={loading}
                            >
                            {loading ? "Upgrading..." : "Upgrade Now"}
                        </Button>
                        </div>
                    </div>
                )}

                <SignInButton>
                    <SidebarMenuButton 
                    size="lg"
                    className="data-[state=open]
                    :text-sidebar-accent-foreground
                    :bg-sidebar-accent data-[state=open]">
                        <UserButton />
                        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                            <span className="text-sm font-medium">{user.firstName}</span>
                            <span className="text-xs text-sidebar-secondary-foreground">{user.emailAddresses[0].emailAddress}</span>
                        </div>
                    </SidebarMenuButton>
                </SignInButton>
            </div>
        </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default NavFooter