export const LoggerMiddleware = (req: Request, res: Response, next: () => unknown): void => {
  console.log('Request...');
  next();
};
