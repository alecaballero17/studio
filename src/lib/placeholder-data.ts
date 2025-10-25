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
    { id: 'DOC001', code: 'FFMO', name: 'FLORES FLORES MARCOS OSCAR', email: 'fflores@uagrm.edu.bo', category: 'Titular', dedication: 'Tiempo Completo', avatar: 'https://picsum.photos/seed/doc1/40/40' },
    { id: 'DOC002', code: 'CMJR', name: 'CABELLO MERIDA JUAN RUBEN', email: 'jcabello@uagrm.edu.bo', category: 'Asociado', dedication: 'Tiempo Completo', avatar: 'https://picsum.photos/seed/doc2/40/40' },
    { id: 'DOC003', code: 'CUJM', name: 'CORTEZ UZEDA JULIO MARTIN', email: 'jcortez@uagrm.edu.bo', category: 'Asistente', dedication: 'Medio Tiempo', avatar: 'https://picsum.photos/seed/doc3/40/40' },
    { id: 'DOC004', code: 'GBKE', name: 'GUTIERREZ BRUNO KATIME ESTHER', email: 'kgutierrez@uagrm.edu.bo', category: 'Titular', dedication: 'Tiempo Completo', avatar: 'https://picsum.photos/seed/doc4/40/40' },
    { id: 'DOC005', code: 'GPED', name: 'GIANELLA PEREDO EDUARDO', email: 'eperedo@uagrm.edu.bo', category: 'Asociado', dedication: 'Tiempo Completo', avatar: 'https://picsum.photos/seed/doc5/40/40' },
    { id: 'DOC006', code: 'MDVF', name: 'MONRROY DIPP VICTOR FERNANDO', email: 'vmonrroy@uagrm.edu.bo', category: 'Titular', dedication: 'Tiempo Completo', avatar: 'https://picsum.photos/seed/doc6/40/40' },
    { id: 'DOC007', code: 'CCM', name: 'CARVAJAL CORDERO MARCIO', email: 'mcarvajal@uagrm.edu.bo', category: 'Asistente', dedication: 'Hora Catedra', avatar: 'https://picsum.photos/seed/doc7/40/40' },
    { id: 'DOC008', code: 'HSJS', name: 'HINOJOSA SAAVEDRA JOSE SAID', email: 'jhinojosa@uagrm.edu.bo', category: 'Titular', dedication: 'Tiempo Completo', avatar: 'https://picsum.photos/seed/doc8/40/40' },
    { id: 'DOC009', code: 'VGJO', name: 'VEIZAGA GONZALES JOSUE OBED', email: 'jveizaga@uagrm.edu.bo', category: 'Asociado', dedication: 'Tiempo Completo', avatar: 'https://picsum.photos/seed/doc9/40/40' },
    { id: 'DOC010', code: 'VPL', name: 'VARGAS PEÑA LEONARDO', email: 'lvargas@uagrm.edu.bo', category: 'Titular', dedication: 'Tiempo Completo', avatar: 'https://picsum.photos/seed/doc10/40/40' },
    { id: 'DOC011', code: 'PFU', name: 'PEREZ FERREIRA UBALDO', email: 'uperez@uagrm.edu.bo', category: 'Asistente', dedication: 'Medio Tiempo', avatar: 'https://picsum.photos/seed/doc11/40/40' },
    { id: 'DOC012', code: 'APGW', name: 'ALVAREZ PARADA GUIDO WALDIR', email: 'galvarez@uagrm.edu.bo', category: 'Titular', dedication: 'Tiempo Completo', avatar: 'https://picsum.photos/seed/doc12/40/40' },
    { id: 'DOC013', code: 'CCRE', name: 'CUELLAR CARRANZA RENE', email: 'rcuellar@uagrm.edu.bo', category: 'Asociado', dedication: 'Tiempo Completo', avatar: 'https://picsum.photos/seed/doc13/40/40' },
    { id: 'DOC014', code: 'CFJJ', name: 'CRUZ FLORES JUAN JOSE', email: 'jcruz@uagrm.edu.bo', category: 'Asistente', dedication: 'Hora Catedra', avatar: 'https://picsum.photos/seed/doc14/40/40' },
    { id: 'DOC015', code: 'MFE', name: 'MENDOZA FRANCO ELAR', email: 'emendoza@uagrm.edu.bo', category: 'Titular', dedication: 'Tiempo Completo', avatar: 'https://picsum.photos/seed/doc15/40/40' },
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

export type Subject = {
  id: string;
  code: string;
  name: string;
  level: number;
  credits: number;
}

export const subjects: Subject[] = [
  { id: 'SUB001', code: 'INF-111', name: 'INTRODUCCION A LA INFORMATICA', level: 1, credits: 4 },
  { id: 'SUB002', code: 'MAT-101', name: 'CALCULO I', level: 1, credits: 5 },
  { id: 'SUB003', code: 'FIS-100', name: 'FISICA I', level: 1, credits: 5 },
  { id: 'SUB004', code: 'LIN-100', name: 'LENGUAJE Y COMUNICACION', level: 1, credits: 3 },
  { id: 'SUB005', code: 'ADM-100', name: 'ADMINISTRACION GENERAL', level: 1, credits: 3 },
  { id: 'SUB006', code: 'INF-121', name: 'PROGRAMACION I', level: 2, credits: 4 },
  { id: 'SUB007', code: 'MAT-102', name: 'CALCULO II', level: 2, credits: 5 },
  { id: 'SUB008', code: 'FIS-102', name: 'FISICA II', level: 2, credits: 5 },
  { id: 'SUB009', code: 'INF-211', name: 'ESTRUCTURA DE DATOS I', level: 3, credits: 5 },
  { id: 'SUB010', code: 'INF-221', name: 'PROGRAMACION II', level: 4, credits: 4 },
  { id: 'SUB011', code: 'INF-312', name: 'SISTEMAS OPERATIVOS I', level: 5, credits: 4 },
  { id: 'SUB012', code: 'INF-322', name: 'BASE DE DATOS I', level: 6, credits: 5 },
];
