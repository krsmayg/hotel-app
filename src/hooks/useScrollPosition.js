import { useEffect, useState } from "react";

function useScrollPosition(scrollRef, handleFn, dependency) {
  useEffect(() => {
    const container = scrollRef.current;
    const handleScroll = () => {
      if (container && dependency) {
        handleFn();
      }
    };
   container.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollRef, handleFn, dependency]);
}

export default useScrollPosition;
