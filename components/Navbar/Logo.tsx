import Link from "next/link";
import Image from "next/image"; // ✅ นำเข้า next/image


const Logo = () => {
  return (
    
      <Link href="/">
        <Image sizes="sm" 
          src="/images/logo_restaurant.png"  // ✅ ใช้ path ของโลโก้
          alt="Restaurant Logo"
          width={40}  // ✅ ปรับขนาดให้เหมาะสม
          height={40}
        />
      </Link>
    
  );
};

export default Logo;
