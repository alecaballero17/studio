"use client"

import * as React from "react"
import { collection } from "firebase/firestore"
import { MoreHorizontal, PlusCircle } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { useCollection, useFirestore } from "@/firebase"
import { Skeleton } from "@/components/ui/skeleton"

type ScheduleSlot = {
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';
  time: string;
  classroom: string;
}

type CourseOffering = {
  id: string;
  subjectCode: string;
  group: string;
  teacherCode: string;
  schedule: ScheduleSlot[];
};

type Subject = {
  id: string;
  code: string;
  name: string;
}

type Teacher = {
  id: string;
  code: string;
  name: string;
}


export default function HorariosPage() {
  const firestore = useFirestore()

  const offeringsCollection = firestore ? collection(firestore, "course-offerings") : null
  const subjectsCollection = firestore ? collection(firestore, "subjects") : null
  const teachersCollection = firestore ? collection(firestore, "teachers") : null

  const { data: courseOfferings, loading: loadingOfferings, error: errorOfferings } = useCollection<CourseOffering>(offeringsCollection)
  const { data: subjects, loading: loadingSubjects } = useCollection<Subject>(subjectsCollection)
  const { data: teachers, loading: loadingTeachers } = useCollection<Teacher>(teachersCollection)

  const isLoading = loadingOfferings || loadingSubjects || loadingTeachers;
  const error = errorOfferings;


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
              <CardTitle>Oferta Académica - 1-2025</CardTitle>
              <CardDescription>
                Listado de materias, grupos y horarios disponibles.
              </CardDescription>
            </div>
            <Button size="sm" className="gap-1" disabled>
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
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><div className="flex flex-col gap-1"><Skeleton className="h-4 w-48" /><Skeleton className="h-3 w-20" /></div></TableCell>
                    <TableCell><Skeleton className="h-6 w-12 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-56" /></TableCell>
                    <TableCell><div className="flex flex-col gap-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /></div></TableCell>
                    <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                  </TableRow>
                ))
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-destructive">
                    Error al cargar datos: {error.message}
                  </TableCell>
                </TableRow>
              ) : courseOfferings?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                     No hay grupos ofertados para este período.
                  </TableCell>
                </TableRow>
              ) : (
                courseOfferings?.map((offer) => {
                  const subject = subjects?.find(
                    (s) => s.code === offer.subjectCode
                  )
                  const teacher = teachers?.find(
                    (t) => t.code === offer.teacherCode
                  )

                  return (
                    <TableRow key={offer.id}>
                      <TableCell className="font-medium">
                        <div>{subject?.name || 'Asignatura no encontrada'}</div>
                        <div className="text-xs text-muted-foreground">
                          {offer.subjectCode}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{offer.group}</Badge>
                      </TableCell>
                      <TableCell>{teacher?.name || 'Docente no asignado'}</TableCell>
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
                            <DropdownMenuItem disabled>Editar</DropdownMenuItem>
                            <DropdownMenuItem disabled className="text-destructive">
                              Eliminar
                            </DropdownMenuItem>
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
