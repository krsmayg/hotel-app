import { updateBooking } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: ( bookingId ) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking  ${data.id} successfully checked out`);
      queryClient.invalidateQueries({
        active: true, // invaildate all active queries, as an alternative to pass queryKey with [checked-in]
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkout, isCheckingOut };
}
 