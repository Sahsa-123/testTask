type RequiredProps = {
  name: string;
  year: number;
  rating: number;
  to: string;
  img?: string;
};

export type CustomCardProps<T = undefined> = RequiredProps & { state?: T };