"use client";

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
import { useUser, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import SignOutLinks from "./SignOutLinks";

const DropdownListMenu = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "user";  

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

          {/* สำหรับผู้ที่ยังไม่ได้ Login */}
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

          {/*  สำหรับผู้ที่ Login แล้ว */}
          <SignedIn>
            {links.map((item, index) => {
              //  เช็ค Role ถ้าลิงก์นี้สำหรับ Admin แต่ผู้ใช้ไม่ใช่ Admin จะไม่แสดง
              if (item.role && item.role !== role) return null;

              return (
                <DropdownMenuItem key={index}>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              );
            })}

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
