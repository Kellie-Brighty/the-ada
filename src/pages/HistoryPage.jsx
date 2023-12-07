import {
  Box,
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
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "../components/SmallComponents/AppComponents";
import getStakes from "../database/functions/get-stakes";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    padding: "6px",
  },
}));

const HistoryPage = () => {
  const matches = useMediaQuery("(max-width:950px)");

  const { stakeAddress } = useCardano();

  const [stakes, setStakes] = useState([]);

  useEffect(() => {
    getStakes({ walletId: stakeAddress }).then((stakeDocs) => {
      setStakes(stakeDocs.map((stake) => ({ id: stake.id, ...stake.data() })));
    });
  }, []);

  console.log(stakes);

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
                      walletId,
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
          <Box
            mt={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontFamily="karla" fontSize="20px" color="#fff">
              {" "}
              Total Providers : 23
            </Typography>
            <Pagination
              count={10}
              variant="outlined"
              shape="rounded"
              //   color="secondary"
              sx={{
                color: "#10092a !important",
                ".MuiButtonBase-root": {
                  color: "#fff !important",
                  backgroundColor: "#190f44",
                },
                ".MuiPagination-ul": {
                  //   backgroundColor: "#10092a",
                },
                ".Mui-selected": {
                  backgroundColor: "#10092a !important",
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HistoryPage;
