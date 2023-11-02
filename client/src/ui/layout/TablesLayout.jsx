import { useState } from "react";
import rawSiteData from "../../files/rawSiteData.json";
import prepareSiteData from "../../utils/prepareSiteData";
import summarizeSiteData from "../../utils/summarizeSiteData";
import SumamryTable from "./SumamryTable";
import SitesTable from "./SitesTable";
import balanceLoad from "../../utils/balanceLoad";

function TablesLayout() {
  const [siteState, useSiteState] = useState(prepareSiteData(rawSiteData));
  const summarizedData = summarizeSiteData(siteState);

  const handleClick = () => {
    const allowCalculation = summarizedData.map((item) => {
      if (item.solutionFeasible) {
        return "yes";
      }
      return "no";
    });

    if (allowCalculation.includes("no")) {
      console.log(
        "Unable to process solution, some electricians could have more than 3 site assigned to them. please make sure that all rows in Solution column of Summary row read yes"
      );
      return;
    }
    balanceLoad(summarizedData);
  };

  return (
    <>
      <button onClick={() => handleClick()}>Calculate Solution</button>
      <SitesTable sitesDetails={siteState} stateFn={useSiteState} />
      <SumamryTable summarizedData={summarizedData} />
    </>
  );
}

export default TablesLayout;
