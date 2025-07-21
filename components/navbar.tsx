import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  DiscordIcon,
  SearchIcon,
  // HeroUiLogo,
  XiaoHongShuIcon,
} from "@/components/icons";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {/*<HeroUiLogo />*/}
            <p className="font-bold text-inherit">Simple Way</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "group relative transition-colors duration-200 px-2 py-1",
                  "hover:text-primary hover:font-semibold",
                  "data-[active=true]:text-primary data-[active=true]:font-bold"
                )}
                color="foreground"
                href={item.href}
                // 选中态判断
                data-active={typeof window !== 'undefined' && window.location.pathname === item.href}
              >
                {item.ch_label}
                {/* 底部彩色条 */}
                <span className="absolute left-0 -bottom-1 w-full h-0.5 scale-x-0 group-hover:scale-x-100 group-data-[active=true]:scale-x-100 bg-gradient-to-r from-primary to-violet-500 rounded transition-transform origin-left duration-200" />
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link
            isExternal
            aria-label="小红书"
            href={siteConfig.links.xiaohongshu}
          >
            <XiaoHongShuIcon className="text-default-500 w-5 h-5 transition-colors duration-200 hover:text-[#FF2E4D]" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500 transition-colors duration-200 hover:text-indigo-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500 transition-colors duration-200 hover:text-black" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        {/*<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>*/}
        {/*<NavbarItem className="hidden md:flex">*/}
        {/*  <Button*/}
        {/*    isExternal*/}
        {/*    as={Link}*/}
        {/*    className="text-sm font-normal text-default-600 bg-default-100"*/}
        {/*    startContent={<LanguageSwitchIcon className="text-primary" />}*/}
        {/*    variant="flat"*/}
        {/*  >*/}
        {/*    中文/EN*/}
        {/*  </Button>*/}
        {/*</NavbarItem>*/}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.ch_label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
