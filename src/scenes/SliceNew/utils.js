/**
 * SliceNew Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

export const CreateAllPins = resources => {

  const markers = [];

  if (!resources) {
    return markers;
  }

  const compareComputes = () => {
    resources.computes.length > 0 &&
      resources.computes.forEach(compute => {
        const { latitude, longitude } = compute.location;

        const locationExistsOnMarkers = markers.find(
          marker =>
            marker.location.latitude === latitude &&
            marker.location.longitude === longitude
        );

        if (locationExistsOnMarkers) {
          locationExistsOnMarkers.location.isCompute = true;
          const { computeData } = compute;
          const cpuColor = singlePercentage(
            computeData.quota.cpus.provisioned,
            computeData.quota.cpus.total
          );
          const ramColor = singlePercentage(
            computeData.quota.ram.provisioned,
            computeData.quota.ram.total
          );
          const storageColor = singlePercentage(
            computeData.quota.storage.provisioned,
            computeData.quota.storage.total
          );
          const { percentage, color } = compareResources(
            cpuColor,
            ramColor,
            storageColor,
            locationExistsOnMarkers.location.percentage
          );
          locationExistsOnMarkers.location.color = color;
          locationExistsOnMarkers.location.percentage = percentage;
          locationExistsOnMarkers.location.resources.computes.push({
            id: compute.id,
            name: compute.name,
            ischecked: false,
            computeData: {
              cpus: {
                ...computeData.quota.cpus,
                ...cpuColor
              },
              ram: {
                ...computeData.quota.ram,
                ...ramColor
              },
              storage: {
                ...computeData.quota.storage,
                ...storageColor
              }
            },
            status: computeData.status
          });
        } else {
          const { computeData } = compute;
          const cpuColor = singlePercentage(
            computeData.quota.cpus.provisioned,
            computeData.quota.cpus.total
          );
          const ramColor = singlePercentage(
            computeData.quota.ram.provisioned,
            computeData.quota.ram.total
          );
          const storageColor = singlePercentage(
            computeData.quota.storage.provisioned,
            computeData.quota.storage.total
          );
          const bigResource = percentage(computeData.quota)
          markers.push({
            location: {
              latitude: compute.location.latitude,
              longitude: compute.location.longitude,
              ...bigResource,
              resources: {
                computes: [
                  {
                    id: compute.id,
                    name: compute.name,
                    computeData: {
                      cpus: {
                        ...computeData.quota.cpus,
                        ...cpuColor
                      },
                      ram: {
                        ...computeData.quota.ram,
                        ...ramColor
                      },
                      storage: {
                        ...computeData.quota.storage,
                        ...storageColor
                      }
                    },
                    status: computeData.status,
                    availabilityZone: compute.computeData.availabilityZone,
                    availablePhyNet: compute.availablePhyNet,
                    ischecked: false
                  }
                ]
              },
              isCompute: true
            }
          });
        }
      });
  };

  const compareRadiosPhys = () => {
    resources.radioPhys.length > 0 &&
      resources.radioPhys.forEach(phy => {
        const phyType = phy.type === "SUB6_ACCESS" ? "wifi" : "LTE";
        const { latitude, longitude } = phy.location;
        if (ValidCoord(latitude, longitude)) {
          const locationExistsOnMarkers = markers.find(
            marker =>
              marker.location.latitude === latitude &&
              marker.location.longitude === longitude
          );

          if (locationExistsOnMarkers) {
            if (locationExistsOnMarkers.location.resources[phyType]) {
              locationExistsOnMarkers.location.resources[phyType].push({
                id: phy.id,
                name: phy.name,
                info: phy.location.info,
                config: phy.config,
                ranId: phy.ranId,
                ischecked: false
              });
            } else {
              locationExistsOnMarkers.location.resources[phyType] = [
                {
                  id: phy.id,
                  name: phy.name,
                  info: phy.location.info,
                  config: phy.config,
                  ranId: phy.ranId,
                  ischecked: false
                }
              ];
            }
          } else {
            markers.push({
              location: {
                latitude: latitude,
                longitude: longitude,
                resources: {
                  [phyType]: [
                    {
                      id: phy.id,
                      name: phy.name,
                      info: phy.location.info,
                      config: phy.config,
                      ranId: phy.ranId,
                      ischecked: false
                    }
                  ]
                }
              }
            });
          }
        }
      });
  };
  try {
  compareComputes();
  compareRadiosPhys();
} catch (error) {
}
  return markers;
};

export const GetSelectComputes = locations => {
  const arrayOfComputes = [];
  locations.forEach(item => {
    item.location.resources.computes &&
      item.location.resources.computes.forEach(compute => {
        if (compute.ischecked) {
          arrayOfComputes.push({
            ...compute,
            location: {
              latitude: item.location.latitude,
              longitude: item.location.longitude
            }
          });
        }
      });
  });
  if (arrayOfComputes.length > 0) {
    return arrayOfComputes;
  } else {
    return null;
  }
};


export const GetSelectRadioPhys = locations => {
  const arrayOfRadioPhys = { wifi: [], lte: [] };
  locations.forEach(item => {
    item.location.resources.wifi &&
      item.location.resources.wifi.forEach(wifi => {
        if (wifi.ischecked) {
          arrayOfRadioPhys.wifi.push({
            ...wifi,
            location: {
              latitude: item.location.latitude,
              longitude: item.location.longitude
            },
            type: "SUB6_ACCESS"
          });
        }
      });
    item.location.resources.LTE &&
      item.location.resources.LTE.forEach(lte => {
        if (lte.ischecked) {
          arrayOfRadioPhys.lte.push({
            ...lte,
            location: {
              latitude: item.location.latitude,
              longitude: item.location.longitude
            },
            type: "LTE_PRIMARY_PLMN"
          });
        }
      });
  });
  return arrayOfRadioPhys;
};

const ValidCoord = (latitude, longitude) => {
  if (
    latitude >= -90 &&
    latitude <= 90 &&
    (longitude >= -180 && longitude <= 180)
  ) {
    return true;
  } else {
    return false;
  }
};

export const UNITS = [
  {
    id: 1,
    value: "MB",
    name: "MB"
  },
  {
    id: 2,
    value: "GB",
    name: "GB"
  }
];

export const UNITS_SECONDS = [
  {
    id: 1,
    value: "MB/s",
    name: "MB/s"
  },
  {
    id: 2,
    value: "GB/s",
    name: "GB/s"
  }
];

export const FindLocationCompute = (computeId, data) => {
  data.forEach(location => {
    let findLocation =
      location.resources.computes &&
      location.resources.computes.find(compute => compute.id === computeId);
    if (findLocation) {
      return findLocation;
    }
  });
};

export const GETAllChunkIds = resources => {
  const array = [];
  resources.forEach(resource => {
        array.push(resource.idChunk);
  });
  return array;
};

export const VerifyNetwork = (resources, networks) => {
  let result = false;
  networks &&
    networks.forEach(network => {
      const getLocation = resources.find(
        resource =>
          resource.location.latitude === network.location.latitude &&
          resource.location.longitude === network.location.longitude
      );
      if (getLocation) {
        getLocation.location.resources.computes &&
          getLocation.location.resources.computes.forEach(compute => {
            if (compute.ischecked) result = true;
          });
      } else {
        result = false;
      }
    });
  return result;
};

const pickHex = percent => {
  var a = percent / 100,
    b = (0 - 100) * a,
    c = b + 100;

  // Return a CSS HSL string
  return `hsl(${Math.trunc(c)}, 48%, 53%)`;
};

const percentage = quota => {
  let value = 0;
  for (const key in quota) {
    if (quota.hasOwnProperty(key)) {
      const returnPercentage =
        (quota[key].provisioned / quota[key].total) * 100;
      if (value < returnPercentage) value = returnPercentage;
    }
  }
  return { percentage: value, color: pickHex(value) };
};

const singlePercentage = (provisioned, total) => {
  let value = 0;
  const returnPercentage = (provisioned / total) * 100;
  value = returnPercentage;
  return { percentage: value, color: pickHex(value) };
};

const compareResources = (cpus, ram, storage, compute) => {
  let value = compute;
  if (value < cpus.percentage) {
    value = cpus.percentage;
  }
  if (value < ram.percentage) {
    value = ram.percentage;
  }
  if (value < storage.percentage) {
    value = storage.percentage;
  }

  return { percentage: value, color: pickHex(value) };
};


export const GetNetwork = network  => {
  const object = {
    name: null,
    id: null,
    bandwidth: null,
    bandwidthUnits: 'MB/s',
    units: null,
    bandwidthTotal: null,
    bandwidthProvisioned: null,
    ischecked: false,
    nameNetwork: null
  }
  object.name = network.name
  object.id = network.id
  object.bandwidth = network.bandwidth
  object.bandwidthTotal = network.physicalNetworkData.quota.bandwidth.total
  object.bandwidthProvisioned = network.physicalNetworkData.quota.bandwidth.provisioned
  object.units = network.physicalNetworkData.quota.bandwidth.units

  return object
}
