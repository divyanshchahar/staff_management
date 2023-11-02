import electricianData from "../files/electricianData.json";

const generateLoadMap = (requests) => {
  const loadMap = requests.map((item) => {
    return {
      date: item.date,
      grievences: item.grievences.map((grievenceItem) => grievenceItem.id),
      normal: item.normal.map((normalItem) => normalItem.id),
    };
  });
  return loadMap;
};

const retrieveElectricianId = (arrayData) => {
  // adding ids
  const idArray = arrayData.map((item, id) => {
    return { id, ...item };
  });

  //filtering grivence electrician
  const grievencElectrician = idArray.filter(
    (electrician) => electrician.grievanceElectrician
  );

  const grievenceElectricianId = grievencElectrician.map((item) => item.id);

  // filtering normal electricians
  const normalElectrician = idArray.filter(
    (electrician) => !electrician.grievanceElectrician
  );

  const normalElectricianId = normalElectrician.map((item) => item.id);

  return [grievenceElectricianId, normalElectricianId];
};

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

const swipeElemets = (smallLoad, largeLoad, excessLoad) => {
  const balancedLoad1 = [
    ...smallLoad,
    ...largeLoad.slice(largeLoad.length - excessLoad, largeLoad.length),
  ];

  const balancedLoad2 = largeLoad.slice(0, largeLoad.length - excessLoad);

  return [balancedLoad1, balancedLoad2];
};

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

const balanceLoad = (summarizedData) => {
  const loadMap = generateLoadMap(summarizedData);

  const [grievenceElectricianId, normalElectricianId] =
    retrieveElectricianId(electricianData);

  const solution = loadMap.map((item) =>
    calculateSolution(
      item.date,
      item.grievences,
      item.normal,
      grievenceElectricianId,
      normalElectricianId
    )
  );

  console.log(solution);
};

export default balanceLoad;
