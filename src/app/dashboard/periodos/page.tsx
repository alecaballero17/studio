"use client"

import * as React from "react"
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
import { academicPeriods } from "@/lib/placeholder-data"

export default function PeriodosPage() {
  const [startDate, setStartDate] = React.useState<Date>()
  const [endDate, setEndDate] = React.useState<Date>()

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
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Agregar Período
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Agregar Nuevo Período Académico</SheetTitle>
                  <SheetDescription>
                    Complete el formulario para crear un nuevo período.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Nombre</Label>
                    <Input id="name" placeholder="Ej. 1-2025" className="col-span-3" />
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
              {academicPeriods.map(period => (
                <TableRow key={period.id}>
                  <TableCell className="font-medium">{period.name}</TableCell>
                  <TableCell>{format(period.startDate, "dd 'de' LLLL 'de' yyyy", { locale: es })}</TableCell>
                  <TableCell>{format(period.endDate, "dd 'de' LLLL 'de' yyyy", { locale: es })}</TableCell>
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
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Cambiar Estado</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
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
