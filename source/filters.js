const filters = {
  celsiusCheck: false,
};

const setFilters = (object) => {
  if (typeof object.celsiusCheck === "boolean") {
    filters.celsiusCheck = object.celsiusCheck;
  }
};

export { setFilters, filters };
