export interface CalendarProps {
  selectedDate?: Date | null;
  className?: string;
  onDateChange?: (date: Date) => void;
}

export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}
