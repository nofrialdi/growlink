"use client";

import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Container,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TopBar from "@/app/components/TopBar";
import { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Navigation from "@/app/components/navigation2";

export default function Page() {
  const [active, setActive] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    // PAGE
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      padding={0}
      height={"100vh"}
    >
      {/* TOPBAR */}
      <TopBar />

      {/* CONTENT */}
      <Stack
        maxWidth={"sm"}
        width={1}
        height={1}
        bgcolor={"#FFFFFF"}
        padding={2}
        alignItems={"center"}
      >
        {/* <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          padding={2}
          height={1}
        > */}
        {/* TOP */}
        <Typography variant="h6" color={"primary.main"} marginBottom={2}>
          Transaksi Baru
        </Typography>
        <ButtonGroup>
          <Button>Pengeluaran</Button>
          <Button variant="contained">Pemasukan</Button>
        </ButtonGroup>

        {/* VALUE */}
        {/* <Box marginY={5}> */}
        <Typography
          onClick={() => alert("Clicked")}
          variant="h4"
          color={"primary.main"}
          marginTop={"auto"}
        >
          Rp 0
        </Typography>
        {/* </Box> */}

        {/* FORM */}
        <Stack direction={"column"} width={"100%"} gap={2} marginTop={"auto"}>
          {/* DATE */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DemoContainer components={["DatePicker"]}> */}
            <DatePicker label="Tanggal transaksi" />
            {/* </DemoContainer> */}
          </LocalizationProvider>

          {/* DESKRIPSI */}
          <TextField
            id="deskripsi"
            label="Deskripsi (opsional)"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" size="large">
            Simpan
          </Button>
        </Stack>
        {/* </Stack> */}
      </Stack>
      <Navigation />
    </Stack>
  );
}
