// $grid-breakpoints: (
//   xs: 0,
//   sm: 576px,
//   md: 768px,
//   lg: 992px,
//   xl: 1200px,
//   xxl: 1400px
// );

//   @media (max-width: GetMedia.small) {
//   }
export enum GetMediaSizes {
  mobile_576 = 'calc(576px - 1px)',
  tablet_vertical_768 = 'calc(768px - 1px)',
  tablet_horizontal_992 = 'calc(992px - 1px)',
  personal_computer_1200 = 'calc(1200px - 1px)',
  personal_computer_1400 = 'calc(1400px - 1px)',
}
// @media (max-width: ${GetMediaSizes.mobile}) {
// }
