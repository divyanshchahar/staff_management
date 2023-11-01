import { useState } from "react";
import rawSiteData from "../../files/rawSiteData.json";
import parseDate from "../../utils/parseDate";
import prepareSiteData from "../../utils/prepareSiteData";

function SitesTable() {
  const stateData = prepareSiteData(rawSiteData);

  const handleChange = (e) => {
    const updatedSite = siteState.map((site) => {
      if (site.id == e.target.name)
        return { ...site, InstallationDate: e.target.value };

      return site;
    });

    useSiteState(updatedSite);
  };

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
        return (
          <>
            <tr key={site.id}>
              <td>{site.name}</td>
              <td>{site.phone}</td>
              <td>{site.city}</td>
              <td>{site.AssignedElectritian}</td>
              <td>
                <input
                  type="date"
                  value={site.InstallationDate}
                  name={site.id}
                  onChange={handleChange}
                />
              </td>
              <td>{site.grievance}</td>
            </tr>
          </>
        );
      })}
    </table>
  );
}

export default SitesTable;
