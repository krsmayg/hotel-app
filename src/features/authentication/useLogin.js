import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginApi({ email, password });
    },
    onSuccess: (user) => {
      queryClient.setQueriesData(["user", user]);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Provided email or password incorrect");
    },
  });
  return { isLoading, login, error };
}

export default useLogin;
