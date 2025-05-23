import {
  Home,
  BookMarked,
  Tickets,
  ChartLine,
  Shield,
  User2,
  ChevronUp,
  LampDesk,
  type LucideIcon,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/app/_components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/app/_components/ui/sidebar";

interface Item {
  title: string;
  url: string;
  icon?: LucideIcon;
  subitems?: Item[];
}

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Tickets",
    url: "/tickets",
    icon: Tickets,
    subitems: [
      { title: "My Tickets", url: "/tickets/my-tickets" },
      { title: "My Work", url: "/tickets/my-work" },
      { title: "All Work", url: "/tickets/all-tickets" },
    ],
  },
  {
    title: "Docs",
    url: "/docs",
    icon: BookMarked,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartLine,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: Shield,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/home">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <LampDesk size="1.25rem" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Lantern</span>
                  <span className="truncate text-xs">Service Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <WithCollapsible
                  key={item.title}
                  isCollapsible={!!item.subitems}
                >
                  <SidebarMenuItem>
                    <WithCollapsibleTrigger isCollapsible={!!item.subitems}>
                      <SidebarMenuButton asChild>
                        <MenuItem {...item} />
                      </SidebarMenuButton>
                    </WithCollapsibleTrigger>
                    {item.subitems && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subitems.map((subitem) => (
                            <SidebarMenuSubItem key={subitem.title}>
                              <SidebarMenuSubButton asChild>
                                <MenuItem {...subitem} />
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </WithCollapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/zyrrus.png"
                      alt="Zyrrus"
                    />
                    <AvatarFallback>Z</AvatarFallback>
                  </Avatar>
                  Zyrrus
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end">
                <DropdownMenuItem>
                  <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

type CollapsibleHOC = React.FC<
  React.PropsWithChildren<{ isCollapsible: boolean }>
>;

const WithCollapsible: CollapsibleHOC = ({
  isCollapsible = false,
  children,
}) =>
  isCollapsible ? (
    <Collapsible defaultOpen className="group/collapsible">
      {children}
    </Collapsible>
  ) : (
    children
  );

const WithCollapsibleTrigger: CollapsibleHOC = ({
  isCollapsible = false,
  children,
}) =>
  isCollapsible ? (
    <CollapsibleTrigger asChild>{children}</CollapsibleTrigger>
  ) : (
    children
  );

const MenuItem: React.FC<Item> = ({ title, url, icon: Icon, subitems }) => (
  <Link href={url}>
    {Icon && <Icon />}
    <span>{title}</span>
    {subitems && (
      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
    )}
  </Link>
);
