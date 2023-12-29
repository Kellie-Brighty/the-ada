import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import {
  Box,
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
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import slogo from "../Images/slogo.png";
import { StyledButton } from "../components/SmallComponents/AppComponents";
import getStakePoolData from "../database/functions/get-stake-pool-data";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    padding: "6px",
  },
}));
const itemsPerPage = 10;

const TableComponent = ({ data, presale = false }) => {
  const { stakeAddress } = useCardano();

  const [stakePool, setStakePool] = useState([]);

  const buildStakePoolData = async () => {
    return [
      {
        id: "1",
        name: "TADA",
        logo: slogo,
        stake: `${
          (await getStakePoolData({ walletId: stakeAddress, duration: 6 }))
            .userStakeAmount
        } TADA`,
        reward: "18.14 TADA",
        APR: "45%",
        TotalStaked: `${
          (await getStakePoolData({ walletId: stakeAddress, duration: 6 }))
            .globalStakeAmount
        } TADA`,
        duration: "6 Months",
        symbol: "Pool Title",
        presale: "pre23",
        durationId: 6,
      },
      {
        id: "2",
        name: "TADA",
        logo: slogo,
        stake: `${
          (await getStakePoolData({ walletId: stakeAddress, duration: 12 }))
            .userStakeAmount
        } TADA`,
        reward: "18.14 TADA",
        APR: "105%",
        TotalStaked: `${
          (await getStakePoolData({ walletId: stakeAddress, duration: 12 }))
            .globalStakeAmount
        } TADA`,
        duration: "12 Months",
        symbol: "Pool Title",
        presale: "pre23",
        durationId: 12,
      },
      {
        id: "3",
        name: "TADA",
        logo: slogo,
        stake: `${
          (await getStakePoolData({ walletId: stakeAddress, duration: 18 }))
            .userStakeAmount
        } TADA`,
        reward: "18.14 TADA",
        APR: "160%",
        TotalStaked: `${
          (await getStakePoolData({ walletId: stakeAddress, duration: 18 }))
            .globalStakeAmount
        } TADA`,
        duration: "18 Months",
        symbol: "Pool Title",
        presale: "pre23",
        durationId: 18,
      },
    ];
  };

  useEffect(() => {
    buildStakePoolData().then(setStakePool);
  }, [stakeAddress]);

  // useEffect(() => {
  //   setStakePool(async (prev) => {
  //     const updatedStakePool = await Promise.all(
  //       prev.map(async (data) => {
  //         const { userStakeAmount, globalStakeAmount } = await getStakePoolData(
  //           {
  //             walletId: stakeAddress,
  //             duration: data.durationId,
  //           }
  //         );

  //         return {
  //           ...data,
  //           stake: userStakeAmount,
  //           TotalStaked: globalStakeAmount,
  //         };
  //       })
  //     );

  //     return updatedStakePool;
  //   });
  // }, [stakeAddress]);

  return (
    <Box>
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
              <TableCell></TableCell>
              <TableCell>
                <Typography
                  fontSize="20px"
                  fontWeight="400"
                  color="#fff"
                  ml={6}
                >
                  Tada
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  textAlign="center"
                  fontSize="18px"
                  fontWeight="400"
                  color="#fff"
                >
                  Amount Stake
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  textAlign="center"
                  fontSize="18px"
                  fontWeight="400"
                  color="#fff"
                >
                  Pending Rewards
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize="18px" fontWeight="400" color="#fff">
                  APR
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize="18px" fontWeight="400" color="#fff">
                  Total Staked
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  textAlign="center"
                  fontSize="18px"
                  fontWeight="400"
                  color="#fff"
                >
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
                  Stake Now
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stakePool.map(
              (
                {
                  id,
                  logo,
                  name,
                  symbol,
                  stake,
                  reward,
                  APR,
                  TotalStaked,
                  duration,
                  presale,
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
                  <StyledTableCell align="center">
                    <Typography
                      fontSize="18px"
                      fontWeight="400"
                      color="#F7F4FA"
                    >
                      {id}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box pl={2} display="flex" alignItems="center">
                      <img src={logo} width="38px" alt="" />

                      <Box ml={1}>
                        <Typography fontSize="17px" color="#F7F4FA">
                          {name}
                        </Typography>
                        <Typography fontSize="16px" color="#999999" mb={1}>
                          {symbol}
                        </Typography>
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography
                      fontSize="18px"
                      color="#F7F4FA"
                      sx={{ marginLeft: "10px" }}
                    >
                      {stake}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography fontSize="17px" color="#F7F4FA">
                      {reward}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography fontSize="17px" color="#F7F4FA">
                      {APR}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography
                      fontSize="17px"
                      color="#F7F4FA"
                      sx={{ marginLeft: "10px" }}
                    >
                      {TotalStaked}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Typography fontSize="17px" color="#F7F4FA">
                      {duration}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Link
                      to={`/stake?duration=${duration}`}
                      style={{ textDecoration: "none" }}
                    >
                      <StyledButton width="110px">Stake Now</StyledButton>
                    </Link>
                  </StyledTableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
