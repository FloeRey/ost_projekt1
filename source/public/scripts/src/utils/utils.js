function generateRandomUUID() {
  // Generate a random 32-character hexadecimal string
  const randomHex = [...Array(32)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

  // Format the randomHex string into a UUID pattern
  const uuid = `${randomHex.substring(0, 8)}-${randomHex.substring(
    8,
    4
  )}-4${randomHex.substring(12, 3)}-${
    "89ab"[Math.floor(Math.random() * 4)]
  }${randomHex.substring(15, 3)}-${randomHex.substring(18, 12)}`;

  return uuid;
}

function createJSONfromFormData(formData) {
  const json = {};
  Array.from(formData.entries()).forEach(([key, value]) => {
    json[key] = value;
  });
  return json;
}

export { generateRandomUUID, createJSONfromFormData };
