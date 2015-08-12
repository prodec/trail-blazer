export default function debounce(fn, period) {
   let currentTimeout;

   return (...args) => {
     if (currentTimeout) {
       clearTimeout(currentTimeout);
       currentTimeout = null;
     }

     currentTimeout = setTimeout(() => {
       fn.apply(null, args);
     }, period);
  };
}
