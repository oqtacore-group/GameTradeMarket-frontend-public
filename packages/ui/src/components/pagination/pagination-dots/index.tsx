import { WrapperPaginationDots, Dot } from './style';

interface IDot {
  position?: string;
  id: number;
  last: boolean;
  preLast: boolean;
  onChange: (index: number) => void;
}

export const PaginationDots = ({
  dots,
  activeSlide,
  setSlideCurrent,
  slideRight,
  slideLeft,
}: {
  dots: number;
  activeSlide: number;
  setSlideCurrent: (index: number) => void;
  slideLeft: (index: number) => void;
  slideRight: (index: number) => void;
}) => {
  const middleDot = dots / 2;
  const prepareDots: IDot[] = [...Array(dots).keys()].map((i) => {
    return {
      position: undefined,
      id: i,
      onChange: slideLeft,
      last: false,
      preLast: false,
    };
  });

  const leftSide = prepareDots.slice(middleDot, prepareDots.length).map((dot, i) => {
    const index = i + middleDot;
    const firstIndex = middleDot;
    const secondIndex = 1 + middleDot;

    const firstDot = firstIndex === index && activeSlide !== index;
    const secondDot =
      (secondIndex === index && activeSlide !== index && activeSlide !== firstIndex) ||
      (activeSlide - 1 === index && activeSlide === secondIndex);

    return {
      position: 'left',
      id: dot.id,
      onChange: slideLeft,
      last: firstDot,
      preLast: secondDot,
    };
  });

  const rightSide = prepareDots.slice(0, middleDot).map((dot, i) => {
    const index = i;
    const lastIndex = prepareDots.length - 1 - middleDot;
    const preLastIndex = prepareDots.length - 2 - middleDot;

    const lastDot = lastIndex === index && activeSlide !== index;
    const preLastDot =
      (preLastIndex === index && activeSlide !== index && activeSlide !== lastIndex) ||
      (activeSlide + 1 === index && activeSlide === preLastIndex);

    return {
      position: 'right',
      id: dot.id,
      onChange: slideRight,
      last: lastDot,
      preLast: preLastDot,
    };
  });

  const result = [...leftSide, ...rightSide];

  return (
    <WrapperPaginationDots>
      {result.length &&
        result?.map((dot) => {
          return (
            <Dot
              onClick={() => {
                setSlideCurrent(dot.id);
                if (dot.position === 'left') {
                  dot?.onChange(dot.id + 1);
                } else if (dot.position === 'right') {
                  dot?.onChange(dot.id - 1);
                }
              }}
              last={dot.last}
              preLast={dot.preLast}
              active={activeSlide === dot.id}
              key={'dot' + dot.id}
            />
          );
        })}
    </WrapperPaginationDots>
  );
};
