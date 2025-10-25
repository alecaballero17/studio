import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function PeriodosPage() {
  return (
    <div className="flex flex-col gap-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Gestión de Períodos Académicos</h1>
        <p className="text-muted-foreground">
          Defina períodos con fechas de inicio y fin para organizar cursos e inscripciones.
        </p>
      </div>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>En Construcción</CardTitle>
          <CardDescription>Esta sección está actualmente en desarrollo.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
          <Construction className="size-16 text-muted-foreground" />
          <p className="text-lg font-medium">Página en construcción</p>
          <p className="text-muted-foreground">Estamos trabajando para traer esta funcionalidad pronto.</p>
        </CardContent>
      </Card>
    </div>
  )
}
