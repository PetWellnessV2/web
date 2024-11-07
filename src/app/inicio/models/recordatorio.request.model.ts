// RecordatorioRequest model
export interface RecordatorioRequest {
  id: number; // ID del recordatorio
  title: string; // Título del recordatorio
  description: string; // Descripción adicional o detalles
  time: string; // Hora del recordatorio
  icon: string; // URL o path del icono
}
