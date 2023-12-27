import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { ArrowBack, ArrowForward, ContentCopy } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import getStakes from "../database/functions/get-stakes";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    padding: "6px",
  },
}));

const HistoryPage = () => {
  const matches = useMediaQuery("(max-width:950px)");

  const { stakeAddress } = useCardano();

  const [stakes, setStakes] = useState([]);
  const stakeDocs = useRef([]);

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    console.log(pageNumber);
    getStakes({
      walletId: stakeAddress,
      lastDocument: stakeDocs.current[stakes.length - 1],
    }).then((_stakeDocs) => {
      setStakes(_stakeDocs.map((stake) => ({ id: stake.id, ...stake.data() })));
      stakeDocs.current = _stakeDocs;
    });
  }, [pageNumber, stakeAddress]);

  return (
    <Box py={5}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            sx={{
              color: "#fff",
              fontSize: matches ? "20px" : "28px",
              fontWeight: "700",
            }}
          >
            Staking Pools
          </Box>
        </Box>
        <Box pt={2}>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              borderRadius: "12px",
              background: "#10092A",
            }}
          >
            <Table sx={{ minWidth: 1100 }}>
              <TableHead>
                <TableRow
                  sx={{
                    borderBottom: "2px solid #10092A",
                  }}
                >
                  {/* <TableCell>
                    <Typography
                      fontSize="20px"
                      fontWeight="400"
                      color="#fff"
                      ml={6}
                    >
                      Wallet ID
                    </Typography>
                  </TableCell> */}
                  <TableCell>
                    <Typography
                      textAlign="center"
                      fontSize="18px"
                      fontWeight="400"
                      color="#fff"
                    >
                      Transaction Hash
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      textAlign="center"
                      fontSize="18px"
                      fontWeight="400"
                      color="#fff"
                    >
                      Currency Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      textAlign="center"
                      fontSize="18px"
                      fontWeight="400"
                      color="#fff"
                    >
                      Staked Amount
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontSize="18px" fontWeight="400" color="#fff">
                      APY
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontSize="18px" fontWeight="400" color="#fff">
                      Duration
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      textAlign="center"
                      fontSize="18px"
                      fontWeight="400"
                      color="#fff"
                    >
                      Staked On
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stakes.map(
                  (
                    {
                      txReference,
                      currencyType,
                      stakedAmount,
                      apy,
                      durationInMonths,
                      stakedOn,
                    },
                    index
                  ) => (
                    <TableRow
                      key={index}
                      sx={{
                        borderBottom: "0px solid #79709A",
                        background: "#170D3F",
                        "&:last-child td": {
                          borderBottom: 0,
                        },
                        "&:hover": {
                          background: "#170D3Fa1",
                        },
                      }}
                    >
                      {/* <StyledTableCell align="center">
                        {stakeAddress && (
                          <Typography
                            fontSize="18px"
                            fontWeight="400"
                            color="#F7F4FA"
                          >
                            {walletId.slice(0, 5)}...
                            {walletId.slice(
                              walletId.length - 5,
                              walletId.length
                            )}
                          </Typography>
                        )}
                      </StyledTableCell> */}
                      <TableCell>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <Typography
                            textAlign="center"
                            fontSize="18px"
                            fontWeight="400"
                            color="#fff"
                          >
                            {/* {txReference} */}
                            {txReference.slice(0, 5)}...
                            {txReference.slice(-5, txReference.length)}
                          </Typography>
                          <Button
                            onClick={() => {
                              navigator.clipboard.writeText(txReference);
                            }}
                          >
                            <ContentCopy />
                          </Button>
                        </Box>
                      </TableCell>
                      <StyledTableCell align="center">
                        <Typography
                          fontSize="18px"
                          fontWeight="400"
                          color="#F7F4FA"
                        >
                          {currencyType}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography
                          fontSize="18px"
                          fontWeight="400"
                          color="#F7F4FA"
                        >
                          {stakedAmount}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography
                          fontSize="18px"
                          fontWeight="400"
                          color="#F7F4FA"
                        >
                          {Math.round(apy)}%
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography
                          fontSize="18px"
                          fontWeight="400"
                          color="#F7F4FA"
                        >
                          {durationInMonths} Months
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography
                          fontSize="18px"
                          fontWeight="400"
                          color="#F7F4FA"
                        >
                          {new Date(stakedOn).toDateString()}
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box
          marginTop={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"end"}
          gap={2}
        >
          <Button
            onClick={() => setPageNumber((prev) => (prev !== 1 ? prev - 1 : 1))}
          >
            <ArrowBack /> Previous
          </Button>

          <Typography color={"#F7F4FA"}>{pageNumber}</Typography>

          <Button onClick={() => setPageNumber((prev) => prev + 1)}>
            Next <ArrowForward />
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HistoryPage;
