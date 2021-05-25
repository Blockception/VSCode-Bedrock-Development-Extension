/**
 *
 */
export interface Script {
  /**
   *
   */
  animate?: (string | { [animation: string]: string })[];
  /**
   *
   */
  initialize?: string[];
  /**
   *
   */
  pre_animation?: string[];
}
