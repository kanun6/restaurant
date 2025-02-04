import Link from "next/link";
import Image from "next/image"; 


const Logo = () => {
  return (
    
      <Link href="/">
        <Image sizes="sm" 
          src="/images/logo_restaurant.png"  
          alt="Restaurant Logo"
          width={75}  
          height={75}
        />
      </Link>
    
  );
};

export default Logo;
