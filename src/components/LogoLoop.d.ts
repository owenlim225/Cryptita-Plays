import type { CSSProperties, ReactNode } from "react";

export type LogoLoopItem =
  | {
      src: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
      alt?: string;
      title?: string;
      href?: string;
    }
  | { node: ReactNode; href?: string; ariaLabel?: string; title?: string };

export type LogoLoopProps = {
  logos: LogoLoopItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: string | number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoLoopItem, key: string) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

declare const LogoLoop: import("react").MemoExoticComponent<
  (props: LogoLoopProps) => import("react").JSX.Element
>;

export { LogoLoop };
export default LogoLoop;
