import { useNavigate, useParams } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking  ${data.id} successfully checked in`);
      queryClient.invalidateQueries({
        active: true, // invaildate all active queries, as an alternative to pass queryKey with [checked-in]
      });
      // navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkin, isCheckingIn };
}
 