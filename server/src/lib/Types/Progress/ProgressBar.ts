import { WorkDoneProgressReporter } from "vscode-languageserver";
import { Manager } from '../../Manager/Manager';


export class ProgressBar {
  private value: number;
  private maximum: number;
  private reporter: WorkDoneProgressReporter;

  constructor(reporter: WorkDoneProgressReporter, title: string, value: number = 0, max: number = 1) {
    this.value = value;
    this.maximum = max;
    this.reporter = reporter;
    this.reporter.begin(title, this.getPercentage());
  }

  setValue(value: number): void {
    this.value = value;
    this.maximum = Math.max(value, this.maximum);
  }

  addValue(value: number = 1): void {
    this.setValue(this.value + value);
  }

  getValue(): number {
    return this.value;
  }

  getPercentage() : number {
    return (this.value / this.maximum) * 100
  }

  setMaximum(value: number): void {
    this.maximum = value;
    this.value = Math.min(this.value, this.maximum);
  }

  addMaximum(value: number = 1): void {
    this.setMaximum(this.maximum + value);
  }

  getMaximum(): number {
    return this.value;
  }

  sendProgress(message?: string): void {
    if (message) {
      this.reporter.report(this.getPercentage(), message);
    } else {
      this.reporter.report(this.getPercentage());
    }
  }

  sendMessage(message: string): void {
    this.reporter.report(message);
  }

  done() {
    this.reporter.done();
  }
}

/**
 * 
 */
export namespace ProgressBar {
  /**
   * 
   * @param title 
   * @param value 
   * @param max 
   * @returns 
   */
  export function create(title: string, value: number = 0, max: number = 1): Promise<ProgressBar> {
    const temp = Manager.Connection.window.createWorkDoneProgress();
    return temp.then((item) => {
      return new ProgressBar(item, title, value, max);
    });
  }
}
