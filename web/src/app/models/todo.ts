export interface Todo {
  id?: number;
  title: string;
  isComplete: boolean;
  tags: string[];
  reminder: Date
}
