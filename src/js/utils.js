export const normalizeTeslaModelData = (data) => {
  return data.reduce((normalizedData, curr) => {
    const { wheelsize, temp, ac, hwy } = curr;
    normalizedData.byWheelsize = {
      ...normalizedData.byWheelsize,
      [wheelsize]: {
        ["byAc"]: {
          ...(normalizedData.byWheelsize?.[wheelsize]?.byAc ?? {}),
          [ac]: {
            ["byTemp"]: {
              ...(normalizedData.byWheelsize?.[wheelsize]?.byAc[ac]?.byTemp ??
                {}),
              [temp]: hwy,
            },
          },
        },
      },
    };
    return normalizedData;
  }, {});
};

export const calculateKm = (teslaModel, data) => 
  teslaModel.byWheelsize?.[data.wheelsize]?.byAc[data.ac]?.byTemp[
    data.temp
  ]?.find(({ kmh }) => data.kmh == kmh)?.kilometers ?? 0;