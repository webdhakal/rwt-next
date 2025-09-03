'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shadcn/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shadcn/ui/sidebar';
import { Link } from '@inertiajs/react';
import { cn } from '../lib/utils';
import * as LucideIcons from 'lucide-react';
import { memo, useMemo } from 'react';

// Define SidebarItem type for type safety
interface SidebarItem {
  title: string;
  url?: string;
  icon?: string;
  isActive?: boolean;
  group?: string;
  items?: SidebarItem[];
}

// Map string icon names to Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard: LucideIcons.LayoutDashboard,
  BookOpen: LucideIcons.BookOpen,
  Bot: LucideIcons.Bot,
  ShieldEllipsis: LucideIcons.ShieldEllipsis,
  Users: LucideIcons.Users,
  Database: LucideIcons.Database,
  Images: LucideIcons.Images,
  ShoppingBasket: LucideIcons.ShoppingBasket,
  TicketSlash: LucideIcons.TicketSlash,
  Gift: LucideIcons.Gift,
  // Add more icons as needed
};

interface SidebarNavMenuProps {
  items: SidebarItem[];
}

// Reusable component for rendering a single menu item
const MenuItem = memo(({ item }: { item: SidebarItem }) => {
  const Icon = item.icon && iconMap[item.icon] ? iconMap[item.icon] : null;

  if (item.items) {
    return (
      <Collapsible
        defaultOpen={item.isActive}
        className="group/collapsible"
        asChild
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={item.title}
              aria-expanded={item.isActive ? 'true' : 'false'}
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map((subItem) => {
                const SubIcon = subItem.icon && iconMap[subItem.icon] ? iconMap[subItem.icon] : null;
                return (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton
                      asChild
                      className={cn(
                        subItem.isActive &&
                        'bg-primary text-white hover:bg-primary hover:text-white',
                      )}
                    >
                      {subItem.url ? (
                        <Link href={subItem.url}>
                          {SubIcon && <SubIcon className="mr-2 h-4 w-4" />}
                          <span>{subItem.title}</span>
                        </Link>
                      ) : (
                        <span>{subItem.title}</span>
                      )}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        className={cn(
          item.isActive && 'bg-primary text-white hover:bg-primary hover:text-white',
        )}
      >
        {item.url ? (
          <Link href={item.url}>
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            <span>{item.title}</span>
          </Link>
        ) : (
          <span>{item.title}</span>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

// Main NavMain component
export function NavMain({ items }: SidebarNavMenuProps) {
  // Memoize processed items and grouping
  const { groupedItems, ungroupedItems } = useMemo(() => {
    // Preprocess items to set isActive for parent items with sub-items
    const processedItems = items.map((item) => ({
      ...item,
      isActive: item.isActive || (item.items?.some((subItem) => subItem.isActive) ?? false),
    }));

    // Group items by their 'group' property
    const grouped = processedItems.reduce((acc, item) => {
      const groupKey = item.group || 'ungrouped';
      acc[groupKey] = acc[groupKey] || [];
      acc[groupKey].push(item);
      return acc;
    }, {} as Record<string, SidebarItem[]>);

    const ungrouped = grouped['ungrouped'] || [];
    delete grouped['ungrouped'];

    return { groupedItems: grouped, ungroupedItems: ungrouped };
  }, [items]);

  // Sort group names once
  const groupNames = useMemo(() => Object.keys(groupedItems).sort(), [groupedItems]);

  return (
    <>
      {ungroupedItems.length > 0 && (
        <SidebarGroup>
          <SidebarMenu>
            {ungroupedItems.map((item) => (
              <MenuItem key={`nav-${item.title}`} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      )}
      {groupNames.map((group) => (
        <SidebarGroup key={group}>
          <SidebarGroupLabel>{group}</SidebarGroupLabel>
          <SidebarMenu>
            {groupedItems[group].map((item) => (
              <MenuItem key={`nav-${item.title}`} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

// Memoize the entire component to prevent unnecessary re-renders
export default memo(NavMain);