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
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { School, Users, Clipboard, Activity } from "lucide-react"
import { classrooms, teachers, users, attendanceData } from "@/lib/placeholder-data"

const KpiCard = ({ title, value, icon: Icon, description }: { title: string, value: string, icon: React.ElementType, description: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido de nuevo, aquí tienes un resumen de la actividad académica.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Estudiantes" value={users.filter(u => u.role === 'Estudiante').length.toString()} icon={Users} description="Estudiantes activos en el sistema" />
        <KpiCard title="Total Docentes" value={teachers.length.toString()} icon={Clipboard} description="Docentes registrados" />
        <KpiCard title="Aulas Disponibles" value={classrooms.filter(c => c.status === 'Disponible').length.toString()} icon={School} description="Aulas listas para ser asignadas" />
        <KpiCard title="Tasa de Asistencia" value="91.5%" icon={Activity} description="Promedio de esta semana" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Asistencia Semanal de Docentes</CardTitle>
            <CardDescription>Resumen de la asistencia registrada durante la semana actual.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={attendanceData}>
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  labelStyle={{
                    color: "hsl(var(--foreground))",
                    fontWeight: 'bold',
                  }}
                />
                <Bar dataKey="Asistencia" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Estado de Aulas</CardTitle>
            <CardDescription>
              Vista rápida del estado actual de las aulas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Aula</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="text-right">Estado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {classrooms.slice(0, 5).map(classroom => (
                         <TableRow key={classroom.id}>
                            <TableCell>
                                <div className="font-medium">{classroom.code}</div>
                                <div className="text-xs text-muted-foreground">{classroom.capacity} asientos</div>
                            </TableCell>
                            <TableCell>{classroom.type}</TableCell>
                            <TableCell className="text-right">
                                <Badge variant={classroom.status === 'Disponible' ? 'secondary' : classroom.status === 'Ocupado' ? 'destructive' : 'outline'}>
                                    {classroom.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
