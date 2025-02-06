type NavLinks ={
    href:string
    label:string
    role?: "marketing_admin" | "Member"; // เพิ่ม Role สำหรับลิงก์
  };

export const links:NavLinks[] = [
  { href: "/", label: "home" },
  { href: "/profile", label: "profile" },
  { href: "/food", label: "food" },
  { href: "/add_food", label: "add food", role: "marketing_admin" },
  { href: "/table", label: "table" },
  { href: "/add_table", label: "add table", role: "marketing_admin" },
  { href: "/favorite", label: "favorite" },
  { href: "/about", label: "about" },
  { href: "/help", label: "help" },
];

