/**
 * InfoManagementView Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

export const CreateAllPins = resources => {
  const markers = [];

  if (!resources) {
    return markers;
  }

  const compareComputesNetworks = () => {
    resources.computes.length > 0 &&
      resources.computes.forEach(compute => {
        const { latitude, longitude } = compute.location;

        const locationExistsOnMarkers = markers.find(
          marker =>
            marker.location.latitude === latitude &&
            marker.location.longitude === longitude
        );
        const findNetwork = resources.networks.find(
          network => network.id === compute.availablePhyNet
        )
        if (locationExistsOnMarkers && !findNetwork) {
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
            type: compute.computeType,
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
        } else if (locationExistsOnMarkers && findNetwork) {
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
            type: compute.computeType,
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
        } else if (findNetwork && !locationExistsOnMarkers) {
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
          const bigResource = percentage(computeData.quota);
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
                    type: compute.computeType,
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
                  }
                ],
                network: {
                  id: findNetwork.id,
                  name: findNetwork.name,
                  networkData: { ...findNetwork.physicalNetworkData }
                }
              },
              isNetwork: true,
              isCompute: true
            }
          });
        } else if (!findNetwork && !locationExistsOnMarkers) {
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
          const bigResource = percentage(computeData.quota);
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
                    type: compute.computeType,
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
                  }
                ]
              },
              isCompute: true
            }
          });
        }
      });
  };

  const compareRAN = () => {
    resources.rans.length > 0 &&
      resources.rans.forEach(ran => {
        const { latitude, longitude } = ran.location;

        const locationExistsOnMarkers = markers.find(
          marker =>
            marker.location.latitude === latitude &&
            marker.location.longitude === longitude
        )
        if (locationExistsOnMarkers) {
          locationExistsOnMarkers.location.isRAN = true;
          if (locationExistsOnMarkers.location.resources.rans) {
            locationExistsOnMarkers.location.resources.rans.push({
              id: ran.id,
              name: ran.name,
              controller_url: ran.ranInfrastructureData.controllerUrl,
              username: ran.ranInfrastructureData.username,
              password: ran.ranInfrastructureData.password
            })
          } else {
            locationExistsOnMarkers.location.resources.rans = [
              {
                id: ran.id,
                name: ran.name,
                controller_url: ran.ranInfrastructureData.controllerUrl,
                username: ran.ranInfrastructureData.username,
                password: ran.ranInfrastructureData.password
              }
            ];
          }
        } else {
          markers.push({
            location: {
              latitude: ran.location.latitude,
              longitude: ran.location.longitude,
              resources: {
                rans: [
                  {
                    id: ran.id,
                    name: ran.name,
                    controller_url: ran.ranInfrastructureData.controllerUrl,
                    username: ran.ranInfrastructureData.username,
                    password: ran.ranInfrastructureData.password
                  }
                ]
              },
              isRAN: true
            }
          })
        }
      })
  }

  const compareChunketeTopology = () => {
    resources.rans.length > 0 &&
      resources.rans.forEach(ran => {
        ran.chunketeTopology &&
          ran.chunketeTopology.boxes.length > 0 &&
          ran.chunketeTopology.boxes.forEach(box => {
            const { latitude, longitude } = box.location;
            const typeBox = box.phys[0].type === "SUB6_ACCESS" ? "wifi" : "LTE";
            const locationExistsOnMarkers = markers.find(
              marker =>
                marker.location.latitude === latitude &&
                marker.location.longitude === longitude
            );

            if (locationExistsOnMarkers) {
              if (locationExistsOnMarkers.location.resources[typeBox]) {
                locationExistsOnMarkers.location.resources[typeBox].push({
                  id: box.id,
                  name: box.name,
                  physical: [...box.phys],
                  info: box.location.info,
                  ranId: ran.id,
                  ranName: ran.name
                });
              } else {
                locationExistsOnMarkers.location.resources[typeBox] = {
                  id: box.id,
                  name: box.name,
                  physical: [...box.phys],
                  info: box.location.info,
                  ranId: ran.id,
                  ranName: ran.name
                };
              }
            } else {
              markers.push({
                location: {
                  latitude: box.location.latitude,
                  longitude: box.location.longitude,
                  resources: {
                    [typeBox]: [
                      {
                        id: box.id,
                        name: box.name,
                        physical: [...box.phys],
                        info: box.location.info,
                        ranId: ran.id,
                        ranName: ran.name
                      }
                    ]
                  },
                  isWifi: box.phys[0].type === "SUB6_ACCESS" ? true : false,
                  isLTE: box.phys[0].type === "LTE_PRIMARY_PLMN" ? true : false
                }
              });
            }
          });
      });
  };

  compareComputesNetworks();
  compareRAN();
  compareChunketeTopology();
  return markers;
};

export const CreateAllLinks = rans => {
  const links = [];

  if (!rans) {
    return links;
  }

  rans.length > 0 &&
    rans.forEach(ran => {
      const { latitude, longitude } = ran.location;
      ran.chunketeTopology &&
        ran.chunketeTopology.boxes.forEach(chunkete => {
          links.push({
            id: ran.id,
            coordinates: {
              source: [chunkete.location.longitude, chunkete.location.latitude],
              target: [longitude, latitude]
            }
          });
        });
    });
  return links;
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
