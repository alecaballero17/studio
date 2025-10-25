"use client"
import Link from "next/link"
import {
  Bell,
  BookUser,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  GraduationCap,
  Home,
  School,
  Shield,
  Users,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/app/logo"
import { UserNav } from "@/components/app/user-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import React, { useEffect } from "react"
import { useUser } from "@/firebase"

const MobileSidebar = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="md:hidden">
        <ChevronRight className="size-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-72 p-0">
      <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo />
            <div className="flex flex-col">
              <h2 className="font-headline text-lg tracking-tight">
                Gestion FICCT
              </h2>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <AppNav />
        </SidebarContent>
      </div>
    </SheetContent>
  </Sheet>
)

const AppNav = () => {
    const pathname = usePathname();
    return (
    <>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton as="a" href="/dashboard" tooltip="Dashboard" isActive={pathname === "/dashboard"}>
                    <Home />
                    Dashboard
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup>
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton as="a" href="/dashboard/usuarios" tooltip="Usuarios" isActive={pathname === "/dashboard/usuarios"}>
                    <Users />
                    Usuarios
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton as="a" href="/dashboard/roles" tooltip="Roles" isActive={pathname === "/dashboard/roles"}>
                    <Shield />
                    Roles y Permisos
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel>Gestión Académica</SidebarGroupLabel>
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton as="a" href="/dashboard/facultades" tooltip="Facultades" isActive={pathname === "/dashboard/facultades"}>
                    <Building2 />
                    Facultades
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton as="a" href="/dashboard/carreras" tooltip="Carreras" isActive={pathname === "/dashboard/carreras"}>
                    <GraduationCap />
                    Carreras
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton as="a" href="/dashboard/asignaturas" tooltip="Asignaturas" isActive={pathname === "/dashboard/asignaturas"}>
                    <BookUser />
                    Asignaturas
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton as="a" href="/dashboard/periodos" tooltip="Períodos" isActive={pathname === "/dashboard/periodos"}>
                    <CalendarDays />
                    Períodos Académicos
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel>Personal</SidebarGroupLabel>
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton as="a" href="/dashboard/docentes" tooltip="Docentes" isActive={pathname === "/dashboard/docentes"}>
                    <Clipboard />
                    Docentes
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel>Recursos</SidebarGroupLabel>
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton as="a" href="/dashboard/aulas" tooltip="Aulas" isActive={pathname === "/dashboard/aulas"}>
                    <School />
                    Aulas
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton as="a" href="/dashboard/horarios" tooltip="Horarios" isActive={pathname === "/dashboard/horarios"}>
                    <CalendarDays />
                    Horarios
                    <Badge variant="destructive" className="ml-auto">BETA</Badge>
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    </>
    )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="flex min-h-screen w-full items-center justify-center bg-background"><p>Cargando...</p></div>;
  }

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
      >
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo />
            <div className="flex flex-col">
              <h2 className="font-headline text-lg tracking-tight">
                Gestion FICCT
              </h2>
            </div>
            <SidebarTrigger className="ml-auto">
              <ChevronLeft />
            </SidebarTrigger>
          </div>
        </SidebarHeader>
        <SidebarContent>
            <AppNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <MobileSidebar />
          <div className="flex-1">
            {/* Can be used for breadcrumbs or page title */}
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
          </Button>
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
