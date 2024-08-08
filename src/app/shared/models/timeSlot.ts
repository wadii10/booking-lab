export interface TimeSlot1 {
    startTime: string;
    endTime: string;
   date:string
    price: number;
}

export interface TimeSlot {
    id: number;
    slotStart: string;
    slotEnd: string;
    selected: boolean;
    disabled: boolean; 
    date: string;
  }
  
  export interface DaySlots {
    date: Date;
    slots: TimeSlot[];
  }
  
  export type TimeSlotData = DaySlots[];