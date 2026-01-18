import { type NavLinkProps, NavLink } from "react-router";

export function AppNavLink({ children, ...props }: Readonly<NavLinkProps>) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        [
          isActive ? "border-b-2" : undefined,
          "block py-2 px-3 text-white bg-brand rounded-sm md:bg-transparent md:text-fg-brand text-heading hover:bg-neutral-tertiary md:hover:bg-transparent md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}
