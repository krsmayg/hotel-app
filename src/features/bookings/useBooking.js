import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams, useSearchParams } from "react-router-dom";

function useBooking() {
  const {bookingId} = useParams();
  
  const {
    isLoading,
    data: booking, 
    error,
  } = useQuery({
    queryKey: ["booking", bookingId], // works like a dependency array in React
    queryFn: () => getBooking(bookingId),
  });

  return { isLoading, booking, error };
}

export default useBooking;
