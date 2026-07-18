
// middleware/mongoSafeSanitizer.js

function sanitize(value) {
  // Ignore null and primitive values
  if (value === null || typeof value !== "object") {
    return;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    for (const item of value) {
      sanitize(item);
    }
    return;
  }

  // Handle objects
  for (const key of Object.keys(value)) {
    // Remove MongoDB operator keys and dot notation
    if (key.startsWith("$") || key.includes(".")) {
      delete value[key];
      continue;
    }
    sanitize(value[key]);
  }
}

const mongoSafeSanitizer = (req, res, next) => {
  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);

  next();
};