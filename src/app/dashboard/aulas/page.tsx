"use client"

import * as React from "react"
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore"
import { MoreHorizontal, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
import { useToast } from "@/hooks/use-toast"
import { useCollection, useFirestore } from "@/firebase"
import { Skeleton } from "@/components/ui/skeleton"

type Classroom = {
  id: string;
  code: string;
  capacity: number;
  type: 'Laboratorio' | 'Aula Común' | 'Auditorio';
  status: 'Disponible' | 'Ocupado' | 'Mantenimiento';
};

export default function ClassroomsPage() {
  const { toast } = useToast()
  const firestore = useFirestore()

  const classroomsCollection = firestore ? collection(firestore, "classrooms") : null
  const { data: classrooms, loading, error } = useCollection<Classroom>(classroomsCollection)

  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [newClassroomCode, setNewClassroomCode] = React.useState("")
  const [newClassroomCapacity, setNewClassroomCapacity] = React.useState("")
  const [newClassroomType, setNewClassroomType] = React.useState<Classroom['type'] | "">("")

  const handleAddClassroom = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newClassroomCode || !newClassroomCapacity || !newClassroomType || !firestore) {
      toast({
        variant: "destructive",
        title: "Campos incompletos",
        description: "Por favor, complete todos los campos.",
      })
      return
    }

    try {
      const classroomsRef = collection(firestore, 'classrooms');
      await addDoc(classroomsRef, {
        code: newClassroomCode,
        capacity: Number(newClassroomCapacity),
        type: newClassroomType,
        status: 'Disponible', // Default status for new classrooms
      });

      toast({
        title: "Aula Agregada",
        description: "El nuevo espacio físico se ha guardado correctamente.",
      })

      setNewClassroomCode("")
      setNewClassroomCapacity("")
      setNewClassroomType("")
      setSheetOpen(false)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: error.message || "No se pudo agregar el aula.",
      })
    }
  }
  
  const handleDeleteClassroom = async (id: string) => {
     if (confirm("¿Está seguro de que desea eliminar esta aula?")) {
        if (!firestore) return;
        try {
            const classroomDocRef = doc(firestore, 'classrooms', id);
            await deleteDoc(classroomDocRef);
            toast({
                title: "Aula Eliminada",
                description: "El aula se ha eliminado de la base de datos.",
            })
        } catch (error: any) {
             toast({
                variant: "destructive",
                title: "Error al eliminar",
                description: error.message || "No se pudo eliminar el aula.",
            })
        }
    }
  }

  return (
    <div className="flex flex-col gap-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Gestión de Aulas</h1>
        <p className="text-muted-foreground">
          Administra las aulas, laboratorios y otros espacios académicos.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Aulas Disponibles</CardTitle>
          <CardDescription>
            Listado de todas las aulas y sus estados.
          </CardDescription>
           <div className="flex justify-end">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Agregar Aula
                </Button>
              </SheetTrigger>
              <SheetContent>
                <form onSubmit={handleAddClassroom}>
                  <SheetHeader>
                    <SheetTitle>Agregar Nueva Aula</SheetTitle>
                    <SheetDescription>
                      Complete el formulario para registrar un nuevo espacio físico.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="code" className="text-right">Código</Label>
                      <Input id="code" value={newClassroomCode} onChange={e => setNewClassroomCode(e.target.value)} placeholder="Ej. 225-LC3" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="capacity" className="text-right">Capacidad</Label>
                      <Input id="capacity" type="number" value={newClassroomCapacity} onChange={e => setNewClassroomCapacity(e.target.value)} placeholder="Ej. 40" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">Tipo</Label>
                      <Select value={newClassroomType} onValueChange={value => setNewClassroomType(value as Classroom['type'])}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Laboratorio">Laboratorio</SelectItem>
                          <SelectItem value="Aula Común">Aula Común</SelectItem>
                          <SelectItem value="Auditorio">Auditorio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit">Guardar Aula</Button>
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
                <TableHead>Código</TableHead>
                <TableHead>Capacidad</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                 Array.from({ length: 4 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                  ))
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-destructive">
                    Error al cargar datos: {error.message}
                  </TableCell>
                </TableRow>
              ) : classrooms?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No hay aulas registradas. ¡Agregue una!
                  </TableCell>
                </TableRow>
              ) : (
                classrooms?.map(classroom => (
                  <TableRow key={classroom.id}>
                    <TableCell className="font-medium">{classroom.code}</TableCell>
                    <TableCell>{classroom.capacity} asientos</TableCell>
                    <TableCell>{classroom.type}</TableCell>
                    <TableCell>
                      <Badge variant={classroom.status === 'Disponible' ? "secondary" : classroom.status === 'Ocupado' ? 'destructive' : 'outline'}>
                          {classroom.status}
                      </Badge>
                    </TableCell>
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
                          <DropdownMenuItem disabled>Ver Horario</DropdownMenuItem>
                          <DropdownMenuItem disabled>Editar</DropdownMenuItem>
                          <DropdownMenuItem disabled>Cambiar Estado</DropdownMenuItem>
                           <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClassroom(classroom.id)}>Eliminar</DropdownMenuItem>
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
