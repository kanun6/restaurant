import { UserButton } from "@clerk/nextjs";

// function Navbar() {
//     return (
//       <nav style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
//         <Navbar />
//         <SignedIn>
//           {/* Mount the UserButton component */}
//           <UserButton />
//         </SignedIn>
//         <SignedOut>
//           {/* Signed out users get sign in button */}
//           <SignInButton />
//         </SignedOut>
//       </nav>
//     )
//   }

const Usericon = () => {
  return (
    <>
      <UserButton />
    </>
  );
};
export default Usericon;
