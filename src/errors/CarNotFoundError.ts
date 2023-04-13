export default class CarNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'CarNotFoundError';
    this.stack = '404';
  }
}