import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function FacultadesPage() {
  return (
    <div className="flex flex-col gap-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Gestión de Facultades</h1>
        <p className="text-muted-foreground">
          Cree, actualice y gestione las facultades de la universidad.
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
