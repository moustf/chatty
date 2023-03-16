export class GenericError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);

    this.name = 'Generic Error';
    this.message = message;
    this.status = status;
  }
}
