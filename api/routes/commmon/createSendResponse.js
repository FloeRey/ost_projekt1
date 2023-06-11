export function sendError(err) {
  if (typeof err.error === "string") {
    return { error: err.error };
  }

  if (typeof err.message === "string" && err.message.search(/[[]msg/) !== -1) {
    return {
      error: err.message.replace("[msg]", "").replace(/^\s+|\s+$/gm, ""),
    };
  }
  return { error: "undefined error" };
}

export function send(data) {
  return { msg: data };
}
