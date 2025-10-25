"use client"

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
import { careers, faculties } from "@/lib/placeholder-data"


export default function CarrerasPage() {
  
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
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Agregar Carrera
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Agregar Nueva Carrera</SheetTitle>
                        <SheetDescription>
                            Complete el formulario para crear un nuevo programa académico.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Nombre</Label>
                            <Input id="name" placeholder="Ej. Ingeniería Informática" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="code" className="text-right">Código</Label>
                            <Input id="code" placeholder="Ej. INF" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="faculty" className="text-right">Facultad</Label>
                             <Select>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Seleccione una facultad" />
                                </SelectTrigger>
                                <SelectContent>
                                    {faculties?.map(faculty => (
                                        <SelectItem key={faculty.id} value={faculty.code}>{faculty.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <Button type="submit">Guardar Carrera</Button>
                    </div>
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
              {careers?.map(career => {
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
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
