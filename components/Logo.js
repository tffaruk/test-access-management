import { Link } from "@mui/material";

const Logo = () => {
  return (
    <Link href="/" sx={{ fontSize: "1.5rem", textDecoration: "none" }}>
      {/* <Image
        src="/images/logo.png"
        alt="gethugothemes admin"
        width="300"
        height="100"
        loading="eager"
        priority
      /> */}
      Access Management
    </Link>
  );
};

export default Logo;
