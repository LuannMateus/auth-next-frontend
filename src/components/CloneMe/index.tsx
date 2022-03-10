import * as Styled from './styles';

export type CloneMeProps = {
  propExample?: 'Component Example';
};

export const CloneMe = ({ propExample }: CloneMeProps) => {
  return (
    <Styled.Container>
      <h1>{propExample}</h1>
    </Styled.Container>
  );
};
