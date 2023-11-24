"use client";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Navigation from "../../components/navigation2";
import TuneIcon from "@mui/icons-material/Tune";
import TopBar from "@/app/components/TopBar";

export default function Page() {
  const [open, setOpen] = useState("histori");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setOpen(newValue);
  };
  return (
    // PAGE
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      sx={{ width: "100vw", height: "100vh" }}
    >
      {/* TOP BAR */}
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
            Keuangan
          </Button>
          <IconButton
            sx={{ color: "#ffffff" }}
            onClick={() => (window.location.href = "/keuangan/histori/filter")}
          >
            <TuneIcon />
          </IconButton>
        </Container>
      </Paper>

      {/* TABS */}
      <Stack width={1} maxWidth={"sm"}>
        <Tabs value={open} onChange={handleChange} variant="fullWidth">
          <Tab value="statistik" label="Statistik" disabled />
          <Tab value="histori" label="Histori" />
        </Tabs>
      </Stack>

      {/* HISTORY CONTAINER */}
      <Stack
        direction={"column"}
        gap={2}
        padding={2}
        width={1}
        height={1}
        maxWidth={"sm"}
      >
        <Typography variant="overline" marginBottom={-2}>
          Senin 23 November 2023
        </Typography>

        {/* CARD */}
        <Paper>
          <Stack direction={"row"} padding={2} justifyContent={"space-between"}>
            <Stack direction={"column"}>
              <Typography variant="body1">Benih dan tanaman</Typography>
              <Typography variant="caption" color={"secondary.text"}>
                Pengeluaran
              </Typography>
              <Typography variant="caption">Beli benih tanaman kopi</Typography>
            </Stack>
            <Stack justifyContent={"center"}>
              <Typography variant="body1" color={"error"}>
                -Rp45.000.000
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        {/* CARD */}
        <Paper>
          <Stack direction={"row"} padding={2} justifyContent={"space-between"}>
            <Stack direction={"column"}>
              <Typography variant="body1">Benih dan tanaman</Typography>
              <Typography variant="caption">Pengeluaran</Typography>
              <Typography variant="caption">Beli benih tanaman kopi</Typography>
            </Stack>
            <Stack justifyContent={"center"}>
              <Typography variant="body1" color="success">
                +Rp50.000.000
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <Navigation />
    </Stack>
  );
}
