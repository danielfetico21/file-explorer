export const ensureMinimumDuration = async (
  startTime: number,
  minDurationMs: number = 1000
) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < minDurationMs) {
    await new Promise((res) => setTimeout(res, minDurationMs - elapsed));
  }
};
