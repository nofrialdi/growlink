"use client";
import { Box, Button, Chip, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRouter } from "next/navigation";
import AccountMenu from "../components/accountMenu";
import Navigation from "../components/navigation2";
import {
  getListTransactions,
  getListYields,
} from "@/services/transactions-service";
import { formatToRupiah } from "@/helper/utils";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [dataYield, setDataYield] = useState<any>();
  const [totalSaldo, setTotalSaldo] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [totalPemasukan, setTotalPemasukan] = useState(0);

  async function getUser() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVICE_BASE}/user/me`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  const getList = async () => {
    const res: any = await getListTransactions();
    setData(res);
  };

  const getYield = async () => {
    const res: any = await getListYields();
    setDataYield(res);
  };
  console.log(dataYield);

  useEffect(() => {
    getUser();
    getList();
    getTotal();
    getTotalExpense();
    getTotalIncome();
    getYield();
  }, [data]);

  const getTotal = async () => {
    if (Array.isArray(data)) {
      let totalAmount = 0;

      for (let i = 0; i < data.length; i++) {
        const dt = data[i];
        totalAmount += dt?.amount || 0;
      }

      setTotalSaldo(totalAmount);
    }
  };

  const getTotalExpense = async () => {
    if (Array.isArray(data)) {
      let totalExpenseAmount = 0;

      for (let i = 0; i < data.length; i++) {
        const dt = data[i];
        if (dt?.type === "EXPENSE") {
          totalExpenseAmount += dt?.amount || 0;
        }
      }

      setTotalPengeluaran(totalExpenseAmount);
    }
  };

  const getTotalIncome = async () => {
    if (Array.isArray(data)) {
      let totalIncomeAmount = 0;

      for (let i = 0; i < data.length; i++) {
        const dt = data[i];
        if (dt?.type === "INCOME") {
          totalIncomeAmount += dt?.amount || 0;
        }
      }

      setTotalPemasukan(totalIncomeAmount);
    }
  };

  const lastItem = data && data.length > 0 ? data[data.length - 1] : null;
  const lastItemYield =
    dataYield && dataYield.length > 0 ? dataYield[dataYield.length - 1] : null;

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Paper
        square
        sx={{
          bgcolor: "primary.main",
          width: "100vw",
          zIndex: 50,
        }}
      >
        <Container
          maxWidth={"sm"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="text" sx={{ color: "#ffffff" }}>
            Home
          </Button>
          <AccountMenu />
        </Container>
      </Paper>

      <Container maxWidth={"sm"} sx={{ my: 2, width: "100%" }}>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            height: 100,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" component="p">
            Total Saldo
          </Typography>
          <Typography variant="h5" component="h5">
            {formatToRupiah(totalSaldo)}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: 1,
            my: 1,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#ffffff",
              height: 80,
              width: "50%",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderRadius: 2,
            }}
          >
            <Typography variant="body1" component="p">
              Total Pemasukan
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              sx={{ color: "success.main" }}
            >
              + {formatToRupiah(totalPemasukan)}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: "#ffffff",
              height: 80,
              width: "50%",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderRadius: 2,
            }}
          >
            <Typography variant="body1" component="p">
              Total Pengeluaran
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              sx={{ color: "error.main" }}
            >
              - Rp. {formatToRupiah(totalPengeluaran)}
            </Typography>
          </Box>
        </Box>
        <Box
          maxWidth={"sm"}
          sx={{ width: "100%", display: "flex", my: 1, justifyContent: "left" }}
        >
          <Typography variant="body1" component="p">
            Transaksi terakhir
          </Typography>
        </Box>
        <Box maxWidth={"sm"} sx={{ width: "100%" }}>
          {lastItem && (
            <Box
              sx={{
                backgroundColor: "#ffffff",
                height: 100,
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                my: 1,
                padding: 2,
                flexDirection: "row",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" component="h6">
                  {lastItem?.transactionCategory
                    ? lastItem?.transactionCategory?.name
                    : "-"}
                </Typography>
                <Typography variant="body1" component="p">
                  {lastItem?.type}
                </Typography>
                <Typography variant="body1" component="p">
                  {lastItem?.description}
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ color: "error.main" }}>
                - {formatToRupiah(lastItem?.amount as number)}
              </Typography>
            </Box>
          )}

          <Button fullWidth sx={{ width: "100%", my: 1 }} variant="contained">
            Lihat History Keuangan
          </Button>
        </Box>
        <Box
          maxWidth={"sm"}
          sx={{ width: "100%", display: "flex", justifyContent: "left" }}
        >
          <Typography variant="body1" component="p">
            Panen terakhir
          </Typography>
        </Box>

        <Box maxWidth={"sm"} sx={{ width: "100%", my: 1 }}>
          {lastItemYield && (
            <Box
              sx={{
                backgroundColor: "#ffffff",
                height: 80,
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                padding: 2,
                flexDirection: "row",
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" component="h6">
                  {lastItemYield?.name ? lastItemYield?.name : "-"}
                </Typography>
                <Typography variant="body1" component="p">
                  {lastItemYield?.description}
                </Typography>
                <Typography
                  sx={{ color: "warning.main" }}
                  variant="body1"
                  component="p"
                >
                  Panen {lastItemYield?.harvestTime}
                </Typography>
              </Box>

              <Chip
                sx={{ color: "warning.main", borderColor: "warning.main" }}
                icon={<AccessTimeIcon color="warning" />}
                label="2 Minggu"
                variant="outlined"
              />
            </Box>
          )}
        </Box>
        <Button fullWidth sx={{ my: 1, width: "100%" }} variant="contained">
          Lihat History Keuangan
        </Button>
      </Container>
      <Navigation />
    </Container>
  );
}
