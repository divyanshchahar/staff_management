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
      <SitesTable sitesDetails={siteState} stateFn={useSiteState} />
      <SumamryTable summarizedData={summarizedData} />
    </>
  );
}

export default TablesLayout;
