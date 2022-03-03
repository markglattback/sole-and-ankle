import { max } from 'date-fns';
import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{ '--color': variant === 'on-sale' ? COLORS.gray[700] : undefined, '--textDecoration': variant === 'on-sale' ? 'line-through' : undefined }}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
		  {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
		{variant !== 'default' && <Flag variant={variant}>{ variant === 'on-sale' ? 'Sale' : 'Just released!' }</Flag>}
      </Wrapper>
	
    </Link>
  );
};

const Link = styled.a`
	text-decoration: none;
	color: inherit;
	min-width: 320px;
	flex: 1;


	/* width: 25%;

	@media screen and (max-width: 1440px) {
		width: calc(100% / 3);
	}

	@media screen and (max-width: 1024px) {
		width: 50%;
	} */
`;

const Wrapper = styled.article`
	position: relative;
	margin: 0 16px 64px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
`;

const Image = styled.img`
	width: 100%;
	height: auto;
`;

const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
  	font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  margin-right: 24px;
`;

const Price = styled.span`
	align-self: flex-start;
	color: var(--color);
	text-decoration: var(--textDecoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.span`
	position: absolute;
	top: 12px;
	right: -4px;
	display: flex;
	align-items: center;
	height: 32px;
	padding: 0 10px;
	background: ${p => p.variant === 'on-sale' ? COLORS.primary : COLORS.secondary};
	font-weight: ${WEIGHTS.medium};
	color: white;
	border-radius: 2px;
`;

export default ShoeCard;
