import Link from "next/link";

type ILinkWrapper = {
  href?: string;
  children: JSX.Element | JSX.Element[];
  disabled?: boolean;
};

export const LinkWrapper = ({ href, children, disabled }: ILinkWrapper) => {
  return href && !disabled ? (
    <Link href={href}>{children}</Link>
  ) : (
    <>{children}</>
  );
};
