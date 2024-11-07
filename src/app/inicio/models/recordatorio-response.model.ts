// RecordatorioResponse model
export interface RecordatorioResponse {
    recordatorioId?: number; // Agregado para ID opcional en caso de actualizar
    title: string;
    description: string;
    date: string; // Fecha en formato string para compatibilidad con input date
    time: string; // Hora en formato string para compatibilidad con input time
    type: string; // Tipo de recordatorio (consulta, revisión, vacunación, etc.)
  }
  