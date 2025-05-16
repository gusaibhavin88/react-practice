function buildQuery(params) {
  // Filter out null or undefined values to avoid empty params
  const filteredParams = Object.entries(params).filter(
    ([key, value]) => value !== undefined && value !== null && value !== ""
  );

  // Create query string using URLSearchParams
  const queryString = new URLSearchParams(filteredParams).toString();

  // Return query string prefixed with '?', or empty string if no params
  return queryString ? `?${queryString}` : "";
}

export default buildQuery;
