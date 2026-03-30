 export const logErrorToMyService = (error) => {
  console.error("Logged Error:", {
    message: error?.message,
    stack: error?.stack,
    time: new Date().toISOString(),
  });
};