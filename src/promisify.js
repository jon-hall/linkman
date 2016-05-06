/**
 * Promisifies a function which takes a 'node-style' callback.
 * @param  {Function} fn The function to be promisified.
 * @param  {Number}   [n=fn.length - 1] The index of the callback argument, defaults to last arg of function,
 * or next argument after all those supplied (e.g. if the function can take 4 args but only two are passed then
 * the third arg will be treated as the one for the callback).
 * @return {Function}      The promisifed function.
 */
export default function promisify(fn, n = fn.length - 1) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            function handler(err, result) {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            }

            // Insert our callback argument
            args.splice(Math.min(n, args.length), 0, handler);

            fn.apply(this, args);
        });
    }
}
