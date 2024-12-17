import { ref } from "vue";
import { topics } from "@/features/task/config";

const step = ref<number>(1);
const activeTopic = ref<number>(1);
const message = ref<string>("");
export const useTaskView = () => {
  const onResetForm = () => {
    step.value = 1;
    activeTopic.value = 1;
    message.value = "";
  };
  return {
    step,
    topics,
    activeTopic,
    message,
    onResetForm,
  };
};
