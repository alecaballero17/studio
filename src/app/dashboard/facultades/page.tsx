"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore"

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
import { useFirestore } from "@/firebase"
import { useCollection } from "@/firebase/firestore/use-collection"
import { useToast } from "@/hooks/use-toast"

export default function FacultadesPage() {
  const firestore = useFirestore()
  const { data: faculties, loading, error } = useCollection(firestore ? collection(firestore, 'faculties') : null)
  const { toast } = useToast()

  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [newFacultyName, setNewFacultyName] = React.useState("")
  const [newFacultyCode, setNewFacultyCode] = React.useState("")

  const handleAddFaculty = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFacultyName || !newFacultyCode) {
      toast({
        variant: "destructive",
        title: "Campos incompletos",
        description: "Por favor, complete todos los campos.",
      })
      return
    }
    if (firestore) {
      try {
        await addDoc(collection(firestore, 'faculties'), {
          name: newFacultyName,
          code: newFacultyCode,
        })
        toast({
          title: "Facultad Agregada",
          description: "La nueva facultad se ha guardado correctamente.",
        })
        setNewFacultyName("")
        setNewFacultyCode("")
        setSheetOpen(false)
      } catch (error) {
        console.error("Error adding document: ", error);
        toast({
          variant: "destructive",
          title: "Error al guardar",
          description: "Hubo un problema al agregar la facultad.",
        })
      }
    }
  }

  const handleDeleteFaculty = async (id: string) => {
    if (firestore) {
        if (confirm("¿Está seguro de que desea eliminar esta facultad?")) {
            try {
                await deleteDoc(doc(firestore, 'faculties', id))
                toast({
                    title: "Facultad Eliminada",
                    description: "La facultad se ha eliminado correctamente.",
                })
            } catch (error) {
                console.error("Error deleting document: ", error);
                toast({
                    variant: "destructive",
                    title: "Error al eliminar",
                    description: "Hubo un problema al eliminar la facultad.",
                })
            }
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
            Listado de todas las facultades de la universidad.
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
              {loading && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">Cargando facultades...</TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-destructive">Error al cargar los datos.</TableCell>
                </TableRow>
              )}
              {!loading && faculties?.map(faculty => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
