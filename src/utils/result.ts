export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: Error;
  private value?: T;

  private constructor(isSuccess: boolean, error?: Error, value?: T) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    if (error) this.error = error;
    if (value) this.value = value;

    Object.freeze(this);
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: Error): Result<U> {
    return new Result<U>(false, error);
  }

  public getValue(): T {
    if (this.isFailure) throw new Error('Resultado com falha, nao contem valor.');
    return this.value as T;
  }
}