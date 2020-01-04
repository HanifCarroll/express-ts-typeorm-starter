export function wrapAsync(fn) {
  return function(req, res, next): void {
    fn(req, res, next).catch(next);
  };
}
