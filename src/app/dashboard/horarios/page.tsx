"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { courseOfferings, subjects, teachers } from "@/lib/placeholder-data"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function HorariosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Gestión de Horarios
        </h1>
        <p className="text-muted-foreground">
          Visualice y administre la oferta académica por período.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Oferta Académica - 2-2025</CardTitle>
              <CardDescription>
                Listado de materias, grupos y horarios disponibles.
              </CardDescription>
            </div>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Agregar Grupo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asignatura</TableHead>
                <TableHead>Grupo</TableHead>
                <TableHead>Docente</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courseOfferings.map((offer) => {
                const subject = subjects.find(
                  (s) => s.code === offer.subjectCode
                )
                const teacher = teachers.find(
                  (t) => t.code === offer.teacherCode
                )

                return (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">
                      <div>{subject?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {subject?.code}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{offer.group}</Badge>
                    </TableCell>
                    <TableCell>{teacher?.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {offer.schedule.map((slot, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="font-semibold w-20">{slot.day}:</span>
                            <span>{slot.time}</span>
                            <Badge variant="secondary">{slot.classroom}</Badge>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Eliminar
                          </DropdownMenuItem>
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
