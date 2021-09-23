import { ITheme, ITextSize } from "../../utils/types";

const theme: ITheme = {
  color: {
    transparent: "transparent",
    black: "#000",
    gray: "#999",
    white: "#fff",

    success: "#42ba96",
    danger: "#f84960",
    info: "#467fd0",
    warning: "#ffc107",
  },

  text: {
    size: {
      xs: ITextSize.xs,
      sm: ITextSize.sm,
      md: ITextSize.md,
      lg: ITextSize.lg,
      xl: ITextSize.xl,
    },
  },
};

export default theme;
