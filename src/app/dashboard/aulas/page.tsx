
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
import { classrooms } from "@/lib/placeholder-data"

export default function ClassroomsPage() {
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
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Agregar Aula
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Agregar Nueva Aula</SheetTitle>
                  <SheetDescription>
                    Complete el formulario para registrar un nuevo espacio físico.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">Código</Label>
                    <Input id="code" placeholder="Ej. 225-LC3" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="capacity" className="text-right">Capacidad</Label>
                    <Input id="capacity" type="number" placeholder="Ej. 40" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">Tipo</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lab">Laboratorio</SelectItem>
                        <SelectItem value="common">Aula Común</SelectItem>
                        <SelectItem value="auditorium">Auditorio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit">Guardar Aula</Button>
                </div>
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
              {classrooms.map(classroom => (
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
                        <DropdownMenuItem>Ver Horario</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Cambiar Estado</DropdownMenuItem>
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
