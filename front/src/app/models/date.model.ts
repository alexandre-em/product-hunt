export class DateInput {
  public after: Date;
  public before: Date;

  constructor(after: Date, before: Date) {
    this.after = after;
    this.before = before;
  }
}
