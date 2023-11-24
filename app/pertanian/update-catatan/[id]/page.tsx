"use client";
import {
	Box,
	Button,
	Container,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import Navigation from "@/app/components/navigation2";
import Shortcut from "@/app/components/shortcut";
import { format } from "path";
import { updateDataPertanian } from "@/services/transactions-service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  name: string;
}

interface Yields {
  id: number;
  productId: number;
  product: string;
  plantingTime: string;
  harvestTime: string;
  description: string;
  quantity: number;
}

export default function UpdatePertanian({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [plantingTime, setPlantingTime] = useState("");
  const [selectedPlantingTime, setSelectedPlantingTime] = useState(
    new Date(plantingTime)
  );
  const [selectedHarvestTime, setSelectedHarvestTime] = useState("");
  const [harvestTime, setHarvestTime] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [yields, setYields] = useState<Yields[]>([]);
  const [selectedPlantingDate, setSelectedPlantingDate] = useState(null);
  const [selectedHarvestDate, setSelectedHarvestDate] = useState(null);

  const handleHarvestDateChange = (date: any) => {
    setSelectedHarvestDate(date);
  };

  const handlePlantingDateChange = (date: any) => {
    setSelectedPlantingDate(date);
  };

  async function getProducts() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVICE_BASE}/yields/products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedProduct(event.target.value as string);
  };

  async function getYields() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVICE_BASE}/yields/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();
      setPlantingTime(data.plantingTime);
      setHarvestTime(data.harvestTime);
      setDescription(data.description);
      setQuantity(data.quantity);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
    getYields();
  }, []);

  var isoDateplantsString = plantingTime;
  const isoDatePlats = new Date(isoDateplantsString);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDatePlants = isoDatePlats.toLocaleDateString(
    "id-ID",
    options as Intl.DateTimeFormatOptions
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = {};

    Array.from(formData.entries()).forEach(([key, value]) => {
      data[key] = value;
    });

    data.plantingTime = selectedPlantingDate;
    data.harvestTime = selectedHarvestDate;
    try {
      const res: any = await updateDataPertanian(params.id, data);
      if (res) {
        toast.success("Data updated successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Data failed to update", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch {
      toast.error("Data failed to update", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    // <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
    // 	<Box
    // 		sx={{
    // 			bgcolor: "primary.main",
    // 			height: 45,
    // 			width: "100%",
    // 			alignItems: "center",
    // 			p: 0,
    // 			boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    // 			zIndex: 2,
    // 			position: "fixed",
    // 		}}
    // 	>
    // 		<Button
    // 			variant="text"
    // 			startIcon={<ArrowBackIosNewIcon />}
    // 			sx={{ bgcolor: "primary.main", color: "white" }}
    // 			onClick={() => router.push("/home")}
    // 		>
    // 			Catat
    // 		</Button>
    // 	</Box>

    // 	<Box
    // 		sx={{
    // 			mt: 8,
    // 			width: 320,
    // 			display: "flex",
    // 			flexDirection: "column",
    // 			alignItems: "center",
    // 		}}
    // 	>
    // 		<Typography variant="h6" component="h6" sx={{ textAlign: "center", color: "primary.main" }}>
    // 			Ubah Data Pertanian
    // 		</Typography>

    // 		<Box
    // 			component="form"
    // 			sx={{
    // 				"& .MuiTextField-root": { width: 320, display: "flex", flexDirection: "column" },
    // 			}}
    // 			noValidate
    // 			autoComplete="off"
    // 		>
    // 			<TextField required sx={{ mt: 3 }} fullWidth label="Produk" id="produk" type="text" />

    // 			<LocalizationProvider dateAdapter={AdapterDayjs}>
    // 				<DemoContainer components={["DatePicker"]}>
    // 					<DatePicker
    // 						views={["year", "month", "day"]}
    // 						format="DD-MM-YYYY"
    // 						label="Tanggal Tanam"
    // 					/>
    // 				</DemoContainer>
    // 			</LocalizationProvider>

    // 			<LocalizationProvider dateAdapter={AdapterDayjs}>
    // 				<DemoContainer components={["DatePicker"]}>
    // 					<DatePicker
    // 						views={["year", "month", "day"]}
    // 						format="DD-MM-YYYY"
    // 						label="Tanggal Panen"
    // 					/>
    // 				</DemoContainer>
    // 			</LocalizationProvider>

    // 			<TextField sx={{ mt: 1 }} fullWidth label="Catatan" id="catatan" type="text" />

    // 			<TextField
    // 				label="Jumlah Panen (kosongkan jika belum  panen)"
    // 				id="jumlah panen"
    // 				sx={{ mt: 1 }}
    // 				InputProps={{
    // 					endAdornment: <InputAdornment position="end">kg</InputAdornment>,
    // 				}}
    // 			/>
    // 		</Box>

    // 		<Button fullWidth variant="contained" sx={{ mt: 2 }}>
    // 			Simpan
    // 		</Button>

    // 		<Button fullWidth color="error" variant="outlined" sx={{ mt: 1 }}>
    // 			Hapus Data
    // 		</Button>
    // 	</Box>

    // 	<Shortcut />
    // 	<Navigation />
    // </Box>

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
          <Button
            onClick={() => router.push("/")}
            startIcon={<ArrowBackIosNewIcon />}
            variant="text"
            sx={{ color: "#ffffff" }}
          >
            Update Catat Pertanian
          </Button>
        </Container>
      </Paper>

      <ToastContainer />

      {/* CONTENT */}
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: "center", color: "primary.main", my: 3 }}
      >
        Update Catat Data Pertanian
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "100%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ my: 1 }} fullWidth>
          <InputLabel id="produkSelected">Produk</InputLabel>
          <Select
            onChange={handleChange}
            value={selectedProduct}
            labelId="produkSelected"
            label="Produk"
            name="productId"
          >
            {products?.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack
          sx={{ my: 1 }}
          direction={"row"}
          justifyContent={"space-between"}
          gap={2}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              label="Tanggal Tanam"
              value={selectedPlantingDate}
              onChange={(date) => handlePlantingDateChange(date)}
            />
          </LocalizationProvider>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            -
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              label="Tanggal Panen"
              value={selectedHarvestDate}
              onChange={(date) => handleHarvestDateChange(date)}
            />
          </LocalizationProvider>
        </Stack>

        {/* <Typography>{formattedDatePlants}</Typography> */}

        <TextField
          sx={{ my: 1 }}
          fullWidth
          label="Catatan"
          id="catatan"
          type="text"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <TextField
					sx={{ my: 1 }}
					label="Jumlah Panen (kosongkan jika belum  panen)"
					id="jumlah panen"
					value={quantity}
					onChange={(e) => setQuantity(Number(e.target.value))}
					inputProps={{
						endAdornment: <InputAdornment position="end">kg</InputAdornment>,
						inputMode: "numeric",
					}}
				/> */}

        <TextField
          sx={{ my: 1 }}
          label="Jumlah Panen (kosongkan jika belum  panen)"
          id="jumlah panen"
          value={quantity}
          name="quantity"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            inputMode: "numeric",
          }}
        />

        <Button type="submit" variant="contained" sx={{ width: "100%", my: 1 }}>
          Simpan
        </Button>
      </Box>
      <Navigation />
    </Stack>
  );
}
