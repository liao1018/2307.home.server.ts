class ApiError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    if (!message) {
      switch (status) {
        case 400:
          message = "Bad request";
          break;
        case 401:
          message = "Unauthorized";
          break;
        case 403:
          message = "Forbidden";
          break;
        case 404:
          message = "Not found";
          break;
        case 500:
          message = "Internal server error";
          break;

        default:
          message = "Something went wrong";
          break;
      }
    }

    super(message);
    this.status = status;
  }
}

export { ApiError };
