import Link from "next/link";
import Image from "next/image"; 

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo_restaurant.png"  
        alt="Restaurant Logo"
        width={75}  
        height={75}
        className="rounded-full border border-gray-300 shadow-md"
      />
    </Link>
  );
};

export default Logo;
