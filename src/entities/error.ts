class PoolError extends Error {
  poolParams: string;

  constructor(message: string, poolParams: string) {
    super(message);
    this.poolParams = poolParams;
  }
}
