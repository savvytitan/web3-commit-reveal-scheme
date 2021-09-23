export enum ITextSize {
  xs = "10px",
  sm = "12px",
  md = "16px",
  lg = "20px",
  xl = "24px",
}

export interface ITheme {
  color: Record<
    | "transparent"
    | "black"
    | "gray"
    | "white"
    | "success"
    | "danger"
    | "info"
    | "warning",
    string
  >;

  text: {
    size: Record<"xs" | "sm" | "md" | "lg" | "xl", ITextSize>;
  };
}

export enum IVote {
  up = "1",
  down = "2",
}
