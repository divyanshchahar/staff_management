import { useState } from "react";
import rawSiteData from "../../files/rawSiteData.json";
import parseDate from "../../utils/parseDate";

function SitesTable() {
  const stateData = rawSiteData.map((site, id) => {
    return {
      ...site,
      InstallationDate: parseDate(site.InstallationDate),
      id: id,
    };
  });

  const [siteState, useSiteState] = useState(stateData);
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>City</th>
        <th>Electrician</th>
        <th>Date</th>
        <th>Type</th>
      </tr>
      {siteState.map((site) => {
        const parsedDate = parseDate(site.InstallationDate);
        return (
          <>
            <tr key={site.id}>
              <td>{site.name}</td>
              <td>{site.phone}</td>
              <td>{site.phone}</td>
              <td>{site.AssignedElectritian}</td>
              <td>{parsedDate}</td>
              <td>{site.grievance ? "Grievence" : "Normal"}</td>
            </tr>
          </>
        );
      })}
    </table>
  );
}

export default SitesTable;
