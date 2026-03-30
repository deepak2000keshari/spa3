import { useRef } from "react";
function useDebounce(fn, delay) {
    const timeoutId = useRef(null);
    return function (...args){
        if (timeoutId.current) { 
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}


export default useDebounce;