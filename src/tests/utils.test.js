import { normalizeTeslaModelData } from "../js/utils";

describe("normalizeTeslaModelData", () => {
  it("should map data as obj normalized", () => {
    const rawData = [
      {
        temp: -10,
        wheelsize: 19,
        ac: "off",
        hwy: [
          { kmh: 70, kilometers: 798 },
          { kmh: 80, kilometers: 710 },
          { kmh: 90, kilometers: 627 },
          { kmh: 100, kilometers: 555 },
          { kmh: 110, kilometers: 491 },
          { kmh: 120, kilometers: 435 },
          { kmh: 130, kilometers: 386 },
          { kmh: 140, kilometers: 338 },
        ],
      },
      {
        temp: -10,
        wheelsize: 19,
        ac: "on",
        hwy: [
          { kmh: 70, kilometers: 618 },
          { kmh: 80, kilometers: 575 },
          { kmh: 90, kilometers: 526 },
          { kmh: 100, kilometers: 478 },
          { kmh: 110, kilometers: 433 },
          { kmh: 120, kilometers: 390 },
          { kmh: 130, kilometers: 351 },
          { kmh: 140, kilometers: 311 },
        ],
      },
      {
        temp: -10,
        wheelsize: 21,
        ac: "off",
        hwy: [
          { kmh: 70, kilometers: 788 },
          { kmh: 80, kilometers: 698 },
          { kmh: 90, kilometers: 616 },
          { kmh: 100, kilometers: 543 },
          { kmh: 110, kilometers: 480 },
          { kmh: 120, kilometers: 424 },
          { kmh: 130, kilometers: 376 },
          { kmh: 140, kilometers: 329 },
        ],
      },
      {
        temp: -10,
        wheelsize: 21,
        ac: "on",
        hwy: [
          { kmh: 70, kilometers: 611 },
          { kmh: 80, kilometers: 566 },
          { kmh: 90, kilometers: 517 },
          { kmh: 100, kilometers: 468 },
          { kmh: 110, kilometers: 423 },
          { kmh: 120, kilometers: 380 },
          { kmh: 130, kilometers: 342 },
          { kmh: 140, kilometers: 302 },
        ],
      },
    ];
    expect(normalizeTeslaModelData(rawData)).toStrictEqual({
      byWheelsize: {
        19: {
          byAc: {
            off: {
              byTemp: {
                "-10": [
                  { kmh: 70, kilometers: 798 },
                  { kmh: 80, kilometers: 710 },
                  { kmh: 90, kilometers: 627 },
                  { kmh: 100, kilometers: 555 },
                  { kmh: 110, kilometers: 491 },
                  { kmh: 120, kilometers: 435 },
                  { kmh: 130, kilometers: 386 },
                  { kmh: 140, kilometers: 338 },
                ],
              },
            },
            on: {
              byTemp: {
                "-10": [
                  { kmh: 70, kilometers: 618 },
                  { kmh: 80, kilometers: 575 },
                  { kmh: 90, kilometers: 526 },
                  { kmh: 100, kilometers: 478 },
                  { kmh: 110, kilometers: 433 },
                  { kmh: 120, kilometers: 390 },
                  { kmh: 130, kilometers: 351 },
                  { kmh: 140, kilometers: 311 },
                ],
              },
            },
          },
        },
        21: {
          byAc: {
            off: {
              byTemp: {
                "-10": [
                  { kmh: 70, kilometers: 788 },
                  { kmh: 80, kilometers: 698 },
                  { kmh: 90, kilometers: 616 },
                  { kmh: 100, kilometers: 543 },
                  { kmh: 110, kilometers: 480 },
                  { kmh: 120, kilometers: 424 },
                  { kmh: 130, kilometers: 376 },
                  { kmh: 140, kilometers: 329 },
                ],
              },
            },
            on: {
              byTemp: {
                "-10": [
                  { kmh: 70, kilometers: 611 },
                  { kmh: 80, kilometers: 566 },
                  { kmh: 90, kilometers: 517 },
                  { kmh: 100, kilometers: 468 },
                  { kmh: 110, kilometers: 423 },
                  { kmh: 120, kilometers: 380 },
                  { kmh: 130, kilometers: 342 },
                  { kmh: 140, kilometers: 302 },
                ],
              },
            },
          },
        },
      },
    });
  });
});
