"use client"

import * as React from "react"
import { collection, addDoc, deleteDoc, doc, Timestamp } from "firebase/firestore"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon, MoreHorizontal, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useCollection, useFirestore } from "@/firebase"
import { Skeleton } from "@/components/ui/skeleton"

type AcademicPeriod = {
  id: string;
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  status: 'Activo' | 'Inactivo' | 'Cerrado';
};


export default function PeriodosPage() {
  const { toast } = useToast()
  const firestore = useFirestore()
  const periodsCollection = firestore ? collection(firestore, "academic-periods") : null
  const { data: academicPeriods, loading, error } = useCollection<AcademicPeriod>(periodsCollection)
  
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [newPeriodName, setNewPeriodName] = React.useState("")
  const [startDate, setStartDate] = React.useState<Date>()
  const [endDate, setEndDate] = React.useState<Date>()

  const handleAddPeriod = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPeriodName || !startDate || !endDate || !firestore) {
      toast({
        variant: "destructive",
        title: "Campos incompletos",
        description: "Por favor, complete todos los campos.",
      })
      return
    }

    try {
      const periodsRef = collection(firestore, 'academic-periods');
      await addDoc(periodsRef, { 
        name: newPeriodName, 
        startDate: Timestamp.fromDate(startDate),
        endDate: Timestamp.fromDate(endDate),
        status: 'Inactivo' // Default status
      });

      toast({
        title: "Período Agregado",
        description: "El nuevo período académico se ha guardado.",
      })
      
      setNewPeriodName("")
      setStartDate(undefined)
      setEndDate(undefined)
      setSheetOpen(false)

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: error.message || "No se pudo agregar el período.",
      })
    }
  }

  const handleDeletePeriod = async (id: string) => {
    if (confirm("¿Está seguro de que desea eliminar este período?")) {
      if (!firestore) return;
      try {
        const periodDocRef = doc(firestore, 'academic-periods', id);
        await deleteDoc(periodDocRef);
        toast({
            title: "Período Eliminado",
            description: "El período se ha eliminado de la base de datos.",
        })
      } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error al eliminar",
            description: error.message || "No se pudo eliminar el período.",
        })
      }
    }
  }


  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Gestión de Períodos Académicos</h1>
        <p className="text-muted-foreground">
          Defina períodos con fechas de inicio y fin para organizar cursos e inscripciones.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Períodos Registrados</CardTitle>
          <CardDescription>
            Listado de todos los períodos académicos de la universidad.
          </CardDescription>
          <div className="flex justify-end">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Agregar Período
                </Button>
              </SheetTrigger>
              <SheetContent>
                <form onSubmit={handleAddPeriod}>
                  <SheetHeader>
                    <SheetTitle>Agregar Nuevo Período Académico</SheetTitle>
                    <SheetDescription>
                      Complete el formulario para crear un nuevo período.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Nombre</Label>
                      <Input id="name" placeholder="Ej. 1-2025" className="col-span-3" value={newPeriodName} onChange={e => setNewPeriodName(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="start-date" className="text-right">Fecha Inicio</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "col-span-3 justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP", { locale: es }) : <span>Seleccione una fecha</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                            locale={es}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="end-date" className="text-right">Fecha Fin</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "col-span-3 justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP", { locale: es }) : <span>Seleccione una fecha</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            locale={es}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button type="submit">Guardar Período</Button>
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
                <TableHead>Período</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Fecha de Fin</TableHead>
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
                      <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-40" /></TableCell>
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
              ) : academicPeriods?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No hay períodos registrados. ¡Agregue uno!
                  </TableCell>
                </TableRow>
              ) : (
                academicPeriods?.map(period => (
                <TableRow key={period.id}>
                  <TableCell className="font-medium">{period.name}</TableCell>
                  <TableCell>{format(period.startDate.toDate(), "dd 'de' LLLL 'de' yyyy", { locale: es })}</TableCell>
                  <TableCell>{format(period.endDate.toDate(), "dd 'de' LLLL 'de' yyyy", { locale: es })}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={period.status === 'Activo' ? 'default' : period.status === 'Cerrado' ? 'destructive' : 'secondary'}
                    >
                      {period.status}
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
                        <DropdownMenuItem disabled>Editar</DropdownMenuItem>
                        <DropdownMenuItem disabled>Cambiar Estado</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeletePeriod(period.id)}>Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
