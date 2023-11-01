import rawSiteData from "../../files/rawSiteData.json";
import parseDate from "../../utils/parseDate";

function SitesTable() {
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
      {rawSiteData.map((site) => {
        const parsedDate = parseDate(site.InstallationDate);
        return (
          <>
            <tr>
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
