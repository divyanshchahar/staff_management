const summarizeSiteData = (processedSiteData) => {
  const groupedByDate = Object.groupBy(
    processedSiteData,
    ({ InstallationDate }) => InstallationDate
  );

  const dates = Object.keys(groupedByDate);

  const summarizedData = dates.map((date) => {
    return {
      date,
      grievences: groupedByDate[date].filter(
        (item) => item.grievance === "Grievence"
      ),
      normal: groupedByDate[date].filter((item) => item.grievance === "Normal"),
    };
  });

  return summarizedData;
};

export default summarizeSiteData;
