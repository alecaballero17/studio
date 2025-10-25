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
import { useToast } from "@/hooks/use-toast"
import { useCollection, useFirestore } from "@/firebase"
import { Skeleton } from "@/components/ui/skeleton"

// Definiendo el tipo para el documento de facultad
type Faculty = {
  id: string;
  name: string;
  code: string;
};

export default function FacultadesPage() {
  const { toast } = useToast()
  const firestore = useFirestore()
  
  // Hook para obtener datos de la colección 'faculties'
  const facultiesCollection = firestore ? collection(firestore, "faculties") : null
  const { data: faculties, loading, error } = useCollection<Faculty>(facultiesCollection)

  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [newFacultyName, setNewFacultyName] = React.useState("")
  const [newFacultyCode, setNewFacultyCode] = React.useState("")

  const handleAddFaculty = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFacultyName || !newFacultyCode || !firestore) {
      toast({
        variant: "destructive",
        title: "Campos incompletos",
        description: "Por favor, complete todos los campos.",
      })
      return
    }
    
    try {
      const facultiesRef = collection(firestore, 'faculties');
      await addDoc(facultiesRef, { name: newFacultyName, code: newFacultyCode });

      toast({
        title: "Facultad Agregada",
        description: "La nueva facultad se ha guardado en la base de datos.",
      })

      setNewFacultyName("")
      setNewFacultyCode("")
      setSheetOpen(false)
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Error al guardar",
        description: error.message || "No se pudo agregar la facultad.",
      })
    }
  }

  const handleDeleteFaculty = async (id: string) => {
     if (confirm("¿Está seguro de que desea eliminar esta facultad?")) {
        if (!firestore) return;
        try {
            const facultyDocRef = doc(firestore, 'faculties', id);
            await deleteDoc(facultyDocRef);
            toast({
                title: "Facultad Eliminada",
                description: "La facultad se ha eliminado de la base de datos.",
            })
        } catch (error: any) {
             toast({
                variant: "destructive",
                title: "Error al eliminar",
                description: error.message || "No se pudo eliminar la facultad.",
            })
        }
    }
  }

  return (
    <div className="flex flex-col gap-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Gestión de Facultades</h1>
        <p className="text-muted-foreground">
          Cree, actualice y gestione las facultades de la universidad.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Facultades Registradas</CardTitle>
          <CardDescription>
            Listado de todas las facultades de la universidad desde Firestore.
          </CardDescription>
           <div className="flex justify-end">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Agregar Facultad
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <form onSubmit={handleAddFaculty}>
                        <SheetHeader>
                            <SheetTitle>Agregar Nueva Facultad</SheetTitle>
                            <SheetDescription>
                                Complete el formulario para crear una nueva facultad.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Nombre</Label>
                                <Input 
                                    id="name" 
                                    placeholder="Ej. Facultad de Ciencias..." 
                                    className="col-span-3"
                                    value={newFacultyName}
                                    onChange={(e) => setNewFacultyName(e.target.value)} 
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="code" className="text-right">Código</Label>
                                <Input 
                                    id="code" 
                                    placeholder="Ej. FCYT" 
                                    className="col-span-3"
                                    value={newFacultyCode}
                                    onChange={(e) => setNewFacultyCode(e.target.value)} 
                                />
                            </div>
                            <Button type="submit">Guardar Facultad</Button>
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
                <TableHead>Código</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <>
                  <TableRow>
                    <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-1/3" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                  </TableRow>
                </>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-destructive">
                    Error al cargar datos: {error.message}
                  </TableCell>
                </TableRow>
              ) : faculties?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No hay facultades registradas. ¡Agregue una!
                  </TableCell>
                </TableRow>
              ) : (
                faculties?.map(faculty => (
                  <TableRow key={faculty.id}>
                    <TableCell className="font-medium">{faculty.name}</TableCell>
                    <TableCell>{faculty.code}</TableCell>
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
                          <DropdownMenuItem disabled>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteFaculty(faculty.id)}>Eliminar</DropdownMenuItem>
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
