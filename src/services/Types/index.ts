export type Appointment = {
  providerId: string;
  services: [
    {
      id: string;
      price: string;
      duration: string;
    },
  ];
  date: string;
  startTime: string;
  endTime: string;
  totalDuration: string;
  totalPrice: string;
  tax: number;
  fee: number;
  discount: number;
};
export type AppointmentResechedule = {
  appointmentId:string;
  providerId: string;
  services: [
    {
      id: string;
      price: string;
      duration: string;
    },
  ];
  date: string;
  startTime: string;
  endTime: string;
  totalDuration: string;
  totalPrice: string;
  tax: number;
  fee: number;
  discount: number;
};
