"use client"

import * as React from "react"
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore"
import { MoreHorizontal, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useCollection, useFirestore } from "@/firebase"
import { Skeleton } from "@/components/ui/skeleton"

type Teacher = {
  id: string;
  name: string;
  code: string;
  email: string;
  category: 'Titular' | 'Asociado' | 'Asistente';
  dedication: 'Tiempo Completo' | 'Medio Tiempo' | 'Hora Catedra';
  avatar: string;
};

export default function TeachersPage() {
  const { toast } = useToast()
  const firestore = useFirestore()

  const teachersCollection = firestore ? collection(firestore, "teachers") : null
  const { data: teachers, loading, error } = useCollection<Teacher>(teachersCollection)

  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [newTeacherName, setNewTeacherName] = React.useState("")
  const [newTeacherCode, setNewTeacherCode] = React.useState("")
  const [newTeacherEmail, setNewTeacherEmail] = React.useState("")
  const [newTeacherCategory, setNewTeacherCategory] = React.useState<Teacher['category'] | "">("")
  const [newTeacherDedication, setNewTeacherDedication] = React.useState<Teacher['dedication'] | "">("")

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTeacherName || !newTeacherCode || !newTeacherEmail || !newTeacherCategory || !newTeacherDedication || !firestore) {
      toast({
        variant: "destructive",
        title: "Campos incompletos",
        description: "Por favor, complete todos los campos.",
      })
      return
    }

    try {
      const teachersRef = collection(firestore, 'teachers');
      await addDoc(teachersRef, {
        name: newTeacherName,
        code: newTeacherCode,
        email: newTeacherEmail,
        category: newTeacherCategory,
        dedication: newTeacherDedication,
        avatar: `https://picsum.photos/seed/${newTeacherCode}/40/40`,
      });

      toast({
        title: "Docente Agregado",
        description: "El nuevo docente se ha guardado correctamente.",
      })

      setNewTeacherName("")
      setNewTeacherCode("")
      setNewTeacherEmail("")
      setNewTeacherCategory("")
      setNewTeacherDedication("")
      setSheetOpen(false)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: error.message || "No se pudo agregar el docente.",
      })
    }
  }

  const handleDeleteTeacher = async (id: string) => {
    if (confirm("¿Está seguro de que desea eliminar este docente?")) {
      if (!firestore) return;
      try {
        const teacherDocRef = doc(firestore, 'teachers', id);
        await deleteDoc(teacherDocRef);
        toast({
          title: "Docente Eliminado",
          description: "El docente se ha eliminado de la base de datos.",
        })
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error al eliminar",
          description: error.message || "No se pudo eliminar el docente.",
        })
      }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Gestión de Docentes</h1>
        <p className="text-muted-foreground">
          Administra la información de los docentes de la facultad.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Planta Docente</CardTitle>
          <CardDescription>
            Listado de todos los docentes registrados.
          </CardDescription>
          <div className="flex justify-end">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Agregar Docente
                </Button>
              </SheetTrigger>
              <SheetContent>
                <form onSubmit={handleAddTeacher}>
                  <SheetHeader>
                    <SheetTitle>Agregar Nuevo Docente</SheetTitle>
                    <SheetDescription>
                      Complete el formulario para registrar un nuevo docente.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Nombre</Label>
                      <Input id="name" value={newTeacherName} onChange={e => setNewTeacherName(e.target.value)} placeholder="Nombre completo" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="code" className="text-right">Código</Label>
                      <Input id="code" value={newTeacherCode} onChange={e => setNewTeacherCode(e.target.value)} placeholder="Ej. FFMO" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">Email</Label>
                      <Input id="email" type="email" value={newTeacherEmail} onChange={e => setNewTeacherEmail(e.target.value)} placeholder="docente@uagrm.edu.bo" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">Categoría</Label>
                      <Select value={newTeacherCategory} onValueChange={(value) => setNewTeacherCategory(value as Teacher['category'])}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Seleccione una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Titular">Titular</SelectItem>
                          <SelectItem value="Asociado">Asociado</SelectItem>
                          <SelectItem value="Asistente">Asistente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="dedication" className="text-right">Dedicación</Label>
                      <Select value={newTeacherDedication} onValueChange={(value) => setNewTeacherDedication(value as Teacher['dedication'])}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Seleccione una dedicación" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tiempo Completo">Tiempo Completo</SelectItem>
                          <SelectItem value="Medio Tiempo">Medio Tiempo</SelectItem>
                          <SelectItem value="Hora Catedra">Hora Catedra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit">Guardar Docente</Button>
                  </div>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Dedicación</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                  </TableRow>
                ))
              ) : error ? (
                 <TableRow>
                  <TableCell colSpan={4} className="text-center text-destructive">
                    Error al cargar datos: {error.message}
                  </TableCell>
                </TableRow>
              ) : teachers?.length === 0 ? (
                 <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No hay docentes registrados. ¡Agregue uno!
                  </TableCell>
                </TableRow>
              ) : (
                teachers?.map(teacher => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border">
                          <AvatarImage src={teacher.avatar} alt={teacher.name} data-ai-hint="person professional" />
                          <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid">
                          <span>{teacher.name}</span>
                          <span className="text-xs text-muted-foreground">{teacher.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{teacher.category}</TableCell>
                    <TableCell>{teacher.dedication}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem disabled>Ver Carga Horaria</DropdownMenuItem>
                          <DropdownMenuItem disabled>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteTeacher(teacher.id)}>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
