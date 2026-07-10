/** Admin-only roster data, keyed by "class_name|day|time". */
export interface RosterStudent {
  bookingId: string;
  name: string;
  email: string;
  classDate: string | null;
  isRecurring: boolean;
}

export type RosterMap = Record<string, RosterStudent[]>;

export function rosterKey(className: string, day: string, time: string): string {
  return `${className}|${day}|${time}`;
}
