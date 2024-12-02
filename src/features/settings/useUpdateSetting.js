import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi} from "../../services/apiSettings";

function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: ( newSetting ) =>
      updateSettingApi(newSetting),
    onSuccess: () => {
      toast.success("Settings successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateSetting };
}

export default useUpdateSetting;
