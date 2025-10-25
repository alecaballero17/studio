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
import { useToast } from "@/hooks/use-toast"
import { useCollection, useFirestore } from "@/firebase"
import { Skeleton } from "@/components/ui/skeleton"

type Faculty = {
  id: string;
  name: string;
  code: string;
};

type Career = {
  id: string;
  name: string;
  code: string;
  facultyCode: string;
};

export default function CarrerasPage() {
  const { toast } = useToast()
  const firestore = useFirestore()

  const facultiesCollection = firestore ? collection(firestore, "faculties") : null
  const { data: faculties, loading: loadingFaculties } = useCollection<Faculty>(facultiesCollection)

  const careersCollection = firestore ? collection(firestore, "careers") : null
  const { data: careers, loading: loadingCareers, error } = useCollection<Career>(careersCollection)

  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [newCareerName, setNewCareerName] = React.useState("")
  const [newCareerCode, setNewCareerCode] = React.useState("")
  const [selectedFacultyCode, setSelectedFacultyCode] = React.useState("")

  const handleAddCareer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCareerName || !newCareerCode || !selectedFacultyCode || !firestore) {
      toast({
        variant: "destructive",
        title: "Campos incompletos",
        description: "Por favor, complete todos los campos.",
      })
      return
    }

    try {
      const careersRef = collection(firestore, 'careers');
      await addDoc(careersRef, { 
        name: newCareerName, 
        code: newCareerCode, 
        facultyCode: selectedFacultyCode 
      });

      toast({
        title: "Carrera Agregada",
        description: "El nuevo programa académico se ha guardado.",
      })

      setNewCareerName("")
      setNewCareerCode("")
      setSelectedFacultyCode("")
      setSheetOpen(false)
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Error al guardar",
        description: error.message || "No se pudo agregar la carrera.",
      })
    }
  }

  const handleDeleteCareer = async (id: string) => {
     if (confirm("¿Está seguro de que desea eliminar esta carrera?")) {
        if (!firestore) return;
        try {
            const careerDocRef = doc(firestore, 'careers', id);
            await deleteDoc(careerDocRef);
            toast({
                title: "Carrera Eliminada",
                description: "El programa académico se ha eliminado.",
            })
        } catch (error: any) {
             toast({
                variant: "destructive",
                title: "Error al eliminar",
                description: error.message || "No se pudo eliminar la carrera.",
            })
        }
    }
  }

  return (
    <div className="flex flex-col gap-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Gestión de Carreras</h1>
        <p className="text-muted-foreground">
          Cree y gestione los programas académicos, vinculándolos a facultades.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Carreras Registradas</CardTitle>
          <CardDescription>
            Listado de todos los programas académicos de la universidad.
          </CardDescription>
           <div className="flex justify-end">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Agregar Carrera
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <form onSubmit={handleAddCareer}>
                        <SheetHeader>
                            <SheetTitle>Agregar Nueva Carrera</SheetTitle>
                            <SheetDescription>
                                Complete el formulario para crear un nuevo programa académico.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Nombre</Label>
                                <Input id="name" placeholder="Ej. Ingeniería Informática" className="col-span-3" value={newCareerName} onChange={e => setNewCareerName(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="code" className="text-right">Código</Label>
                                <Input id="code" placeholder="Ej. INF" className="col-span-3" value={newCareerCode} onChange={e => setNewCareerCode(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="faculty" className="text-right">Facultad</Label>
                                <Select value={selectedFacultyCode} onValueChange={setSelectedFacultyCode}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Seleccione una facultad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {loadingFaculties ? (
                                            <SelectItem value="loading" disabled>Cargando facultades...</SelectItem>
                                        ) : (
                                            faculties?.map(faculty => (
                                                <SelectItem key={faculty.id} value={faculty.code}>{faculty.name}</SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit">Guardar Carrera</Button>
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
                <TableHead>Facultad</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingCareers ? (
                <>
                  <TableRow>
                    <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-1/4" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-1/3" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-2/3" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                  </TableRow>
                </>
              ) : error ? (
                 <TableRow>
                  <TableCell colSpan={4} className="text-center text-destructive">
                    Error al cargar datos: {error.message}
                  </TableCell>
                </TableRow>
              ) : careers?.length === 0 ? (
                 <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No hay carreras registradas. ¡Agregue una!
                  </TableCell>
                </TableRow>
              ) : (
                careers?.map(career => {
                  const faculty = faculties?.find(f => f.code === career.facultyCode);
                  return (
                      <TableRow key={career.id}>
                      <TableCell className="font-medium">{career.name}</TableCell>
                      <TableCell>{career.code}</TableCell>
                      <TableCell>{faculty ? faculty.name : 'N/A'}</TableCell>
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
                              <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCareer(career.id)}>Eliminar</DropdownMenuItem>
                          </DropdownMenuContent>
                          </DropdownMenu>
                      </TableCell>
                      </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
