import Image from 'next/image';

const Logo = ({ ...props }) => (
  <Image
    src="/ahr.png"
    alt="AHR Logo"
    className="rounded-full"
    width={40}
    height={40}
    {...props}
  />
);

export default Logo;
