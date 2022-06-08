import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import NFTContainer from "../../components/NFTContainer";
import NFTIntroduction from "../../components/NFTIntroduction";
import { NFTItemStatus } from "../../components/NFTItem";
import { Title } from "../../components/PageTitle";
import useFetch from "../../hook/useFetch";
import {
  Wrapper,
  HorizontalDivider,
  StyledButton,
  SortButtonContainer,
} from "./styled";

const HopeMarketplace: React.FC = () => {
  const { fetchListedNFTs } = useFetch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const [isAscending, setIsAscending] = React.useState(true);
  const marketplaceNFTs = useAppSelector((state) => state.nfts.marketplaceNFTs);
  const revealMarketplaceNFTs: any = [];
  marketplaceNFTs.forEach((item: any) => {
    if (item.token_id.includes("Reveal")) revealMarketplaceNFTs.push(item);
  });
  const handleSort = () => {
    setIsAscending(!isAscending);
  };
  useEffect(() => {
    if (account && account.address) {
      fetchListedNFTs();
    }
  }, [account, fetchListedNFTs]);
  return (
    <Wrapper>
      <NFTIntroduction backgroundImage="/others/hopeBackground.png" />
      <Title title="Hope Galaxy NFT - Collection 1" />
      <HorizontalDivider />
      <SortButtonContainer>
        <StyledButton onClick={handleSort}>
          Sort By Price {!isAscending ? "Ascending" : "Descending"}
        </StyledButton>
      </SortButtonContainer>
      <NFTContainer
        nfts={revealMarketplaceNFTs}
        status={NFTItemStatus.BUY}
        sort={isAscending ? "as" : "des"}
      />
    </Wrapper>
  );
};

export default HopeMarketplace;
