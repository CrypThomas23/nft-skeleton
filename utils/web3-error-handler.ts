export const getWeb3Error = (
  error: any = null
): { message: string; code: string } => {
  let errorMessage = "Unknown error...";
  let errorCode = null;

  if (null === error || typeof error === "string") {
    errorMessage = error;
  } else if (typeof error === "object") {
    // Support any type of error from the Web3 Provider...
    if (error?.error?.message !== undefined) {
      errorMessage = error.error.message;
      errorCode = error.error.code;
    } else if (error?.data?.message !== undefined) {
      errorMessage = error.data.message;
      errorCode = error.data.code;
    } else if (error?.message !== undefined) {
      errorMessage = error.message;
      errorCode = error.code;
    }
  }

  return { message: errorMessage, code: errorCode?.toString() };
};
