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

const AppNav = () => (
    <>
        <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/dashboard" passHref>
                    <SidebarMenuButton as="a" tooltip="Dashboard">
                        <Home />
                        Dashboard
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup>
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/dashboard/usuarios" passHref>
                    <SidebarMenuButton as="a" tooltip="Usuarios">
                        <Users />
                        Usuarios
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/dashboard/roles" passHref>
                    <SidebarMenuButton as="a" tooltip="Roles">
                        <Shield />
                        Roles y Permisos
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel>Gestión Académica</SidebarGroupLabel>
            <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/dashboard/facultades" passHref>
                    <SidebarMenuButton as="a" tooltip="Facultades">
                        <Building2 />
                        Facultades
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/dashboard/carreras" passHref>
                    <SidebarMenuButton as="a" tooltip="Carreras">
                        <GraduationCap />
                        Carreras
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/dashboard/asignaturas" passHref>
                    <SidebarMenuButton as="a" tooltip="Asignaturas">
                        <BookUser />
                        Asignaturas
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/dashboard/periodos" passHref>
                    <SidebarMenuButton as="a" tooltip="Períodos">
                        <CalendarDays />
                        Períodos Académicos
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel>Personal</SidebarGroupLabel>
            <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/dashboard/docentes" passHref>
                    <SidebarMenuButton as="a" tooltip="Docentes">
                        <Clipboard />
                        Docentes
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel>Recursos</SidebarGroupLabel>
            <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/dashboard/aulas" passHref>
                    <SidebarMenuButton as="a" tooltip="Aulas">
                        <School />
                        Aulas
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/dashboard/horarios" passHref>
                    <SidebarMenuButton as="a" tooltip="Horarios">
                        <CalendarDays />
                        Horarios
                        <Badge variant="destructive" className="ml-auto">BETA</Badge>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    </>
)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const { user, loading } = useUser();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push('/login');
  //   }
  // }, [user, loading, router]);

  // if (loading) {
  //   return <div className="flex min-h-screen w-full items-center justify-center bg-background"><p>Cargando...</p></div>;
  // }
  
  // if (!user) {
  //   return null;
  // }

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
