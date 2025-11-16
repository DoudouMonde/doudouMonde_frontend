export interface CalendarProps {
  className?: string;
  onDateChange?: (date: Date) => void;
}

export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}
