import { AlignLeft } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Usericon from "./Usericon";
import Link from "next/link";
import { links } from "@/utils/links";

import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import SignOutLinks from "./SignOutLinks";

const DropdownListMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <div className="flex items-center gap-2">
            <AlignLeft />
            <Usericon />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent asChild>
        <div>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <SignedOut>
            <DropdownMenuItem>
              <SignInButton mode="modal">
                <button>Login</button>
              </SignInButton>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignUpButton mode="modal">
                <button>Register</button>
              </SignUpButton>
            </DropdownMenuItem>
          </SignedOut>
          <SignedIn>
            {links.map((items, index) => (
              <DropdownMenuItem key={index}>
                <Link href={items.href}>{items.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutLinks />
            </DropdownMenuItem>
          </SignedIn>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownListMenu;
