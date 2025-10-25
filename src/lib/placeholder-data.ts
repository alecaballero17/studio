import { PlaceHolderImages } from "./placeholder-images";

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Docente' | 'Estudiante';
  status: 'Activo' | 'Inactivo';
  avatar: string;
};

export const users: User[] = [
  { id: 'USR001', name: 'Ana Morales', email: 'ana.morales@ficct.uagrm.edu.bo', role: 'Administrador', status: 'Activo', avatar: PlaceHolderImages.find(img => img.id === 'user-avatar-2')?.imageUrl || '' },
  { id: 'USR002', name: 'Carlos Sanchez', email: 'carlos.sanchez@ficct.uagrm.edu.bo', role: 'Docente', status: 'Activo', avatar: PlaceHolderImages.find(img => img.id === 'user-avatar-3')?.imageUrl || '' },
  { id: 'USR003', name: 'Luisa Fernandez', email: 'luisa.fernandez@ficct.uagrm.edu.bo', role: 'Estudiante', status: 'Activo', avatar: PlaceHolderImages.find(img => img.id === 'user-avatar-7')?.imageUrl || '' },
  { id: 'USR004', name: 'Jorge Paredes', email: 'jorge.paredes@ficct.uagrm.edu.bo', role: 'Estudiante', status: 'Inactivo', avatar: PlaceHolderImages.find(img => img.id === 'user-avatar-6')?.imageUrl || '' },
  { id: 'USR005', name: 'Sofia Rodriguez', email: 'sofia.rodriguez@ficct.uagrm.edu.bo', role: 'Docente', status: 'Activo', avatar: PlaceHolderImages.find(img => img.id === 'user-avatar-5')?.imageUrl || '' },
];

export type Teacher = {
  id: string;
  code: string;
  name: string;
  email: string;
  category: 'Titular' | 'Asociado' | 'Asistente';
  dedication: 'Tiempo Completo' | 'Medio Tiempo' | 'Hora Catedra';
  avatar: string;
};

export const teachers: Teacher[] = [
  { id: 'DOC001', code: 'CSAN', name: 'Carlos Sanchez', email: 'carlos.sanchez@ficct.uagrm.edu.bo', category: 'Titular', dedication: 'Tiempo Completo', avatar: PlaceHolderImages.find(img => img.id === 'user-avatar-3')?.imageUrl || '' },
  { id: 'DOC002', code: 'SROD', name: 'Sofia Rodriguez', email: 'sofia.rodriguez@ficct.uagrm.edu.bo', category: 'Asociado', dedication: 'Tiempo Completo', avatar: PlaceHolderImages.find(img => img.id === 'user-avatar-5')?.imageUrl || '' },
  { id: 'DOC003', code: 'MPER', name: 'Mario Perez', email: 'mario.perez@ficct.uagrm.edu.bo', category: 'Asistente', dedication: 'Medio Tiempo', avatar: PlaceHolderImages.find(img => img.id === 'user-avatar-4')?.imageUrl || '' },
  { id: 'DOC004', code: 'LGOM', name: 'Laura Gomez', email: 'laura.gomez@ficct.uagrm.edu.bo', category: 'Titular', dedication: 'Tiempo Completo', avatar: PlaceHolderImages.find(img => img.id === 'user-avatar-2')?.imageUrl || '' },
];

export type Classroom = {
  id: string;
  code: string;
  capacity: number;
  type: 'Laboratorio' | 'Aula Común' | 'Auditorio';
  status: 'Disponible' | 'Ocupado' | 'Mantenimiento';
};

export const classrooms: Classroom[] = [
  { id: 'AUL001', code: '225-LC1', capacity: 40, type: 'Laboratorio', status: 'Disponible' },
  { id: 'AUL002', code: '225-A1', capacity: 60, type: 'Aula Común', status: 'Ocupado' },
  { id: 'AUL003', code: '210-A5', capacity: 50, type: 'Aula Común', status: 'Disponible' },
  { id: 'AUL004', code: 'AUD-FICCT', capacity: 150, type: 'Auditorio', status: 'Mantenimiento' },
  { id: 'AUL005', code: '225-LC2', capacity: 40, type: 'Laboratorio', status: 'Disponible' },
];

export type Faculty = {
  id: string;
  name: string;
  code: string;
};

export const faculties: Faculty[] = [
    { id: 'FAC001', name: 'Facultad de Ingeniería en Ciencias de la Computación y Telecomunicaciones', code: 'FICCT' },
    { id: 'FAC002', name: 'Facultad de Ciencias Económicas y Financieras', code: 'FACEF' },
    { id: 'FAC003', name: 'Facultad de Humanidades', code: 'FH' },
    { id: 'FAC004', name: 'Facultad Politécnica', code: 'FP' },
];


export const attendanceData = [
    { date: "Lun", Asistencia: 92 },
    { date: "Mar", Asistencia: 95 },
    { date: "Mié", Asistencia: 88 },
    { date: "Jue", Asistencia: 91 },
    { date: "Vie", Asistencia: 85 },
    { date: "Sáb", Asistencia: 70 },
];
