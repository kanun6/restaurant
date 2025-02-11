import Image from "next/image";

const ImageContainer = ({
  mainImage,
  name,
}: {
  mainImage: string;
  name: string;
}) => {
  return <section className="relative mt-8">
    <Image 
    src={mainImage}
    sizes="100vw"
    alt={name}
    width={500}
    height={500}
    priority
    className="object-cover rounded-md"
    />
  </section>;
};
export default ImageContainer;
