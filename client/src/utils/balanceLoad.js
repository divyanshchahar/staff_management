import electricianData from "../files/electricianData";

// ########################
// # CALCULATING SOLUTION #
// ########################

// Extractiong only relevent information from sites
const generateLoadMap = (summarizedData) => {
  const loadMap = summarizedData.map((item) => {
    return {
      date: item.date,
      grievences: item.grievences.map((grievenceItem) => grievenceItem.id),
      normal: item.normal.map((normalItem) => normalItem.id),
    };
  });
  return loadMap;
};

// Adding ids and returning seprate arrays for grievence electrician and normal electrician
const retrieveElectricianId = (arrayData) => {
  // adding ids
  const electricianWithIds = arrayData.map((item, id) => {
    return { id, ...item };
  });

  //filtering grivence electrician
  const grievencElectricians = electricianWithIds.filter(
    (electrician) => electrician.grievanceElectrician
  );

  const grievenceElectricianIds = grievencElectricians.map((item) => item.id);

  // filtering normal electricians
  const normalElectricians = electricianWithIds.filter(
    (electrician) => !electrician.grievanceElectrician
  );

  const normalElectricianIds = normalElectricians.map((item) => item.id);

  return [electricianWithIds, grievenceElectricianIds, normalElectricianIds];
};

// Calculating Load Ratio i.e. number of site of given type / number of electrician of given type
const calculateLoadRatio = (
  grievenceLoad,
  normalLoad,
  grievenceElectricianId,
  normalElectricianId
) => {
  const grievenceLoadRatio =
    grievenceLoad.length / grievenceElectricianId.length;

  const normalLoadRatio = normalLoad.length / normalElectricianId.length;

  return normalLoadRatio <= 3 && grievenceLoadRatio <= 3;
};

// Performing balancing on unblanaced load
const swipeElemets = (smallLoad, largeLoad, excessLoad) => {
  const balancedLoad1 = [
    ...smallLoad,
    ...largeLoad.slice(largeLoad.length - excessLoad, largeLoad.length),
  ];

  const balancedLoad2 = largeLoad.slice(0, largeLoad.length - excessLoad);

  return [balancedLoad1, balancedLoad2];
};

// Determining which array needs balancing and then balancing it
const balanceLoadArrays = (
  load1,
  load2,
  loadRatio1,
  loadRatio2,
  desiredLoadRatio
) => {
  let excessLoad = 0;

  let balancedLoad1 = [];
  let balancedLoad2 = [];

  if (loadRatio1 > loadRatio2) {
    excessLoad = load1.length % desiredLoadRatio;

    const [temp1, temp2] = swipeElemets(load2, load1, excessLoad);

    balancedLoad1 = [...temp1];
    balancedLoad2 = [...temp2];
  } else {
    excessLoad = load2.length % desiredLoadRatio;

    const [temp1, temp2] = swipeElemets(load1, load2, excessLoad);
    balancedLoad1 = [...temp1];
    balancedLoad2 = [...temp2];
  }

  return [balancedLoad1, balancedLoad2];
};

// Generating arrays for assignong sites
const generateSolutionArray = (load, worker) => {
  let solution = [];

  let subArrayCount = 0;

  if (load.length > worker.length) {
    subArrayCount = worker.length;
  } else {
    subArrayCount = load.length;
  }

  for (let i = 0; i < subArrayCount; i++) {
    solution.push([]);
  }

  load.forEach((item, index) => {
    const location = index % worker.length;
    solution[location].push(item);
  });

  return solution;
};

// Putting together solution data
const generateSolutionMap = (
  date,
  balancedGrievenceLoadArray,
  balancedNormalLoadArray,
  grievenceElectricianId,
  normalElectricianId
) => {
  // generate solution array for grievence
  const grievenceSolutionArray = generateSolutionArray(
    balancedGrievenceLoadArray,
    grievenceElectricianId
  );

  // generate solution array for normal
  const normalSolutionArray = generateSolutionArray(
    balancedNormalLoadArray,
    normalElectricianId
  );

  // generate solution object

  const solution = [];

  grievenceElectricianId.map((item, index) => {
    solution.push({ workerId: item, sites: grievenceSolutionArray[index] });
  });

  normalElectricianId.map((item, index) => {
    solution.push({ workerId: item, sites: normalSolutionArray[index] });
  });

  return { date, solution };
};

// Executing the steps to calculate solution
const calculateSolution = (
  date,
  grievenceLoad,
  normalLoad,
  grievenceElectricianId,
  normalElectricianId
) => {
  if (
    calculateLoadRatio(
      grievenceLoad,
      normalLoad,
      grievenceElectricianId,
      normalElectricianId
    )
  ) {
    const solutionMap = generateSolutionMap(
      date,
      grievenceLoad,
      normalLoad,
      grievenceElectricianId,
      normalElectricianId
    );

    return solutionMap;
  } else {
    const [balancedLoadArray1, balancedLoadArray2] = balanceLoadArrays(
      grievenceLoad,
      normalLoad
    );

    const solutionMap = generateSolutionMap(
      date,
      balancedLoadArray1,
      balancedLoadArray2,
      grievenceElectricianId,
      normalElectricianId
    );

    return solutionMap;
  }
};

// ##########################
// # BUILDING SOLUTION DATA #
// ##########################

// function to un group sites data
const ungroupData = (summarizedData) => {
  const unGroupedDataWithId = [];

  summarizedData.map((item) => {
    item.grievences.map((grievenceItem) => {
      unGroupedDataWithId.push({ date: item.date, ...grievenceItem });
    });

    item.normal.map((normalItem) => {
      unGroupedDataWithId.push({ date: item.date, ...normalItem });
    });
  });

  return unGroupedDataWithId;
};

const retrieveElectrician = (objectWithElectricianId, electricianWithIds) => {
  // console.log(objectWithElectricianId);
  const idToFind = objectWithElectricianId.workerId;

  const [electrician] = electricianWithIds.filter(
    (item) => item.id === idToFind
  );

  return electrician;
};

const retrieveSites = (objectWithSiteIds, siteListwithIds) => {
  const filteredSites = [];

  objectWithSiteIds.sites.forEach((item) => {
    siteListwithIds.map((siteItem) => {
      if (siteItem.id === item) filteredSites.push(siteItem);
    });
  });

  return filteredSites;
};

const putElectricinsinSites = (electrician, sites) => {
  const date = new Date();
  sites.map((item) => {
    item.AssignedElectritian.push(
      `${electrician.name} | ${
        electrician.phoneNumber
      } | ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    );
  });

  return sites;
};

const buildSolution = (solutions, electricianWithIds, ungroupedDataWithId) => {
  const solutionData = [];

  solutions.map((item) => {
    item.solution.map((solutionItem) => {
      const electricians = retrieveElectrician(
        solutionItem,
        electricianWithIds
      );

      if (solutionItem.sites) {
        const sites = retrieveSites(solutionItem, ungroupedDataWithId);

        const sitesWithElectricians = putElectricinsinSites(
          electricians,
          sites
        );

        solutionData.push(...sitesWithElectricians);
      }
    });
  });

  console.log(solutionData);
};

// #################
// # Main Function #
// #################

const balanceLoad = (summarizedData) => {
  const loadMap = generateLoadMap(summarizedData);

  const [electricianWithIds, grievenceElectricianIds, normalElectricianIds] =
    retrieveElectricianId(electricianData);

  const solutions = loadMap.map((item) =>
    calculateSolution(
      item.date,
      item.grievences,
      item.normal,
      grievenceElectricianIds,
      normalElectricianIds
    )
  );

  const unGroupedDataWithIds = ungroupData(summarizedData);

  buildSolution(solutions, electricianWithIds, unGroupedDataWithIds);
};

export default balanceLoad;
