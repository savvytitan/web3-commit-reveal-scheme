import { ITheme } from "./utils/types";

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
