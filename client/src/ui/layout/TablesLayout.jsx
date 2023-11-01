import { useState } from "react";
import rawSiteData from "../../files/rawSiteData.json";
import prepareSiteData from "../../utils/prepareSiteData";
import summarizeSiteData from "../../utils/summarizeSiteData";
import SumamryTable from "./SumamryTable";
import SitesTable from "./SitesTable";

function TablesLayout() {
  const [siteState, useSiteState] = useState(prepareSiteData(rawSiteData));
  const summarizedData = summarizeSiteData(siteState);

  return (
    <>
      <SumamryTable summarizedData={summarizedData} />
      <SitesTable sitesDetails={siteState} stateFn={useSiteState} />
    </>
  );
}

export default TablesLayout;
