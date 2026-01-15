export const getTaskStatus = (deadline, isCompleted) => {
  if (isCompleted) return "";
  if (deadline === "Без дедлайну") return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);

  if (deadlineDate < today) return "overdue";
  if (deadlineDate.getTime() === today.getTime()) return "today";

  return "";
};