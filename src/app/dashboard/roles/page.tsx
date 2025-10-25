"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { allPermissions, roles, type Role, type Permission } from "@/lib/placeholder-data"
import { PlusCircle } from "lucide-react"

// Helper function to group permissions by category
const groupPermissionsByCategory = (permissions: Permission[]) => {
  return permissions.reduce((acc, permission) => {
    const { category } = permission;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);
};


export default function RolesPage() {
  const [currentRoles, setCurrentRoles] = React.useState<Role[]>(roles);

  const handlePermissionChange = (roleId: string, permissionId: string, checked: boolean) => {
    setCurrentRoles(prevRoles =>
      prevRoles.map(role => {
        if (role.id === roleId) {
          const newPermissions = checked
            ? [...role.permissions, permissionId]
            : role.permissions.filter(id => id !== permissionId);
          return { ...role, permissions: newPermissions };
        }
        return role;
      })
    );
  };
  
  const groupedPermissions = groupPermissionsByCategory(allPermissions);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Roles y Permisos</h1>
        <p className="text-muted-foreground">
          Defina roles y asigne permisos para controlar el acceso a las funciones.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
                <CardTitle>Roles del Sistema</CardTitle>
                <CardDescription>
                Administre los roles y sus permisos asociados.
                </CardDescription>
            </div>
            <Button size="sm" className="gap-1" disabled>
                <PlusCircle className="h-4 w-4" />
                Agregar Rol
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {currentRoles.map((role) => (
              <AccordionItem key={role.id} value={role.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col text-left">
                    <span className="text-lg font-medium">{role.name}</span>
                    <span className="text-sm font-normal text-muted-foreground">{role.description}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                        {Object.entries(groupedPermissions).map(([category, permissions]) => (
                            <div key={category} className="flex flex-col gap-4">
                                <h4 className="font-semibold text-base border-b pb-2">{category}</h4>
                                <div className="flex flex-col gap-3">
                                {permissions.map(permission => (
                                    <div key={permission.id} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={`${role.id}-${permission.id}`}
                                        checked={role.permissions.includes(permission.id)}
                                        onCheckedChange={(checked) => handlePermissionChange(role.id, permission.id, !!checked)}
                                        disabled={role.name === 'Administrador'}
                                    />
                                    <Label htmlFor={`${role.id}-${permission.id}`} className="font-normal cursor-pointer">
                                        {permission.label}
                                    </Label>
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))}
                    </div>
                     <div className="flex justify-end mt-6">
                        <Button disabled={role.name === 'Administrador'}>Guardar Cambios</Button>
                    </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
