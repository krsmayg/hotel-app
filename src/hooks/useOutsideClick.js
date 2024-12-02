import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturingPhase=true) {
  const ref= useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log(  ("You clicked outside of me!"));
        handler();
      }
    }
    document.addEventListener('click', handleClick, listenCapturingPhase); // будет обрабатыватся тоько на фазе перехвата, а иначче моальное окно будет сразу же закрыватся

    return () => document.removeEventListener("click", handleClick, listenCapturingPhase)
  }, [handler, listenCapturingPhase])

  return ref
}

export default useOutsideClick
