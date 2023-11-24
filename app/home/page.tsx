"use client";
import { Box, Button, Chip, Container, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRouter } from "next/navigation";
import AccountMenu from "../components/accountMenu";
import Navigation from "../components/navigation2";

export default function Home() {
	const router = useRouter();

	async function getUser() {
		const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_BASE}/user/me`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				"Content-Type": "application/json",
			},
		});
		console.log(response);
	}

	useEffect(() => {
		getUser();
	}, []);

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
				<Container maxWidth={"sm"} sx={{ display: "flex", justifyContent: "space-between" }}>
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
						Rp. 1000.000
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
						<Typography variant="h6" component="h6" sx={{ color: "success.main" }}>
							+ Rp. 2000.000
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
						<Typography variant="h6" component="h6" sx={{ color: "error.main" }}>
							- Rp. 1000.000
						</Typography>
					</Box>
				</Box>
				<Box maxWidth={"sm"} sx={{ width: "100%", display: "flex", my: 1, justifyContent: "left" }}>
					<Typography variant="body1" component="p">
						Transaksi terakhir
					</Typography>
				</Box>
				<Box maxWidth={"sm"} sx={{ width: "100%" }}>
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
								Benih dan Tanaman
							</Typography>
							<Typography variant="body1" component="p">
								Pengeluaran
							</Typography>
							<Typography variant="body1" component="p">
								Beli benih tanaman Kopi
							</Typography>
						</Box>

						<Typography variant="h6" sx={{ color: "error.main" }}>
							- Rp. 1000.000
						</Typography>
					</Box>

					<Button fullWidth sx={{ width: "100%", my: 1 }} variant="contained">
						Lihat History Keuangan
					</Button>
				</Box>
				<Box maxWidth={"sm"} sx={{ width: "100%", display: "flex", justifyContent: "left" }}>
					<Typography variant="body1" component="p">
						Panen terakhir
					</Typography>
				</Box>

				<Box maxWidth={"sm"} sx={{ width: "100%", my: 1 }}>
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
								Nasi Putih
							</Typography>
							<Typography variant="body1" component="p">
								Nasi Putih lahan A
							</Typography>
							<Typography sx={{ color: "warning.main" }} variant="body1" component="p">
								Panen 20 November 2023
							</Typography>
						</Box>

						<Chip
							sx={{ color: "warning.main", borderColor: "warning.main" }}
							icon={<AccessTimeIcon color="warning" />}
							label="2 Minggu"
							variant="outlined"
						/>
					</Box>
				</Box>
				<Button fullWidth sx={{ my: 1, width: "100%" }} variant="contained">
					Lihat History Keuangan
				</Button>
			</Container>
			<Navigation />
		</Container>
	);
}
