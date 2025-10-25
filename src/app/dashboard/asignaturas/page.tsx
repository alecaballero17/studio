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

type Subject = {
  id: string;
  name: string;
  code: string;
  level: number;
  credits: number;
};

export default function AsignaturasPage() {
  const { toast } = useToast()
  const firestore = useFirestore()

  const subjectsCollection = firestore ? collection(firestore, "subjects") : null
  const { data: subjects, loading, error } = useCollection<Subject>(subjectsCollection)

  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [newSubjectCode, setNewSubjectCode] = React.useState("")
  const [newSubjectName, setNewSubjectName] = React.useState("")
  const [newSubjectLevel, setNewSubjectLevel] = React.useState("")
  const [newSubjectCredits, setNewSubjectCredits] = React.useState("")

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSubjectCode || !newSubjectName || !newSubjectLevel || !newSubjectCredits || !firestore) {
      toast({
        variant: "destructive",
        title: "Campos incompletos",
        description: "Por favor, complete todos los campos.",
      })
      return
    }

    try {
      const subjectsRef = collection(firestore, 'subjects');
      await addDoc(subjectsRef, { 
        code: newSubjectCode, 
        name: newSubjectName, 
        level: Number(newSubjectLevel),
        credits: Number(newSubjectCredits)
      });

      toast({
        title: "Asignatura Agregada",
        description: "La nueva asignatura se ha guardado correctamente.",
      })

      setNewSubjectCode("")
      setNewSubjectName("")
      setNewSubjectLevel("")
      setNewSubjectCredits("")
      setSheetOpen(false)
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Error al guardar",
        description: error.message || "No se pudo agregar la asignatura.",
      })
    }
  }
  
  const handleDeleteSubject = async (id: string) => {
     if (confirm("¿Está seguro de que desea eliminar esta asignatura?")) {
        if (!firestore) return;
        try {
            const subjectDocRef = doc(firestore, 'subjects', id);
            await deleteDoc(subjectDocRef);
            toast({
                title: "Asignatura Eliminada",
                description: "La asignatura se ha eliminado de la base de datos.",
            })
        } catch (error: any) {
             toast({
                variant: "destructive",
                title: "Error al eliminar",
                description: error.message || "No se pudo eliminar la asignatura.",
            })
        }
    }
  }


  return (
    <div className="flex flex-col gap-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Gestión de Asignaturas</h1>
        <p className="text-muted-foreground">
          Cree y gestione las materias, asignándolas a carreras específicas.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Asignaturas Registradas</CardTitle>
          <CardDescription>
            Listado de todas las asignaturas del plan de estudios.
          </CardDescription>
           <div className="flex justify-end">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Agregar Asignatura
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <form onSubmit={handleAddSubject}>
                      <SheetHeader>
                          <SheetTitle>Agregar Nueva Asignatura</SheetTitle>
                          <SheetDescription>
                              Complete el formulario para crear una nueva asignatura.
                          </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="code" className="text-right">Sigla</Label>
                              <Input id="code" placeholder="Ej. INF-111" className="col-span-3" value={newSubjectCode} onChange={e => setNewSubjectCode(e.target.value)} />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">Nombre</Label>
                              <Input id="name" placeholder="Ej. Introducción a la Informática" className="col-span-3" value={newSubjectName} onChange={e => setNewSubjectName(e.target.value)} />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="level" className="text-right">Nivel</Label>
                              <Input id="level" type="number" placeholder="Ej. 1" className="col-span-3" value={newSubjectLevel} onChange={e => setNewSubjectLevel(e.target.value)} />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="credits" className="text-right">Créditos</Label>
                              <Input id="credits" type="number" placeholder="Ej. 4" className="col-span-3" value={newSubjectCredits} onChange={e => setNewSubjectCredits(e.target.value)} />
                          </div>
                          <Button type="submit">Guardar Asignatura</Button>
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
                <TableHead>Sigla</TableHead>
                <TableHead>Nombre de la Asignatura</TableHead>
                <TableHead>Nivel</TableHead>
                <TableHead>Créditos</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                 Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                    </TableRow>
                  ))
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-destructive">
                    Error al cargar datos: {error.message}
                  </TableCell>
                </TableRow>
              ) : subjects?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No hay asignaturas registradas. ¡Agregue una!
                  </TableCell>
                </TableRow>
              ) : (
                subjects?.map(subject => (
                  <TableRow key={subject.id}>
                    <TableCell className="font-medium">{subject.code}</TableCell>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.level}</TableCell>
                    <TableCell>{subject.credits}</TableCell>
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
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteSubject(subject.id)}>Eliminar</DropdownMenuItem>
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
