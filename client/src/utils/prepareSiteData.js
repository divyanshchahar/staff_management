import parseDate from "./parseDate";

const prepareSiteData = (rawSiteData) => {
  const stateData = rawSiteData.map((site, id) => {
    return {
      ...site,
      InstallationDate: parseDate(site.InstallationDate),
      id: id,
      grievance: site.grievance ? "Grievence" : "Normal",
    };
  });

  return stateData;
};

export default prepareSiteData;
