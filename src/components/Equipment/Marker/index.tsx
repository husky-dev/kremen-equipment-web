/* eslint-disable max-len */
import { colorSetFromColor } from 'core';
import { EquipmentMachine, EquipmentMachineType } from 'core/api';
import React, { FC, useMemo } from 'react';
import { Marker } from 'react-google-maps';

import EquipmentPopup from './components/Popup';

interface Props {
  item: EquipmentMachine;
  opacity?: number;
  zIndex?: number;
  size?: number;
  popupOpen?: boolean;
  onClick?: (item: EquipmentMachine) => void;
  onPopupClose: (item: EquipmentMachine) => void;
}

const getMarkerCode = (item: EquipmentMachine, size: number) => {
  const { color } = item;
  const colors = colorSetFromColor(color);
  const iconCode = btoa(`<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${size}px" height="${size}px" viewBox="0 0 38 38" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g stroke="none" stroke-width="1.3" fill="none" fill-rule="evenodd">
      <path d="M19,37.179939 L24.2581419,30.3443545 L24.3664119,30.2928085 C28.6881118,28.235298 31.5,23.8715911 31.5,19 C31.5,12.0964406 25.9035594,6.5 19,6.5 C12.0964406,6.5 6.5,12.0964406 6.5,19 C6.5,23.8715911 9.31188822,28.235298 13.6335881,30.2928085 L13.7418581,30.3443545 L19,37.179939 Z" stroke="${
        colors.dark
      }" fill="${colors.light}"></path>
      ${itemTypeToIcon(item.type)}
      </g>
  </svg>
  `);
  return `data:image/svg+xml;base64,${iconCode}`;
};

const itemTypeToIcon = (type?: EquipmentMachineType): string => {
  const tractor = `<path d="M15.3194456,19.674675 C13.6545296,19.674675 12.3,21.0292938 12.3,22.6942098 C12.3,24.3591258 13.6545296,25.7137148 15.3194456,25.7137148 C16.9845102,25.7137148 18.3389506,24.3591258 18.3389506,22.6942098 C18.3389506,21.0292938 16.9845102,19.674675 15.3194456,19.674675 Z M15.3194456,24.6723955 C14.2286345,24.6723955 13.3412896,23.7849614 13.3412896,22.6942098 C13.3412896,21.6034581 14.2286345,20.7162024 15.3194456,20.7162024 C16.410435,20.7162024 17.2977799,21.6034878 17.2977799,22.6942098 C17.2977799,23.7849318 16.4106134,24.6723955 15.3194456,24.6723955 Z M24.0706062,21.0468909 C22.7999601,21.0468909 21.7661908,22.0806601 21.7661908,23.3511577 C21.7661908,24.6219525 22.7999601,25.6555731 24.0706062,25.6555731 C25.3412525,25.6555731 26.3750217,24.6222795 26.3750217,23.3511577 C26.3750217,22.0806898 25.3416091,21.0468909 24.0706062,21.0468909 Z M24.0706062,24.7428136 C23.3031713,24.7428136 22.679099,24.118236 22.679099,23.3511577 C22.679099,22.583901 23.303528,21.959799 24.0706062,21.959799 C24.8380413,21.959799 25.4624702,22.5838714 25.4624702,23.3511577 C25.4624702,24.118236 24.8380413,24.7428136 24.0706062,24.7428136 Z M18.672671,22.4580759 L21.548308,22.4580759 C21.4166866,22.7753882 21.343088,23.1225442 21.3427313,23.487119 L18.600737,23.4889024 C18.6553712,23.2501528 18.6869092,23.0027533 18.6869092,22.7471199 C18.6870875,22.6495929 18.6809345,22.5539979 18.672671,22.4580759 Z M28.1943581,19.9925521 C28.1943581,19.758707 28.0040896,19.5687655 27.7703932,19.5687655 L22.4371391,18.4033749 L20.6922931,13.3189769 C20.644347,13.1315025 20.4751237,13 20.2816152,13 L14.6197237,13 C14.385522,13 14.1960264,13.1900009 14.1960264,13.4236676 C14.1960264,13.6579585 14.3856706,13.847365 14.6197237,13.847365 L15.3374588,13.847365 L15.3374588,17.7041583 C15.1940961,17.6773466 15.0468394,17.661741 14.8957482,17.661741 C13.5793556,17.661741 12.5119081,18.7290695 12.5119081,20.0455811 L12.5119081,20.8666099 C13.0866967,19.8830459 14.1513202,19.2206584 15.3725044,19.2206584 C17.0325752,19.2206584 18.4033346,20.4422586 18.6451162,22.0344381 L21.6490157,22.0344381 C22.0972062,21.1777692 22.9929038,20.5926958 24.026881,20.5926958 C25.5078302,20.5926958 26.7083557,21.7920026 26.7106445,23.2725653 L27.5114604,23.2718816 C27.5270659,23.2736354 27.0128268,23.2769943 27.0286404,23.2769943 L27.8762134,23.2769943 C28.1100585,23.2769943 28.3,23.0866961 28.3,22.8533861 L28.1943581,19.9925521 Z M19.2690992,18.2622712 C18.7674931,16.7537374 16.6141689,16.6047567 16.4077896,16.6047567 L16.1851805,16.6047567 L16.1851805,13.8475433 L19.9523535,13.8475433 L21.537399,18.2622712 L19.2690992,18.2622712 Z" id="icon-tractor-active" fill="#FFFFFF" fill-rule="nonzero"></path>`;
  const snowPlow = `<path d="M26.5139225,25.5012506 C26.5638613,25.9758449 26.7137363,26.3755016 26.9135793,26.5753446 C26.9885168,26.6502821 27.0135154,26.7501889 26.9635474,26.8501251 C26.938578,26.9500319 26.8386418,27 26.7387349,27 L26.7387349,27 L12.2508052,27 C12.1508983,27 12.0509622,26.9500319 12.0259928,26.8501251 C11.976054,26.7501889 12.0010234,26.6502821 12.0759609,26.5753446 C12.2758039,26.3755016 12.4256788,25.9758449 12.4756469,25.5012506 L12.4756469,25.5012506 Z M24.9652051,20.255628 C25.5647048,20.6053167 25.9893603,21.2547845 25.9893603,22.0041591 L25.9893603,23.2531266 L26.7387349,23.2531266 C26.8386418,23.2531266 26.938578,23.3030947 26.9635474,23.4030016 C27.0135154,23.5029085 26.9885168,23.6028153 26.9136086,23.6777821 C26.6637975,23.9275931 26.5139225,24.4271567 26.4889531,25.0016871 L12.5006163,25.0016871 C12.4756176,24.4271567 12.3257427,23.9275638 12.0759609,23.6777821 C12.0010234,23.6028446 11.9760247,23.5029085 12.0259928,23.4030016 C12.0509622,23.3030947 12.1508983,23.2531266 12.2508052,23.2531266 L13.0001799,23.2531266 L13.0001799,22.0041591 C13.0001799,21.2547845 13.4248353,20.6053459 14.024335,20.255628 L24.9652051,20.255628 Z M16.4973007,21.0050026 L14.4989585,21.0050026 C14.3490835,21.0050026 14.2491767,21.1049095 14.2491767,21.2547845 L14.2491767,22.503752 C14.2491767,22.6536269 14.3490835,22.7535338 14.4989585,22.7535338 L16.4973007,22.7535338 C16.6471756,22.7535338 16.7470825,22.6536269 16.7470825,22.503752 L16.7470825,21.2547845 C16.7470825,21.1049095 16.6471756,21.0050026 16.4973007,21.0050026 Z M24.4906109,21.0050026 L22.4922688,21.0050026 C22.3423938,21.0050026 22.2424869,21.1049095 22.2424869,21.2547845 L22.2424869,22.503752 C22.2424869,22.6536269 22.3423938,22.7535338 22.4922688,22.7535338 L24.4906109,22.7535338 C24.6404858,22.7535338 24.7403928,22.6536269 24.7403928,22.503752 L24.7403928,21.2547845 C24.7403928,21.1049095 24.6404858,21.0050026 24.4906109,21.0050026 Z M21.2433305,22.0041884 L17.7462389,22.0041884 C17.596364,22.0041884 17.4964571,22.1040953 17.4964571,22.2539702 C17.4964571,22.4038452 17.596364,22.503752 17.7462389,22.503752 L21.2433305,22.503752 C21.3932054,22.503752 21.4931123,22.4038452 21.4931123,22.2539702 C21.4931123,22.1040953 21.3932054,22.0041884 21.2433305,22.0041884 Z M20.4939558,21.0050026 L18.4956136,21.0050026 C18.3457387,21.0050026 18.2458318,21.1049095 18.2458318,21.2547845 C18.2458318,21.4046594 18.3457387,21.5045663 18.4956136,21.5045663 L20.4939558,21.5045663 C20.6438307,21.5045663 20.7437376,21.4046594 20.7437376,21.2547845 C20.7437376,21.1049095 20.6438307,21.0050026 20.4939558,21.0050026 Z M22.8919547,12.0374761 C22.9668922,11.987508 23.0667991,11.987508 23.1417366,12.0374761 C23.216674,12.0874441 23.2666421,12.187351 23.2666421,12.2622885 L23.2666421,12.2622885 L23.2666421,13.511256 C23.416517,13.511256 23.5164239,13.6111629 23.5164239,13.7610378 L23.5164239,13.7610378 L23.5164239,14.5104125 L24.0160167,14.5104125 C24.1658917,14.5104125 24.2657985,14.6103193 24.2657985,14.7601943 L24.2657985,14.7601943 L24.2657985,17.2581001 L24.7653622,17.2581001 L24.7653622,16.7085684 C24.7653622,16.4587866 24.9652051,16.2589436 25.2149869,16.2589436 L25.2149869,16.2589436 L25.7895173,16.2589436 C26.0393284,16.2589436 26.239142,16.4587866 26.1892325,16.7335378 L26.1892325,16.7335378 L26.1892325,18.3072246 C26.1892325,18.5570064 25.9893896,18.7568494 25.7396078,18.7568494 L25.7396078,18.7568494 L25.1650774,18.7568494 C24.9152956,18.7568494 24.7154526,18.5570064 24.7154526,18.3072246 L24.7154526,18.3072246 L24.7154526,17.7576929 L24.2158597,17.7576929 L24.2158597,19.7560351 L14.7237709,19.7560351 L14.7237709,17.7576929 L14.224178,17.7576929 L14.224178,18.2822552 C14.224178,18.532037 14.024335,18.73188 13.7745532,18.73188 L13.7745532,18.73188 L13.2000229,18.73188 C12.9502411,18.73188 12.7503981,18.532037 12.7503981,18.2822552 L12.7503981,18.2822552 L12.7503981,16.7085684 C12.7503981,16.4587866 12.9502411,16.2589436 13.2000229,16.2589436 L13.2000229,16.2589436 L13.7995226,16.2589436 C14.0493044,16.2589436 14.2491474,16.4587866 14.2491474,16.7085684 L14.2491474,16.7085684 L14.2491474,17.2581001 L14.7487695,17.2581001 L14.7487695,14.7601943 C14.7487695,14.6103193 14.8486764,14.5104125 14.9985513,14.5104125 L14.9985513,14.5104125 L15.4981442,14.5104125 L15.4981442,13.7610378 C15.4981442,13.6111629 15.5980511,13.511256 15.747926,13.511256 L15.747926,13.511256 L15.747926,12.2622885 C15.747926,12.187351 15.7978648,12.0874441 15.8478329,12.0374761 C15.9227703,12.0125067 16.0226772,11.987508 16.0976147,12.0374761 L16.0976147,12.0374761 L17.0968004,12.5370689 C17.1967073,12.587037 17.2466753,12.6619745 17.2466753,12.7618813 L17.2466753,12.7618813 L17.2466753,13.511256 C17.3965503,13.511256 17.4964571,13.6111629 17.4964571,13.7610378 L17.4964571,13.7610378 L17.4964571,14.5104125 L21.4931416,14.5104125 L21.4931416,13.7610378 C21.4931416,13.6111629 21.5930484,13.511256 21.7429233,13.511256 L21.7429233,13.511256 L21.7429233,12.7618813 C21.7429233,12.6619745 21.7928914,12.587037 21.8927983,12.5370689 L21.8927983,12.5370689 Z M22.9918616,15.75938 L15.9977078,15.75938 L15.9977078,19.2564423 L22.9918616,19.2564423 L22.9918616,15.75938 Z M16.9968643,14.0108196 L15.9977078,14.0108196 L15.9977078,14.5104125 L16.9968643,14.5104125 L16.9968643,14.0108196 Z M22.9918616,14.0108196 L21.9927051,14.0108196 L21.9927051,14.5104125 L22.9918616,14.5104125 L22.9918616,14.0108196 Z M22.7420798,12.6619745 L22.2424869,12.9117563 L22.2424869,13.511256 L22.7420798,13.511256 L22.7420798,12.6619745 Z M16.2474896,12.6619452 L16.2474896,13.5112267 L16.7470825,13.5112267 L16.7470825,12.911727 L16.2474896,12.6619452 Z" id="icon-snow-plow" fill="#FFFFFF" fill-rule="nonzero"></path>`;
  const dumpTruck = `<path d="M14.5164082,20.4457143 C15.6215339,20.4457143 16.5160817,21.3420408 16.5160817,22.4457143 C16.5160817,23.5510204 15.6215339,24.4457143 14.5164082,24.4457143 C13.4112825,24.4457143 12.5167347,23.5510204 12.5167347,22.4457143 C12.5167347,21.3404082 13.4112825,20.4457143 14.5164082,20.4457143 Z M21.9453061,20.4457143 C22.8448979,20.4457143 23.6040816,21.0383674 23.8571429,21.8530612 C23.9077551,22.0163265 23.9355102,22.1877551 23.9420408,22.3657143 C23.9420408,22.3918367 23.9453061,22.4179592 23.9453061,22.4457143 C23.9453061,23.5510204 23.0506122,24.4457143 21.9453061,24.4457143 C20.84,24.4457143 19.9453061,23.5510204 19.9453061,22.4457143 C19.9453061,21.3404082 20.84,20.4457143 21.9453061,20.4457143 Z M14.5164082,21.7861224 C14.152386,21.7861224 13.8569241,22.0816326 13.8569241,22.4457143 C13.8569241,22.8114286 14.152386,23.1069388 14.5164082,23.1069388 C14.8820628,23.1069388 15.1775248,22.8114286 15.1775248,22.4457143 C15.1775248,22.0816326 14.8820628,21.7861224 14.5164082,21.7861224 Z M21.9453061,21.7861224 C21.5812245,21.7861224 21.2857143,22.0816326 21.2857143,22.4457143 C21.2857143,22.8114286 21.5812245,23.1069388 21.9453061,23.1069388 C22.3110204,23.1069388 22.6065306,22.8114286 22.6065306,22.4457143 C22.6065306,22.0816326 22.3110204,21.7861224 21.9453061,21.7861224 Z M26.7142857,21.1428571 C26.8710204,21.1428571 27,21.2718367 27,21.4285714 L27,21.4285714 L27,22 C27,22.1583673 26.8710204,22.2857143 26.7142857,22.2857143 L26.7142857,22.2857143 L24.7142857,22.2857143 C24.5559184,22.2857143 24.4285714,22.1583673 24.4285714,22 L24.4285714,22 L24.4285714,21.4285714 C24.4285714,21.4040816 24.4367347,21.3828571 24.4432653,21.36 C24.4742857,21.2359184 24.5820408,21.1428571 24.7142857,21.1428571 L24.7142857,21.1428571 Z M26.5706122,14 L25.7395918,15.1428571 L20.7126531,15.1428571 L20.7126531,19.8938776 C19.6057143,20.2857143 19.3379592,21.7142857 19.3379592,21.7142857 L19.3379592,21.7142857 L17.1779592,21.7142857 C16.5542857,19.4465306 11.8391837,18.5714286 11.8391837,18.5714286 L11.8391837,18.5714286 L11.8571429,16.8571429 L11,16.8571429 L11,15.7142857 L19.357551,15.7142857 L20.1428571,14 L26.5706122,14 Z M25.4995919,15.7126531 L26.7142857,17.5706122 L26.7142857,20.5714286 L24.7142857,20.5714286 C24.4710204,20.5714286 24.2522449,20.6742857 24.0955102,20.837551 C23.7967347,20.3706122 23.1730612,19.7681633 21.9453061,19.7681633 C21.395102,19.7681633 21.2857143,19.7942857 21.2857143,19.7942857 L21.2857143,19.7942857 L21.2857143,15.7126531 L25.4995919,15.7126531 Z M25.2857143,16.5714286 L23.5714286,16.5714286 L23.5714286,18.8571429 L25.8571429,18.8571429 L25.8571429,17.482449 L25.2857143,16.5714286 Z" id="icon-dump-truck" fill="#FFFFFF" fill-rule="nonzero"></path>`;
  switch (type) {
    case 'sweeper':
      return snowPlow;
    case 'spreader':
      return snowPlow;
    case 'garbage':
      return dumpTruck;
    case 'tractor':
      return tractor;
    default:
      return tractor;
  }
};

export const EquipmentMarker: FC<Props> = ({
  onClick,
  item,
  popupOpen,
  opacity = 1.0,
  zIndex = 20,
  size = 38,
  onPopupClose,
}) => {
  const handlePopupClose = () => {
    onPopupClose(item);
  };

  const { lat, lng } = item;
  if (!lat || !lng) return null;

  return useMemo(
    () => (
      <Marker
        position={{ lat, lng }}
        title={item.name}
        icon={{
          url: getMarkerCode(item, size),
          anchor: new google.maps.Point(Math.round(size / 2), Math.round(size / 2)),
        }}
        zIndex={zIndex}
        opacity={opacity}
        onClick={() => onClick && onClick(item)}
      >
        {popupOpen && <EquipmentPopup item={item} onClose={handlePopupClose} />}
      </Marker>
    ),
    [lat, lng, opacity, zIndex, popupOpen, size],
  );
};

export default EquipmentMarker;
