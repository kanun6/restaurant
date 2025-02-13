type NavLinks ={
    href:string
    label:string
    role?: "marketing_admin" | "Member"; // เพิ่ม Role สำหรับลิงก์
  };

export const links:NavLinks[] = [
  { href: "/", label: "home" },
  { href: "/Dashboard", label: "dashboard", role: "marketing_admin" },
  { href: "/profile", label: "profile" },
  { href: "/food", label: "food" },
  { href: "/table", label: "table" },
  { href: "/favorite", label: "favorite" },
  { href: "/about", label: "about" },
  { href: "/help", label: "help" },
];

