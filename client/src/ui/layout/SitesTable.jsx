function SitesTable({ sitesDetails, stateFn }) {
  const handleChange = (e) => {
    const updatedSite = sitesDetails.map((site) => {
      if (site.id == e.target.name)
        return { ...site, InstallationDate: e.target.value };

      return site;
    });

    stateFn(updatedSite);
  };

  return (
    <>
      <h1>Details</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>City</th>
          <th>Electrician</th>
          <th>Date</th>
          <th>Type</th>
        </tr>
        {sitesDetails.map((site) => {
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
    </>
  );
}

export default SitesTable;
