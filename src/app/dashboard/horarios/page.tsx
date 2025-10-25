
"use client"

import * as React from "react"
import { collection, addDoc } from "firebase/firestore"
import { MoreHorizontal, PlusCircle, X } from "lucide-react"

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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCollection, useFirestore } from "@/firebase"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

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
  academicPeriodId: string;
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

type Classroom = {
    id: string;
    code: string;
}

type AcademicPeriod = {
    id: string;
    name: string;
}


export default function HorariosPage() {
  const { toast } = useToast();
  const firestore = useFirestore()

  const offeringsCollection = firestore ? collection(firestore, "course-offerings") : null
  const subjectsCollection = firestore ? collection(firestore, "subjects") : null
  const teachersCollection = firestore ? collection(firestore, "teachers") : null
  const classroomsCollection = firestore ? collection(firestore, "classrooms") : null
  const periodsCollection = firestore ? collection(firestore, "academic-periods") : null


  const { data: courseOfferings, loading: loadingOfferings, error: errorOfferings } = useCollection<CourseOffering>(offeringsCollection)
  const { data: subjects, loading: loadingSubjects } = useCollection<Subject>(subjectsCollection)
  const { data: teachers, loading: loadingTeachers } = useCollection<Teacher>(teachersCollection)
  const { data: classrooms, loading: loadingClassrooms } = useCollection<Classroom>(classroomsCollection)
  const { data: academicPeriods, loading: loadingPeriods } = useCollection<AcademicPeriod>(periodsCollection)


  const isLoading = loadingOfferings || loadingSubjects || loadingTeachers || loadingClassrooms || loadingPeriods;
  const error = errorOfferings;

  const [sheetOpen, setSheetOpen] = React.useState(false);
  
  // Form state
  const [subjectCode, setSubjectCode] = React.useState("");
  const [group, setGroup] = React.useState("");
  const [teacherCode, setTeacherCode] = React.useState("");
  const [academicPeriodId, setAcademicPeriodId] = React.useState("");
  const [scheduleSlots, setScheduleSlots] = React.useState<Partial<ScheduleSlot>[]>([
    { day: undefined, time: "", classroom: "" },
  ]);

  const handleAddSlot = () => {
    setScheduleSlots([...scheduleSlots, { day: undefined, time: "", classroom: "" }]);
  };

  const handleRemoveSlot = (index: number) => {
    const newSlots = scheduleSlots.filter((_, i) => i !== index);
    setScheduleSlots(newSlots);
  };
  
  const handleSlotChange = (index: number, field: keyof ScheduleSlot, value: string) => {
    const newSlots = [...scheduleSlots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setScheduleSlots(newSlots);
  };

  const resetForm = () => {
    setSubjectCode("");
    setGroup("");
    setTeacherCode("");
    setAcademicPeriodId("");
    setScheduleSlots([{ day: undefined, time: "", classroom: "" }]);
  }
  
  const handleCreateCourseOffering = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectCode || !group || !teacherCode || !academicPeriodId || !firestore) {
        toast({ variant: "destructive", title: "Campos incompletos", description: "Por favor, complete todos los campos principales." });
        return;
    }

    const finalSchedule = scheduleSlots.filter(
        (slot) => slot.day && slot.time && slot.classroom
    ) as ScheduleSlot[];

    if (finalSchedule.length === 0) {
        toast({ variant: "destructive", title: "Horario incompleto", description: "Debe agregar al menos un horario válido." });
        return;
    }

    try {
        const offeringsRef = collection(firestore, 'course-offerings');
        await addDoc(offeringsRef, {
            subjectCode,
            group,
            teacherCode,
            academicPeriodId,
            schedule: finalSchedule,
        });

        toast({ title: "Grupo Creado", description: "La nueva oferta académica ha sido guardada." });
        setSheetOpen(false);
        resetForm();
    } catch (error: any) {
        toast({ variant: "destructive", title: "Error al guardar", description: error.message || "No se pudo crear el grupo." });
    }
  };


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
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Agregar Grupo
                    </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-xl overflow-y-auto">
                    <form onSubmit={handleCreateCourseOffering}>
                        <SheetHeader>
                            <SheetTitle>Agregar Nuevo Grupo</SheetTitle>
                            <SheetDescription>
                                Complete el formulario para crear una nueva oferta académica.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-6 py-6">
                            {/* Main Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Asignatura</Label>
                                    <Select value={subjectCode} onValueChange={setSubjectCode}>
                                        <SelectTrigger id="subject"><SelectValue placeholder="Seleccione una asignatura" /></SelectTrigger>
                                        <SelectContent>{subjects?.map(s => <SelectItem key={s.id} value={s.code}>{s.name} ({s.code})</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="group">Grupo</Label>
                                    <Input id="group" placeholder="Ej. SA, Z1" value={group} onChange={e => setGroup(e.target.value.toUpperCase())} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="teacher">Docente</Label>
                                    <Select value={teacherCode} onValueChange={setTeacherCode}>
                                        <SelectTrigger id="teacher"><SelectValue placeholder="Seleccione un docente" /></SelectTrigger>
                                        <SelectContent>{teachers?.map(t => <SelectItem key={t.id} value={t.code}>{t.name}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="period">Período Académico</Label>
                                    <Select value={academicPeriodId} onValueChange={setAcademicPeriodId}>
                                        <SelectTrigger id="period"><SelectValue placeholder="Seleccione un período" /></SelectTrigger>
                                        <SelectContent>{academicPeriods?.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {/* Schedule Slots */}
                            <div className="grid gap-4">
                                <Label className="font-semibold">Horarios</Label>
                                {scheduleSlots.map((slot, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-2 items-center relative rounded-md border p-3">
                                        <div className="col-span-12 md:col-span-3 grid gap-1">
                                            <Label htmlFor={`day-${index}`} className="text-xs">Día</Label>
                                            <Select value={slot.day} onValueChange={(value) => handleSlotChange(index, "day", value)}>
                                                <SelectTrigger id={`day-${index}`}><SelectValue placeholder="Día" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Lunes">Lunes</SelectItem>
                                                    <SelectItem value="Martes">Martes</SelectItem>
                                                    <SelectItem value="Miércoles">Miércoles</SelectItem>
                                                    <SelectItem value="Jueves">Jueves</SelectItem>
                                                    <SelectItem value="Viernes">Viernes</SelectItem>
                                                    <SelectItem value="Sábado">Sábado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="col-span-6 md:col-span-4 grid gap-1">
                                            <Label htmlFor={`time-${index}`} className="text-xs">Hora</Label>
                                            <Input id={`time-${index}`} placeholder="07:00-09:15" value={slot.time} onChange={(e) => handleSlotChange(index, "time", e.target.value)} />
                                        </div>
                                        <div className="col-span-6 md:col-span-4 grid gap-1">
                                            <Label htmlFor={`classroom-${index}`} className="text-xs">Aula</Label>
                                             <Select value={slot.classroom} onValueChange={(value) => handleSlotChange(index, "classroom", value)}>
                                                <SelectTrigger id={`classroom-${index}`}><SelectValue placeholder="Aula" /></SelectTrigger>
                                                <SelectContent>{classrooms?.map(c => <SelectItem key={c.id} value={c.code}>{c.code}</SelectItem>)}</SelectContent>
                                            </Select>
                                        </div>
                                         {scheduleSlots.length > 1 && (
                                            <div className="col-span-12 md:col-span-1 flex items-end justify-end">
                                                <Button type="button" variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleRemoveSlot(index)}>
                                                    <X className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={handleAddSlot}>Agregar Horario</Button>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button type="submit">Guardar Grupo</Button>
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

    